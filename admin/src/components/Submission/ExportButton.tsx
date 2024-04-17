import * as React from "react";
import { useIntl } from "react-intl";
import { useState } from "react";

/*
 * Strapi Design system
 */
import { IconButton, Loader } from "@strapi/design-system";
//@ts-ignore
import { Download } from "@strapi/icons";
import pluginId from "../../pluginId";
import submissionRequests from "../../api/submission";

type ExportButtonProps = {
  formId: number;
};

const ExportButton = ({ formId }: ExportButtonProps): JSX.Element => {
  const { formatMessage } = useIntl();
  const [loading, toggleLoading] = useState(false);

  const exportSubmissions = async () => {
    toggleLoading(true);

    history.pushState({}, "", `/api/${pluginId}/submissions/export/${formId}`);
  };

  return (
    <>
      <IconButton
        color="primary"
        disabled={loading}
        onClick={() =>
          (window.location.href = `/api/${pluginId}/submissions/export/${formId}`)
        }
        label={formatMessage({
          id: `${pluginId}.forms.fields.actions.export_submissions`,
        })}
        icon={loading ? <Loader small /> : <Download />}
      />
    </>
  );
};

export default ExportButton;
