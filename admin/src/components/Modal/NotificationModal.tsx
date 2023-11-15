//@ts-nocheck
import * as React from "react";
import { useState, useEffect, useContext } from "react";

/*
 * Strapi Design system
 */
import {
  Alert,
  Button,
  Divider,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Stack,
  TextInput,
  Flex,
  Typography,
  Switch,
} from "@strapi/design-system";

import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import formRequests from "../../api/form";
import notificationRequests from "../../api/notification";
import RichTextEditor from "../Notification/RichTextEditor";
import { HandlerTypeEnum } from "../../utils/enums";
import { FormContext } from "../../hooks/useForm";
import { NotificationType } from "../../utils/types";
import { Types } from "../../hooks/formReducer";
import SelectEmail from "../Notification/SelectEmail";

interface ModalProps {
  type: HandlerTypeEnum;
  isModalVisible: boolean;
  setModalIsVisible: Function;
}

const NotificationModal = ({
  type,
  isModalVisible,
  setModalIsVisible,
}: ModalProps) => {
  const { formatMessage } = useIntl();
  const { dispatch, state } = useContext(FormContext);

  const [notification, setNotification] = useState<
    NotificationType | undefined
  >();
  const [hasAlert, setAlert] = useState<boolean>(false);
  const [fields, setFields] = useState<any>([]);
  const [alertMessage, setAlertMessage] = useState<string>(
    formatMessage({ id: `${pluginId}.required` })
  );

  useEffect(() => {
    const fetchNotification = async () => {
      const result = await formRequests.getForm(state.form?.id!);
      setFields(JSON.parse(result.attributes.fields));

      if (!result.attributes.notifications) {
        return;
      }

      setNotification(
        result.attributes.notifications.find((n) => n.identifier === type)
      );
    };

    fetchNotification();
  }, []);

  const setValue = (name: string, value: string | boolean) => {
    //@ts-ignore
    setNotification({ ...notification, [name]: value });
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  const save = async () => {
    const result = await notificationRequests.update(
      notification?.id,
      notification
    );

    const newForm = {
      ...state.form,
      attributes: {
        ...state.form.attributes,
        notifications: state.form.attributes?.notifications?.map((n) =>
          result.data.id === n.id
            ? { ...result.data?.attributes, id: result.data.id }
            : n
        ),
      },
    };

    dispatch({
      type: Types.Set_Form,
      payload: {
        ...state,
        form: newForm,
      },
    });

    dispatch({
      type: Types.Set_Forms,
      payload: {
        ...state,
        forms: state.forms.map((form) =>
          form.id === newForm.id ? newForm : form
        ),
      },
    });

    setModalIsVisible(false);
  };

  if (!isModalVisible || !notification) {
    return <></>;
  }

  return (
    <>
      <ModalLayout onClose={() => closeModal()} labelledBy="title">
        <ModalHeader>
          <Typography textAlign="center">Notification</Typography>
        </ModalHeader>
        <ModalBody>
          {!notification ? (
            <></>
          ) : (
            <Stack spacing={4}>
              {hasAlert ? (
                <Alert
                  closeLabel="Close alert"
                  variant="danger"
                  onClose={() => setAlert(false)}
                >
                  {alertMessage}
                </Alert>
              ) : null}
              <Flex>
                <Switch
                  onChange={() =>
                    setValue(
                      "enabled",
                      (notification.enabled = !notification.enabled)
                    )
                  }
                  visibleLabels
                  selected={notification.enabled}
                />
              </Flex>

              <TextInput
                label={formatMessage({
                  id: `${pluginId}.forms.fields.from`,
                })}
                name="from"
                value={notification.from}
                onChange={(e: any) => {
                  setValue("from", e.target.value);
                }}
              />
              {notification.identifier === HandlerTypeEnum.Notification ? (
                <TextInput
                  label={formatMessage({
                    id: `${pluginId}.forms.fields.recipient`,
                  })}
                  name="to"
                  value={notification.to}
                  onChange={(e: any) => {
                    setValue("to", e.target.value);
                  }}
                />
              ) : (
                <SelectEmail notification={notification} setValue={setValue} />
              )}

              <TextInput
                label={formatMessage({
                  id: `${pluginId}.forms.fields.subject`,
                })}
                name="subject"
                value={notification.subject}
                onChange={(e: any) => {
                  setValue("subject", e.target.value);
                }}
              />
              <Divider />
              <RichTextEditor
                notification={notification}
                fields={fields}
                setValue={setValue}
              />
            </Stack>
          )}
        </ModalBody>
        <ModalFooter
          startActions={
            <Button onClick={() => closeModal()} variant="tertiary">
              {formatMessage({ id: `${pluginId}.cancel` })}
            </Button>
          }
          endActions={
            <Button onClick={() => save()}>
              {formatMessage({ id: `${pluginId}.save` })}
            </Button>
          }
        />
      </ModalLayout>
    </>
  );
};

export default NotificationModal;
