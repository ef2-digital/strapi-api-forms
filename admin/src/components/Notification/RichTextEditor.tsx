//@ts-nocheck
import * as React from "react";
import { useState, useEffect } from "react";
import { NotificationType } from "../../utils/types";
import MDEditor from "@uiw/react-md-editor";

/*
 * Strapi Design system
 */
import { Button, Flex, Typography, Stack } from "@strapi/design-system";

import { useIntl } from "react-intl";
import pluginId from "../../pluginId";

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
  const [message, setMessage] = useState<string>("");
  const { formatMessage } = useIntl();
  const [cursorPosition, setCursorPosition] = useState<number>(0);

  useEffect(() => {
    setValue("message", message);
  }, [message]);

  useEffect(() => {
    if (!notification.message) {
      return;
    }

    let value = notification.message.replace(/<p>/g, "");
    value = value.replace(/<\/p>/g, "\n\n");

    setMessage(value);
  }, []);

  const insertFieldIntoMessage = (field: { label: string }) => {
    const beforeCursor = message.substring(0, cursorPosition);
    const afterCursor = message.substring(cursorPosition);

    setMessage(
      `${beforeCursor} **{{${field.name}}}**<!--rehype:style=font-size: 12px;color: white; background: #4945ff;padding:8px; padding-right: 16px;padding-left: 16px;border-radius: 4px;--> ${afterCursor}`
    );
  };

  const handleTextareaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
    setCursorPosition(event.target.selectionStart);
  };

  const handleTextareaKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Backspace") {
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

      <Flex gap="1">
        {fields.map((field) => (
          <Button onClick={() => insertFieldIntoMessage(field)}>
            {field.label}
          </Button>
        ))}
      </Flex>
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
