import React from "react";
import { useContext } from "react";
import { FormContext } from "../../hooks/useForm";
import { SingleSelect, SingleSelectOption } from "@strapi/design-system";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import { NotificationType } from "../../utils/types";

const SelectEmail = ({
  notification,
  setValue,
}: {
  notification: NotificationType;
  setValue: Function;
}) => {
  const { state } = useContext(FormContext);
  const { formatMessage } = useIntl();

  const emailFields = JSON.parse(state.form.attributes.fields).filter(
    (field: any) => field.type === "email"
  );

  if (!Boolean(emailFields.length)) {
    return <></>;
  }

  return (
    <>
      <SingleSelect
        label={formatMessage({
          id: `${pluginId}.forms.fields.select_recipient`,
        })}
        value={notification.to}
        onChange={(event: any) => setValue("to", event)}
        placeholder={formatMessage({
          id: `${pluginId}.forms.fields.select_recipient`,
        })}
        name="to"
      >
        {emailFields.map((field: any, index: number) => (
          <SingleSelectOption
            value={field.name}
            key={`select-${field.name}-${index}`}
          >
            {field.label} field
          </SingleSelectOption>
        ))}
      </SingleSelect>
    </>
  );
};

export default SelectEmail;
