import * as React from "react";
import { createContext, useReducer } from "react";
import { FieldCollectionType, FormType } from "../utils/types";
import { FormActions, formReducer } from "./formReducer";

export interface FormContextInterface {
  fields: FieldCollectionType;
  form: FormType;
}

const initialState = {
    fields: [],
    form: {
      id: null,
      attributes: {
      title: "",
      fields: "",
      createdAt: "",
      updatedAt: "",
      }
    },
};

const FormContext = createContext<{
  state: FormContextInterface;
  dispatch: React.Dispatch<FormActions>;
}>({
  state: initialState,
  dispatch: () => null,
});

const FormProvider = ({ children }: { children: React.ReactNode }) => {
  // @ts-ignore
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
