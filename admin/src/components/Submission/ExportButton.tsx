import * as React from 'react';
import { useIntl } from 'react-intl';
import { useState } from 'react';
import { useFetchClient, useNotification } from '@strapi/helper-plugin';

/*
 * Strapi Design system
 */
import { IconButton, Loader } from '@strapi/design-system';
import { Download } from '@strapi/icons';
import pluginId from '../../pluginId';

type ExportButtonProps = {
	formId: number;
};

const ExportButton = ({ formId }: ExportButtonProps): JSX.Element => {
	const { formatMessage } = useIntl();
	const [loading, toggleLoading] = useState(false);
	const { get } = useFetchClient();
	const toggleNotification = useNotification();

	const processSubmissionExport = async (formId: number) => {
		toggleLoading(true);

		get(`/${pluginId}/submissions/export/${formId}`).then((response: any) => {
			const blob = new Blob([response.data.data]);
			const link = document.createElement('a');

			link.href = window.URL.createObjectURL(blob);

			link.download = response.data.filename;
			link.click();

			toggleLoading(false);
			toggleNotification({
				type: 'success',
			});
		});
	};

	return (
		<>
			<IconButton
				color="primary"
				disabled={loading}
				onClick={() => processSubmissionExport(formId)}
				label={formatMessage({
					id: `${pluginId}.forms.fields.actions.export_submissions`,
				})}
				icon={loading ? <Loader small /> : <Download />}
			/>
		</>
	);
};

export default ExportButton;
