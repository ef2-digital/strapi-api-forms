//@ts-nocheck
import * as React from "react";
import { useState, useEffect } from "react";

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

interface ModalProps {
  formId: number;
  isModalVisible: boolean;
  setModalIsVisible: (boolean) => void;
}

const NotificationModal = ({
  formId,
  isModalVisible,
  setModalIsVisible,
}: ModalProps) => {
  const { formatMessage } = useIntl();
  const [notification, setNotification] = useState();
  const [hasAlert, setAlert] = useState<boolean>(false);
  const [fields, setFields] = useState<any>([]);
  const [alertMessage, setAlertMessage] = useState<string>(
    formatMessage({ id: `${pluginId}.required` })
  );

  useEffect(() => {
    const fetchNotification = async () => {
      const result = await formRequests.getForm(formId);
      setFields(JSON.parse(result.attributes.fields));
      setNotification(result.attributes.notifications.pop());
    };

    fetchNotification();
  }, []);

  const setValue = (name, value) => {
    setNotification({ ...notification, [name]: value });
  };

  const closeModal = () => {
    setModalIsVisible(false);
  };

  const save = async () => {
    await notificationRequests.update(notification.id, notification);

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
                onChange={(e) => {
                  setValue("from", e.target.value);
                }}
              />

              <TextInput
                label={formatMessage({
                  id: `${pluginId}.forms.fields.to`,
                })}
                name="to"
                value={notification.to}
                onChange={(e) => {
                  setValue("to", e.target.value);
                }}
              />

              <TextInput
                label={formatMessage({
                  id: `${pluginId}.forms.fields.subject`,
                })}
                name="subject"
                value={notification.subject}
                onChange={(e) => {
                  setValue("subject", e.target.value);
                }}
              />
              <Divider />
              <RichTextEditor notification={notification} fields={fields} setValue={setValue}/>
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
