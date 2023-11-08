//@ts-nocheck
import * as React from "react";
import { useContext, useState } from "react";

/*
 * Strapi Design system
 */
import {
  Alert,
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Option,
  Select,
  Stack,
  TextInput,
  Typography,
} from "@strapi/design-system";

import { useIntl } from "react-intl";
import { FieldActionsEnum, FieldTypeEnum } from "../../utils/enums";
import { FormContext } from "../../hooks/useForm";
import {
  FieldConfigProps,
  FieldOptionProps,
  FieldType,
  FieldTypeDefaultProps,
} from "../../utils/types";
import { Types } from "../../hooks/formReducer";
import { FieldOptions } from "../Form/Fields";
import pluginId from "../../pluginId";

interface FieldModalProps {
  action: FieldActionsEnum;
  isVisible: boolean;
  setIsVisible: (boolean) => void;
  setCurrentField: (FieldType) => void;
  currentField?: FieldType | null;
}

const FieldModal = ({
  action,
  isVisible,
  setIsVisible,
  currentField,
  setCurrentField,
}: FieldModalProps) => {
  const { dispatch, state } = useContext(FormContext);
  const { formatMessage } = useIntl();
  const [hasAlert, setAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>(
    formatMessage({ id: `${pluginId}.required` })
  );
  const [label, setLabel] = useState<string>(currentField?.label!);
  const [field, setField] = useState<FieldTypeEnum | null>(currentField?.type!);

  const [config, setConfig] = useState<FieldConfigProps>(currentField?.config!);
  const [options, setOptions] = useState<FieldOptionProps[] | []>(
    currentField?.options!
  );

  const isFilled = () => label && field;

  const formatOptions = (content: string) => {
    setOptions(
      content.split("\n").map((option) => {
        return { value: option, label: option };
      })
    );
  };

  const isInvalid = () => {
    if (!state.fields.length && !currentField?.name) {
      return false;
    }

    return (
      state.fields.filter(
        (field) =>
          field.name !== currentField?.name &&
          field.name === label.toLowerCase()
      ).length > 0
    );
  };

  const saveField = () => {
    setAlert(false);

    if (!isFilled() || isInvalid()) {
      if (isInvalid()) {
        setAlertMessage(formatMessage({ id: `${pluginId}.exists` }));
      }

      setAlert(true);
      return;
    }

    if (action === FieldActionsEnum.Add) {
      dispatch({
        type: Types.Add_Field,
        payload: {
          label: label,
          fieldType: field!,
          config: config,
          options: options,
        },
      });

      return closeModal();
    }

    dispatch({
      type: Types.Edit_Field,
      payload: {
        label: label,
        name: currentField?.name!,
        fieldType: field!,
        config: config,
        options: options,
      },
    });

    closeModal();
  };

  const closeModal = () => {
    setCurrentField(FieldTypeDefaultProps);
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <ModalLayout onClose={() => closeModal()} labelledBy="title">
          <ModalHeader>
            <Typography textAlign="center">
              {formatMessage({
                id: FieldActionsEnum.Add
                  ? `${pluginId}.forms.fields.add`
                  : `${pluginId}.forms.fields.edit`,
              })}
            </Typography>
          </ModalHeader>
          <ModalBody>
            <Stack spacing={4}>
              {hasAlert ? (
                <Alert
                  closeLabel="Close alert"
                  variant="danger"
                  onClose={() => setAlert(false)}
                >
                  {alertMessage}
                </Alert>
              ) : null}

              <TextInput
                label={formatMessage({ id: `${pluginId}.forms.fields.label` })}
                name="label"
                value={label}
                onChange={(event) => setLabel(event.target.value)}
              />

              <Select
                label={formatMessage({ id: `${pluginId}.forms.fields.type` })}
                name="fieldType"
                value={field}
                onChange={(event) => setField(event)}
              >
                {Object.keys(FieldTypeEnum).map((key) => (
                  <Option key={key} value={FieldTypeEnum[key]}>
                    {formatMessage({
                      id: `${pluginId}.forms.fields.types.${key.toLowerCase()}`,
                    })}
                  </Option>
                ))}
              </Select>
              <FieldOptions
                field={field!}
                config={config}
                setConfig={setConfig}
                options={options.map((option) => option.value).join("\n")}
                setOptions={formatOptions}
              />
            </Stack>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={() => closeModal()} variant="tertiary">
                {formatMessage({ id: `${pluginId}.cancel` })}
              </Button>
            }
            endActions={
              <Button onClick={() => saveField()}>
                {formatMessage({ id: `${pluginId}.save` })}
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default FieldModal;
