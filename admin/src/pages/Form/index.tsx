import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { FormContext } from "../../hooks/useForm";
import formRequests from "../../api/form";
import { Types } from "../../hooks/formReducer";
import Header from "../../components/Form/Header";
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
import { FormType } from "../../utils/types";

type FormParams = {
  id?: string;
};

const Form = () => {
  const history = useHistory();
  const { formatMessage } = useIntl();
  const { id } = useParams<FormParams>();
  const { state, dispatch } = useContext(FormContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAlert, toggleAlert] = useState<boolean>(false);
  const [alertVariant, setAlertVariant] = useState<string>("success");
  const [fetchedForm, setFetchedForm] = useState<FormType | null>(null);

  useEffect(() => {
    if (!id) {
      dispatch({
        type: Types.Set_Form,
        payload: {
          form: { attributes: { title: "", fields: JSON.stringify([]) } },
        },
      });

      setIsLoading(false);

      return;
    }

    formRequests
      .getForm(id)
      .then((result) => {
        setFetchedForm(result);

        dispatch({
          type: Types.Set_Form,
          payload: { form: { ...result } },
        });
      })
      .finally(() => setIsLoading(false));
  }, []);

  const onSave = async () => {
    if (state.form && !state.form.attributes.title) {
      setAlertVariant("danger");

      return toggleAlert(true);
    }

    setAlertVariant("success");
    toggleAlert(true);

    state.form.attributes.fields = JSON.stringify(state.fields);

    if (!id) {
      const response = await formRequests.submitForm(state.form.attributes);

      return history.push(`/plugins/${pluginId}/form/edit/${response.data.id}`);
    }

    const response = await formRequests.updateForm(id!, state.form.attributes);

    window.location.reload();
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <Header
        save={onSave}
        title={fetchedForm?.attributes?.title}
        subtitle={
          Boolean(fetchedForm)
            ? formatMessage({ id: `${pluginId}.forms.edit.subtitle` })
            : ""
        }
      />

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
