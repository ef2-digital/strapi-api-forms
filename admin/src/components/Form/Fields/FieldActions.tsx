import * as React from "react";
import { useIntl } from "react-intl";
import { FieldDirectionEnum } from "../../../utils/enums";
import { FieldProps } from "../FormFields";
import { IconButtonGroup, IconButton } from "@strapi/design-system";
import pluginId from "../../../pluginId";
import { ArrowDown, ArrowUp, Trash, Pencil } from "@strapi/icons";

const FieldActions = ({
  position,
  canMoveDown,
  canMoveUp,
  move,
  edit,
  remove,
}: FieldProps) => {
  const { formatMessage } = useIntl();

  return (
    <>
      <IconButtonGroup>
        <IconButton
          onClick={() => move(position, FieldDirectionEnum.Up)}
          disabled={!canMoveUp}
          label={formatMessage({
            id: `${pluginId}.forms.fields.actions.up`,
          })}
          icon={<ArrowUp />}
        />
        <IconButton
          onClick={() => move(position, FieldDirectionEnum.Down)}
          disabled={!canMoveDown}
          label={formatMessage({
            id: `${pluginId}.forms.fields.actions.down`,
          })}
          icon={<ArrowDown />}
        />
        <IconButton
          onClick={() => edit(position)}
          label={formatMessage({
            id: `${pluginId}.forms.fields.actions.edit`,
          })}
          icon={<Pencil />}
        />
        <IconButton
          onClick={() => remove(position)}
          label={formatMessage({
            id: `${pluginId}.forms.fields.actions.remove`,
          })}
          icon={<Trash />}
        />
      </IconButtonGroup>
    </>
  );
};

export default FieldActions;
