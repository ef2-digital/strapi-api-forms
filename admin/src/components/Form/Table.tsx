import * as React from "react";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import Dialog from "../../components/Dialog";
import { useHistory } from "react-router-dom";
import { useState, useContext } from "react";

import {
  IconButtonGroup,
  IconButton,
  Flex,
  Icon,
  Table as StrapiTable,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  VisuallyHidden,
} from "@strapi/design-system";

//@ts-ignore
import { Trash, Pencil, Mail, Bell, PaperPlane, Dot } from "@strapi/icons";
import formRequests from "../../api/form";
import NotificationModal from "../Modal/NotificationModal";
import { HandlerTypeEnum } from "../../utils/enums";
import { FormContext } from "../../hooks/useForm";
import { FormType } from "../../utils/types";
import { Types } from "../../hooks/formReducer";

const Table = () => {
  const history = useHistory();
  const { formatMessage, formatDate } = useIntl();
  const { dispatch, state } = useContext(FormContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setModalIsVisible] = useState(false);
  const [notificationType, setSelectedNotificationType] =
    useState<null | HandlerTypeEnum>(null);

  const openConfirmModal = (form: FormType) => {
    dispatch({
      type: Types.Set_Form,
      payload: {
        form: form,
      },
    });

    setIsVisible(true);
  };

  const openNotificationModal = (form: FormType, type: HandlerTypeEnum) => {
    dispatch({
      type: Types.Set_Form,
      payload: {
        form: form,
      },
    });

    setModalIsVisible(true);
    setSelectedNotificationType(type);
  };

  const deleteForm = async () => {
    formRequests.deleteForm(state.form.id!).then(() => {
      setIsVisible(false);
    });
  };

  return (
    <>
      <StrapiTable>
        <Thead>
          <Tr>
            {[
              "#",
              formatMessage({
                id: `${pluginId}.list.name`,
              }),
              formatMessage({
                id: `${pluginId}.list.creation_date`,
              }),
              formatMessage({
                id: `${pluginId}.list.submissions`,
              }),
              formatMessage({
                id: `${pluginId}.list.handlers`,
              }),

              <VisuallyHidden>Actions</VisuallyHidden>,
            ].map((heading, index) => (
              <Th key={`heading-${index}`}>
                <Typography variant="sigma">{heading}</Typography>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {Boolean(state.forms.length) &&
            state.forms.map((form: FormType) => (
              <Tr key={`${form.id}-form`}>
                <Td>{form.id}</Td>
                <Td>
                  <Typography textColor="neutral800">
                    {form.attributes.title}
                  </Typography>
                </Td>

                <Td>
                  <Typography textColor="neutral800">
                    {formatDate(form.attributes.createdAt, {
                      dateStyle: "full",
                      timeStyle: "short",
                    })}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {form.attributes.submissions?.length ?? 0}
                  </Typography>
                </Td>
                <Td>
                  <IconButtonGroup justifyContent="start">
                    {Boolean(form.attributes?.notifications!.length) &&
                      form.attributes?.notifications!.map((notification) => (
                        <React.Fragment key={`notification-${notification.id}`}>
                          <Flex style={{ position: "relative" }}>
                            <IconButton
                              onClick={() =>
                                openNotificationModal(
                                  form,
                                  notification.identifier as HandlerTypeEnum
                                )
                              }
                              label={formatMessage({
                                id: `${pluginId}.forms.fields.actions.${notification.identifier}`,
                              })}
                              icon={
                                notification.identifier ===
                                HandlerTypeEnum.Notification ? (
                                  <Bell />
                                ) : (
                                  <Mail />
                                )
                              }
                            />
                            <Icon
                              style={{
                                position: "absolute",
                                width: ".65rem",
                                top: "-0.25rem",
                                left: "-0.25rem",
                              }}
                              aria-hidden={true}
                              colors={(theme: any) => ({
                                rect: {
                                  fill: notification.enabled
                                    ? theme.colors["success600"]
                                    : theme.colors["danger600"],
                                },
                              })}
                              as={Dot}
                            />
                          </Flex>
                        </React.Fragment>
                      ))}
                  </IconButtonGroup>
                </Td>
                <Td>
                  <IconButtonGroup justify="end">
                    {Boolean(form.attributes?.submissions!.length) && (
                      <IconButton
                        onClick={() =>
                          history.push(
                            `/plugins/${pluginId}/submission/list/${form.id}`
                          )
                        }
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.submissions`,
                        })}
                        icon={<PaperPlane />}
                      />
                    )}
                    <IconButton
                      onClick={() =>
                        history.push(
                          `/plugins/${pluginId}/form/edit/${form.id}`
                        )
                      }
                      label={formatMessage({
                        id: `${pluginId}.forms.fields.actions.edit`,
                      })}
                      icon={<Pencil />}
                    />
                    <IconButton
                      onClick={() => openConfirmModal(form)}
                      label={formatMessage({
                        id: `${pluginId}.forms.fields.actions.remove`,
                      })}
                      icon={<Trash />}
                    />
                  </IconButtonGroup>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </StrapiTable>

      {isModalVisible && (
        <NotificationModal
          type={notificationType!}
          isModalVisible={isModalVisible}
          setModalIsVisible={setModalIsVisible}
        />
      )}
      <Dialog
        setIsVisible={setIsVisible}
        confirmAction={deleteForm}
        isVisible={isVisible}
        description={formatMessage({
          id: `${pluginId}.dialog.delete.description`,
        })}
        title={formatMessage({ id: `${pluginId}.dialog.delete.text` })}
      />
    </>
  );
};

export default Table;
