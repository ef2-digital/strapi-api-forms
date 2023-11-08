import * as React from "react";
import { useState } from "react";
import { FieldTypeEnum } from "../../../utils/enums";
import {
  Box,
  Checkbox,
  SingleSelect,
  SingleSelectOption,
  Stack,
  Textarea,
  TextInput,
  Divider,
  Typography,
} from "@strapi/design-system";
import { useIntl } from "react-intl";
import { FieldConfigProps } from "../../../utils/types";
import pluginId from "../../../pluginId";

type FieldOptions = {
  field: FieldTypeEnum;
  config: FieldConfigProps;
  options: string;
  setOptions: (props: any) => void;
  setConfig: (props: any) => void;
};
const FieldOptions = ({
  field,
  config,
  setConfig,
  options,
  setOptions,
}: FieldOptions) => {
  let fieldOptions = <></>;

  const [content, setContent] = useState<string>(options);

  const [checked, setChecked] = useState<boolean | {}>(config.required);
  const [checkedUi, setCheckedUi] = useState<boolean | {}>(
    config.ui.hideLabel!
  );

  const { formatMessage } = useIntl();

  const setIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
    setConfig({ ...config, required: event.currentTarget.checked });
  };

  const setUiSettings = (
    value: string | boolean,
    name: string,
    checked: boolean
  ) => {
    if (checked) {
      setCheckedUi(value);
    }

    setConfig({ ...config, ui: { ...config.ui, [name]: value } });
  };

  switch (field) {
    case FieldTypeEnum.Select:
    case FieldTypeEnum.Radio:
      fieldOptions = (
        <Box>
          <Textarea
            onBlur={() => setOptions(content)}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setContent(event.currentTarget.value)
            }
            label={formatMessage({
              id: `${pluginId}.forms.fields.extra_props.children`,
            })}
            name="children"
            placeholder={formatMessage({
              id: `${pluginId}.forms.fields.extra_props.children_placeholder`,
            })}
          >
            {content}
          </Textarea>
        </Box>
      );
      break;
  }

  return (
    <Stack spacing={3}>
      {fieldOptions}

      <Divider />
      <Typography variant="omega" fontWeight="bold">
        {formatMessage({
          id: `${pluginId}.forms.fields.extra_props.ui`,
        })}
      </Typography>

      <Typography variant="omega" fontWeight="bold">
        {formatMessage({
          id: `${pluginId}.forms.fields.extra_props.validation`,
        })}
      </Typography>
      <Checkbox
        name="isRequired"
        checked={checkedUi}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setUiSettings(event.currentTarget.checked, "hideLabel", true)
        }
      >
        {formatMessage({
          id: `${pluginId}.forms.fields.extra_props.hideLabel`,
        })}
      </Checkbox>
      <TextInput
        label={formatMessage({
          id: `${pluginId}.forms.fields.extra_props.classNames`,
        })}
        name="classNames"
        onBlur={(event: React.ChangeEvent<HTMLInputElement>) =>
          setUiSettings(event.currentTarget.value, "classNames", false)
        }
      ></TextInput>
      <SingleSelect
        label={formatMessage({
          id: `${pluginId}.forms.fields.extra_props.width`,
        })}
        value={config.ui?.width}
        placeholder="Select width of field"
        onChange={(event: string) => setUiSettings(event, "width", false)}
      >
        <SingleSelectOption value="100%">100%</SingleSelectOption>
        <SingleSelectOption value="75%">75%</SingleSelectOption>
        <SingleSelectOption value="50%">50%</SingleSelectOption>
        <SingleSelectOption value="25%">25%</SingleSelectOption>
      </SingleSelect>

      <Divider />
      <Typography variant="omega" fontWeight="bold">
        {formatMessage({
          id: `${pluginId}.forms.fields.extra_props.validation`,
        })}
      </Typography>
      <Checkbox
        name="isRequired"
        checked={checked}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setIsChecked(event)
        }
      >
        {formatMessage({ id: `${pluginId}.forms.fields.extra_props.required` })}
      </Checkbox>
    </Stack>
  );
};

export default FieldOptions;
