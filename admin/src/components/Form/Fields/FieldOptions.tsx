import * as React from "react";
import { useEffect, useState } from "react";
import { FieldTypeEnum } from "../../../utils/enums";
import {
  Box,
  Checkbox,
  Stack,
  Textarea,
  TextInput,
  Divider,
  Typography,
} from "@strapi/design-system";
import { useIntl } from "react-intl";
import { FieldConfigProps, FieldOptionProps } from "../../../utils/types";
import pluginId from "../../../pluginId";

type FieldOptions = {
  field: FieldTypeEnum;
  config: FieldConfigProps;
  options: FieldOptionProps[] | [];
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
  const [content, setContent] = useState<FieldOptionProps[] | []>(options);
  const [checked, setChecked] = useState<boolean | {}>(config.required);

  const { formatMessage } = useIntl();

  const formatOption = (content: string) => {
    setContent(
      content.split(",").map((option) => {
        return { value: option, label: option };
      })
    );
  };

  const setIsChecked = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.currentTarget.checked);
    setConfig({ required: event.currentTarget.checked });
  };

  useEffect(() => {
    setConfig({ required: checked });
    setOptions(content);
  }, [content]);

  switch (field) {
    case FieldTypeEnum.Select:
    case FieldTypeEnum.Radio:
      fieldOptions = (
        <Box>
          <Textarea
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              formatOption(event.currentTarget.value)
            }
            label={formatMessage({
              id: `${pluginId}.forms.fields.extra_props.children`,
            })}
            name="children"
            placeholder={formatMessage({
              id: `${pluginId}.forms.fields.extra_props.children_placeholder`,
            })}
          >
            {Object.keys(content).length > 0
              ? Object.values(content)
                  .map((value: FieldOptionProps) => value.value)
                  .join(",")
              : ""}
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
        {formatMessage({ id: `${pluginId}.forms.fields.extra_props.validation` })}
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
