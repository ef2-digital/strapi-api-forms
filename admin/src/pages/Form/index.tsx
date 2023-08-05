import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormContext } from "../../hooks/useForm";
import formRequests from "../../api/form";
import { Types } from "../../hooks/formReducer";
import Header from "../../components/Form/Header";
import { useIntl } from "react-intl";
import FormFields from "../../components/Form/FormFields";
import AlertWrapper from "../../components/Layout/AlertWrapper";

/*
 * Strapi Design system
 */
import {
  Box,
  Field,
  FieldInput,
  FieldLabel,
  Grid,
  GridItem,
  Stack,
  Typography,
} from "@strapi/design-system";
import pluginId from "../../pluginId";

type FormParams = {
  id?: string;
};

const Form = () => {
  const { formatMessage } = useIntl();
  const { id } = useParams<FormParams>();
  const { state, dispatch } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, toggleAlert] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<string>("success");

  useEffect(() => {
    if (!id) {
      dispatch({
        type: Types.Set_Form,
        payload: { form: { attributes: {title: "", fields: JSON.stringify([])} } },
      });

      setIsLoading(false);

      return;
    }

    // formRequests
    //   .getForm(id)
    //   .then((result) => {
    //     dispatch({ type: Types.Set_Form, payload: { form: result.data } });
    //   })
    //   .finally(() => setIsLoading(false));
  }, []);

  const onSave = () => {    
    if (state.form && !state.form.attributes.title) {
      setAlertVariant("danger");

      return toggleAlert(true);
    }

    setAlertVariant("success");
    toggleAlert(true);

    state.form.attributes.fields = JSON.stringify(state.fields);
    
    formRequests.submitForm(state.form.attributes);
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Header save={onSave} />

      {showAlert ? (
        <AlertWrapper variant={alertVariant} toggleAlert={toggleAlert} />
      ) : (
        <></>
      )}

      <Box paddingLeft={10} paddingRight={10}>
        <Box
          background="neutral0"
          padding={5}
          marginBottom={5}
          shadow="filterShadow"
          hasRadius
        >
          <Grid gap={5}>
            <GridItem padding={1} col={12} s={12}>
              <Field name="title">
                <Stack spacing={2}>
                  <Box paddingBottom={2}>
                    <FieldLabel>
                      {formatMessage({ id: `${pluginId}.forms.fields.title` })}
                    </FieldLabel>
                  </Box>
                  <FieldInput
                    name="title"
                    type="text"
                    value={state.form.attributes.title}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      dispatch({
                        type: Types.Edit_Form,
                        payload: { title: event.currentTarget.value },
                      })
                    }
                  />
                </Stack>
              </Field>
            </GridItem>
            </Grid>
            </Box>
            <Box>
            <Grid>
            <GridItem padding={1} col={12} s={12}>
              <Field name="fields">
                <Stack spacing={2}>
                  <Typography variant="beta">
                    {formatMessage({ id: `${pluginId}.forms.fields.fields` })}
                  </Typography>
                  <FormFields />
                </Stack>
              </Field>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Form;
