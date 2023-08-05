import {
    ActionMap,
    FieldConfigProps,
    FieldOptionProps,
    FormType,
  } from "../utils/types";
  import { FormContextInterface } from "./useForm";
  import { FieldDirectionEnum, FieldTypeEnum } from "../utils/enums";
  
  export enum Types {
    Add_Field = "ADD_FIELD",
    Remove_Field = "REMOVE_FIELD",
    Edit_Field = "EDIT_FIELD",
    Change_Position = "CHANGE_POSITION",
    Set_Form = "SET_FORM",
    Edit_Form = "EDIT_FORM",
  }
  
  type FormPayload = {
    [Types.Edit_Form]: {
      title: string;
    };
  
    [Types.Add_Field]: {
      label: string;
      fieldType: FieldTypeEnum;
      options: FieldOptionProps[] | [];
      config: FieldConfigProps;
    };
  
    [Types.Remove_Field]: {
      position: number;
    };
  
    [Types.Edit_Field]: {
      name: string;
      label: string;
      fieldType: FieldTypeEnum;
      options: FieldOptionProps[] | [];
      config: FieldConfigProps;
    };
  
    [Types.Change_Position]: {
      currentPosition: number;
      direction: FieldDirectionEnum;
    };
  
    [Types.Set_Form]: {
      form: FormType;
    };
  };
  
  export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];
  
  export const formReducer = (
    state: FormContextInterface,
    action: FormActions
  ) => {
    const fields = state.fields.slice();
  
    if (!state.form) {
      return;
    }
  
    switch (action.type) {
      case Types.Edit_Form:
        const { title } = action.payload;
  
        state.form.attributes.title = title;
  
        return { ...state };
      case Types.Remove_Field:
        const { position } = action.payload;
  
        fields.splice(position, 1);
  
        state.fields = fields;
  
        return { ...state };
      case Types.Add_Field:
        const { label, fieldType, options, config } = action.payload;
  
        state.fields.push({
          name: label.toLowerCase(),
          label: label,
          type: fieldType!,
          options: options,
          config: config!,
        });
  
        return { ...state };
      case Types.Edit_Field:
        const field = action.payload;
  
        fields.map((current, index) => {
          if (field.name === current.name) {
            fields[index] = {
              name: field.label.toLowerCase(),
              label: field.label,
              type: field.fieldType!,
              options: field.options,
              config: field.config!,
            };
          }
        });
  
        state.fields = fields;
  
        return { ...state };
      case Types.Change_Position:
        const { currentPosition, direction } = action.payload;
  
        const toPosition =
          direction === FieldDirectionEnum.Up
            ? currentPosition - 1
            : currentPosition + 1;
  
        const currentField = state.fields[currentPosition - 1];
  
        fields.splice(currentPosition - 1, 1);
        fields.splice(toPosition - 1, 0, currentField);
  
        state.fields = fields;
  
        return { ...state };
      case Types.Set_Form:
        state.form = action.payload.form;
  
        state.fields = JSON.parse(action.payload.form.attributes.fields);
  
        return { ...state };
      default:
        return state;
    }
  };
  