//@ts-nocheck
import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { NotificationType } from '../../utils/types';
import MDEditor from '@uiw/react-md-editor';

/*
 * Strapi Design system
 */
import { Button, Box, Typography, Stack, Tooltip } from '@strapi/design-system';

import { useIntl } from 'react-intl';
import pluginId from '../../pluginId';
import { Refresh } from '@strapi/icons';
import { FormContext } from '../../hooks/useForm';
import formRequests from '../../api/form';

type FieldObject = {
	label: string;
};
const RichTextEditor = ({
	notification,
	fields,
	setValue,
}: {
	notification: NotificationType;
	fields: FieldObject[];
	setValue: Function;
}) => {
	const { dispatch, state } = useContext(FormContext);
	const [message, setMessage] = useState<string>('');
	const { formatMessage } = useIntl();
	const [cursorPosition, setCursorPosition] = useState<number>(0);

	useEffect(() => {
		setValue('message', message);
	}, [message]);

	useEffect(() => {
		if (!notification.message) {
			return;
		}

		let value = notification.message.replace(/<p>/g, '');
		value = value.replace(/<\/p>/g, '\n\n');

		setMessage(value);
	}, []);

	const resetMessage = async () => {
		const originalMessage = await formRequests.getMessage(state.form?.id!);

		if (!originalMessage.message) {
			return;
		}

		setMessage(originalMessage.message);
	};

	const insertFieldIntoMessage = (field: { label: string }) => {
		const beforeCursor = message.substring(0, cursorPosition);
		const afterCursor = message.substring(cursorPosition);

		setMessage(
			`${beforeCursor} **${field.label}**<!--rehype:style=font-size: 12px;color: white; background: #4945ff;padding:4px; padding-right: 16px;padding-left: 16px;border-radius: 4px;--> ${afterCursor}`
		);
	};

	const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage(event.target.value);
		setCursorPosition(event.target.selectionStart);
	};

	const handleTextareaKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === 'Backspace') {
			const markdownRegex = /\*\*.*?<!--rehype:.*?-->/g;
			let match;

			while ((match = markdownRegex.exec(message)) !== null) {
				const start = match.index;
				const end = start + match[0].length;

				if (cursorPosition >= start && cursorPosition <= end) {
					setMessage(message.substring(0, start) + message.substring(end));
					break;
				}
			}
		}
	};

	return (
		<Stack spacing={2}>
			<Typography variant="omega" fontWeight="bold">
				{formatMessage({
					id: `${pluginId}.forms.fields.message`,
				})}
			</Typography>

			<Typography variant="pi">
				{formatMessage({
					id: `${pluginId}.forms.fields.availableFieldsDescription`,
				})}
			</Typography>

			<Box>
				<Tooltip label="Reset message to default" style={{ zIndex: '100000' }}>
					<Button
						onClick={() => resetMessage()}
						style={{
							display: 'inline',
							width: 'auto',
							margin: '.25rem',
							padding: '0rem 1rem',
						}}
					>
						<Refresh />
					</Button>
				</Tooltip>

				{fields.map((field, index) => {
					return (
						<Button
							style={{
								display: 'inline',
								width: 'auto',
								margin: '.25rem',
								padding: '0rem 1rem',
							}}
							key={`field-${index}`}
							onClick={() => insertFieldIntoMessage(field)}
						>
							{field.label}
						</Button>
					);
				})}
			</Box>

			<>
				<MDEditor
					preview="live"
					value={message}
					onChange={(value, event) => handleTextareaChange(event)}
					onKeyDown={handleTextareaKeyDown}
				/>
			</>
		</Stack>
	);
};

export default RichTextEditor;
