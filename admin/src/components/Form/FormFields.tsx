import * as React from "react";
import { useContext, useState } from "react";
import { FormContext } from "../../hooks/useForm";
import { FieldType, FieldTypeDefaultProps } from "../../utils/types";
import { FieldActionsEnum, FieldDirectionEnum } from "../../utils/enums";
import { Types } from "../../hooks/formReducer";
import FieldModal from "../Modal/FieldModal";
import { useIntl } from "react-intl";

import {
  Flex,
  Icon,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TFooter,
  Typography,
} from "@strapi/design-system";
import { Plus } from "@strapi/icons";
import pluginId from "../../pluginId";
import FieldActions from "./Fields/FieldActions";
import { Check, Cross } from "@strapi/icons";

export interface FieldProps extends FieldType {
  position: number;
  canMoveDown?: boolean;
  canMoveUp?: boolean;
  move: (position: number, direction: FieldDirectionEnum) => void;
  edit: (position: number) => void;
  remove: (position: number) => void;
}

const FormFields = () => {
  const { formatMessage } = useIntl();
  const [fieldAction, setFieldAction] = useState<FieldActionsEnum>(
    FieldActionsEnum.Add
  );
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [currentField, setCurrentField] = useState<FieldType>(
    FieldTypeDefaultProps
  );
  const { state, dispatch } = useContext(FormContext);
  const length = Object.keys(state.fields).length;

  const canMoveUp = (position: number) => position > 1 && length > 1;
  const canMoveDown = (position: number) =>
    Object.keys(state.fields).length !== position && length > 1;
  const remove = (position: number) =>
    dispatch({ type: Types.Remove_Field, payload: { position: position - 1 } });

  const move = (position: number, direction: FieldDirectionEnum) =>
    dispatch({
      type: Types.Change_Position,
      payload: { currentPosition: position, direction: direction },
    });

  const edit = (position: number) => {
    setCurrentField(state.fields[position - 1]);
    setFieldAction(FieldActionsEnum.Edit);
    setIsVisible(true);
  };

  const add = () => {
    setCurrentField(FieldTypeDefaultProps);
    setFieldAction(FieldActionsEnum.Add);
    setIsVisible(true);
  };

  return (
    <>
      <Table
        colCount={1}
        rowCount={1}
        footer={
          <TFooter icon={<Plus />} onClick={() => add()} align="right">
            {formatMessage({ id: `${pluginId}.forms.fields.add` })}
          </TFooter>
        }
      >
        <Thead>
          <Tr>
            <Th>
              <Typography variant="sigma">
                {formatMessage({ id: `${pluginId}.forms.fields.field_label` })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({ id: `${pluginId}.forms.fields.name` })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({ id: `${pluginId}.forms.fields.field_type` })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: `${pluginId}.forms.fields.extra_props.required`,
                })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({
                  id: `${pluginId}.forms.fields.extra_props.ui`,
                })}
              </Typography>
            </Th>
            <Th>
              <Typography variant="sigma">
                {formatMessage({ id: `${pluginId}.forms.fields.actions` })}
              </Typography>
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {state.fields.map((field, index) => (
            <Tr key={`${index}-field`}>
              <Td>
                <Typography textColor="neutral800">{field.label}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">{field.name}</Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800">
                  {formatMessage({
                    id: `${pluginId}.forms.fields.types.${field.type}`,
                  })}
                </Typography>
              </Td>
              <Td>
                <Typography textColor="neutral800" variant="pi">
                  {field.config?.required ? (
                    <Icon
                      width={`${15 / 16}rem`}
                      height={`${15 / 16}rem`}
                      as={Check}
                    />
                  ) : (
                    <Icon
                      width={`${15 / 16}rem`}
                      height={`${15 / 16}rem`}
                      as={Cross}
                    />
                  )}
                </Typography>
              </Td>
              <Td>
                <Flex>
                  <Typography textColor="neutral800" variant="pi">
                    {formatMessage({
                      id: `${pluginId}.forms.fields.extra_props.width`,
                    })}
                    :
                  </Typography>
                  <Typography textColor="neutral800" variant="pi">
                    {field.config?.ui?.width ?? "100%"}
                  </Typography>
                </Flex>
                <Flex>
                  <Typography textColor="neutral800" variant="pi">
                    {formatMessage({
                      id: `${pluginId}.forms.fields.extra_props.classNames`,
                    })}
                    :
                  </Typography>
                  {field.config?.ui?.classNames && (
                    <Typography textColor="neutral800" variant="pi">
                      {field.config?.ui?.classNames ?? "-"}
                    </Typography>
                  )}
                </Flex>
              </Td>
              <Td>
                <FieldActions
                  {...field}
                  key={`${field.name}-component-${index}`}
                  position={index + 1}
                  canMoveDown={canMoveDown(index + 1)}
                  canMoveUp={canMoveUp(index + 1)}
                  move={move}
                  edit={edit}
                  remove={remove}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {isVisible && (
        <FieldModal
          action={fieldAction}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          currentField={currentField}
          setCurrentField={setCurrentField}
        />
      )}
    </>
  );
};

export default FormFields;
