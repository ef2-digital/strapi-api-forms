import { ActionMap, FieldConfigProps, FieldOptionProps, FormType } from '../utils/types';
import { FormContextInterface } from './useForm';
import { FieldDirectionEnum, FieldTypeEnum } from '../utils/enums';

export enum Types {
    Add_Field = 'ADD_FIELD',
    Remove_Field = 'REMOVE_FIELD',
    Edit_Field = 'EDIT_FIELD',
    Change_Position = 'CHANGE_POSITION',
    Set_Form = 'SET_FORM',
    Edit_Form = 'EDIT_FORM',
    Set_Forms = 'SET_FORMS'
}

type FormPayload = {
    [Types.Edit_Form]: {
        title?: string;
        successMessage?: string;
        errorMessage?: string;
        dateTill?: string;
        dateFrom?: string;
    };

    [Types.Add_Field]: {
        label: string;
        placeholder: string;
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
        placeholder: string;
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
    [Types.Set_Forms]: {
        forms: FormType[];
    };
};

export type FormActions = ActionMap<FormPayload>[keyof ActionMap<FormPayload>];

export const formReducer = (state: FormContextInterface, action: FormActions) => {
    const fields = state.fields.slice();

    if (!state.form || !state.forms) {
        return;
    }

    switch (action.type) {
        case Types.Set_Forms:
            state.forms = action.payload.forms;

            return { ...state };

        case Types.Edit_Form:
            const attributes = { ...state.form.attributes, ...action.payload };

            state.form.attributes = attributes;

            return { ...state };
        case Types.Remove_Field:
            const { position } = action.payload;

            fields.splice(position, 1);

            state.fields = fields;

            return { ...state };
        case Types.Add_Field:
            const { label, placeholder, fieldType, options, config } = action.payload;

            state.fields.push({
                name: label.replace(/['"]/g, ''),
                label: label,
                placeholder: placeholder,
                type: fieldType!,
                options: options,
                config: config!
            });

            return { ...state };
        case Types.Edit_Field:
            const field = action.payload;

            fields.map((current, index) => {
                if (field.name === current.name) {
                    fields[index] = {
                        name: field.label.replace(/['"]/g, ''),
                        label: field.label,
                        placeholder: field.placeholder,
                        type: field.fieldType!,
                        options: field.options,
                        config: field.config!
                    };
                }
            });

            state.fields = fields;

            return { ...state };
        case Types.Change_Position:
            const { currentPosition, direction } = action.payload;

            const toPosition = direction === FieldDirectionEnum.Up ? currentPosition - 1 : currentPosition + 1;

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
