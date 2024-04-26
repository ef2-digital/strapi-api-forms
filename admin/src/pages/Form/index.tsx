import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { FormContext } from '../../hooks/useForm';
import formRequests from '../../api/form';
import { Types } from '../../hooks/formReducer';
import Header from '../../components/Form/Header';
import FormFields from '../../components/Form/FormFields';
import AlertWrapper from '../../components/Layout/AlertWrapper';
/*
 * Strapi Design system
 */
import {
    Box,
    DatePicker,
    Field,
    FieldInput,
    FieldLabel,
    Flex,
    Grid,
    GridItem,
    Stack,
    Textarea,
    Typography,
    IconButton
} from '@strapi/design-system';
import pluginId from '../../pluginId';
import { FormType } from '../../utils/types';
import { format } from 'date-fns';
import { Pencil } from '@strapi/icons';
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
    const [alertVariant, setAlertVariant] = useState<string>('success');
    const [fetchedForm, setFetchedForm] = useState<FormType | null>(null);
    const [initialFromDate, setInitialFromDate] = useState<string | null>(null);
    const [initialTillDate, setInitialTillDate] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            dispatch({
                type: Types.Set_Form,
                payload: {
                    form: {
                        attributes: {
                            active: true,
                            dateFrom: '',
                            dateTill: '',
                            title: '',
                            successMessage: '',
                            errorMessage: '',
                            fields: JSON.stringify([])
                        }
                    }
                }
            });

            setIsLoading(false);

            return;
        }

        formRequests
            .getForm(id)
            .then((result) => {
                setFetchedForm(result);

                setInitialFromDate(result.attributes.dateFrom);
                setInitialTillDate(result.attributes.dateTill);

                dispatch({
                    type: Types.Set_Form,
                    payload: { form: { ...result } }
                });
            })
            .finally(() => setIsLoading(false));
    }, []);

    const onSave = async () => {
        if (
            state.form &&
            (!state.form.attributes.title ||
                !state.form.attributes.fields ||
                !state.form.attributes.successMessage ||
                !state.form.attributes.errorMessage)
        ) {
            setAlertVariant('danger');

            return toggleAlert(true);
        }

        setAlertVariant('success');
        toggleAlert(true);

        state.form.attributes.fields = JSON.stringify(state.fields);

        if (!id) {
            const response = await formRequests.submitForm(state.form.attributes);

            return history.push(`/plugins/${pluginId}/form/edit/${response.data.id}`);
        }

        await formRequests.updateForm(id!, state.form.attributes);

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
                subtitle={Boolean(fetchedForm) ? formatMessage({ id: `${pluginId}.forms.edit.subtitle` }) : ''}
            />

            {showAlert ? <AlertWrapper variant={alertVariant} toggleAlert={toggleAlert} /> : <></>}

            <Box paddingLeft={10} paddingRight={10}>
                <Stack spacing={2} marginBottom={2}>
                    <Typography variant="beta">{formatMessage({ id: `${pluginId}.forms.fields.general` })}</Typography>
                </Stack>
                <Box
                    background="neutral0"
                    paddingLeft={5}
                    paddingRight={5}
                    paddingTop={2}
                    paddingBottom={5}
                    marginBottom={5}
                    shadow="filterShadow"
                    hasRadius
                >
                    <Grid gap={5}>
                        <GridItem padding={1} col={6} s={6}>
                            <Field name="title">
                                <Stack spacing={2}>
                                    <Box paddingTop={2}>
                                        <FieldLabel required>{formatMessage({ id: `${pluginId}.forms.fields.title` })}</FieldLabel>
                                    </Box>
                                    <FieldInput
                                        name="title"
                                        type="text"
                                        value={state.form.attributes.title}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            dispatch({
                                                type: Types.Edit_Form,
                                                payload: {
                                                    title: event.currentTarget.value
                                                }
                                            })
                                        }
                                    />
                                </Stack>
                            </Field>
                        </GridItem>

                        <GridItem padding={1} col={6} s={6}>
                            <Grid name="date" gap={2}>
                                <GridItem col={6} s={6}>
                                    <Box paddingTop={3}>
                                        {initialFromDate ? (
                                            <>
                                                <Box paddingBottom={4}>
                                                    <FieldLabel>{formatMessage({ id: `${pluginId}.forms.fields.dateFrom` })}</FieldLabel>
                                                </Box>

                                                <Flex>
                                                    <Typography>{initialFromDate}</Typography>
                                                    <Pencil
                                                        style={{ cursor: 'pointer', marginLeft: '10px', width: '0.75rem' }}
                                                        onClick={() => setInitialFromDate(null)}
                                                        color="primary"
                                                    />
                                                </Flex>
                                            </>
                                        ) : (
                                            <DatePicker
                                                locale="nl-NL"
                                                label={formatMessage({ id: `${pluginId}.forms.fields.dateFrom` })}
                                                onChange={(value) => {
                                                    setInitialFromDate(null);
                                                    dispatch({
                                                        type: Types.Edit_Form,
                                                        payload: { dateFrom: format(value, 'dd-MM-yyyy') + 'T00:00:00.000Z' }
                                                    });
                                                }}
                                                onClear={() =>
                                                    dispatch({
                                                        type: Types.Edit_Form,
                                                        payload: {
                                                            dateFrom: ''
                                                        }
                                                    })
                                                }
                                            />
                                        )}
                                    </Box>
                                </GridItem>

                                <GridItem col={6} s={6}>
                                    <Box paddingTop={3}>
                                        {initialTillDate ? (
                                            <>
                                                <Box paddingBottom={4}>
                                                    <FieldLabel>{formatMessage({ id: `${pluginId}.forms.fields.dateTill` })}</FieldLabel>
                                                </Box>

                                                <Flex>
                                                    <Typography>{initialTillDate}</Typography>
                                                    <Pencil
                                                        style={{ cursor: 'pointer', marginLeft: '10px', width: '0.75rem' }}
                                                        onClick={() => setInitialTillDate(null)}
                                                        color="primary"
                                                    />
                                                </Flex>
                                            </>
                                        ) : (
                                            <DatePicker
                                                locale="nl-NL"
                                                label={formatMessage({ id: `${pluginId}.forms.fields.dateTill` })}
                                                selectedDate={initialTillDate}
                                                onChange={(value) => {
                                                    setInitialTillDate(null);
                                                    dispatch({
                                                        type: Types.Edit_Form,
                                                        payload: { dateTill: format(value, 'dd-MM-yyyy') + 'T00:00:00.000Z' }
                                                    });
                                                }}
                                                onClear={() =>
                                                    dispatch({
                                                        type: Types.Edit_Form,
                                                        payload: {
                                                            dateTill: ''
                                                        }
                                                    })
                                                }
                                            />
                                        )}
                                    </Box>
                                </GridItem>
                            </Grid>
                        </GridItem>

                        <GridItem padding={1} col={6} s={6}>
                            <Field name="successMessage">
                                <Stack spacing={2}>
                                    <Box paddingTop={4}>
                                        <FieldLabel required>{formatMessage({ id: `${pluginId}.forms.fields.successMessage` })}</FieldLabel>
                                    </Box>
                                    <Textarea
                                        name="successMessage"
                                        type="text"
                                        value={state.form.attributes.successMessage}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            dispatch({
                                                type: Types.Edit_Form,
                                                payload: {
                                                    successMessage: event.currentTarget.value
                                                }
                                            })
                                        }
                                    />
                                </Stack>
                            </Field>
                        </GridItem>
                        <GridItem padding={1} col={6} s={6}>
                            <Field name="errorMessage">
                                <Stack spacing={2}>
                                    <Box paddingTop={4}>
                                        <FieldLabel required>{formatMessage({ id: `${pluginId}.forms.fields.errorMessage` })}</FieldLabel>
                                    </Box>
                                    <Textarea
                                        name="errorMessage"
                                        type="text"
                                        value={state.form.attributes.errorMessage}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                            dispatch({
                                                type: Types.Edit_Form,
                                                payload: {
                                                    errorMessage: event.currentTarget.value
                                                }
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
                                    <Typography variant="beta">{formatMessage({ id: `${pluginId}.forms.fields.fields` })}</Typography>
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
