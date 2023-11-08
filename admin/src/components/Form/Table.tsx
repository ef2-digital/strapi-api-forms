import { FormCollectionType } from "../../utils/types";
import * as React from "react";
import { useIntl } from "react-intl";
import pluginId from "../../pluginId";
import Dialog from "../../components/Dialog";
import { useHistory } from "react-router-dom";
import { useState } from "react";

import {
  IconButtonGroup,
  IconButton,
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
import { Trash, Pencil, Mail, Bell } from "@strapi/icons";
import formRequests from "../../api/form";
import NotificationModal from "../Modal/NotificationModal";

const Table = ({ forms }: { forms: FormCollectionType }) => {
  const history = useHistory();
  const { formatMessage, formatDate } = useIntl();
  const [isVisible, setIsVisible] = useState(false);
  const [isModalVisible, setModalIsVisible] = useState(false);
  const [selectedForm, setSelectedForm] = useState<number | null>(null);
  const [allForms, setAllForms] = useState<FormCollectionType>(forms);

  const openConfirmModal = (id: number) => {
    setSelectedForm(id);
    setIsVisible(true);
  };

  const openNotificationModal = (id: number) => {
    setSelectedForm(id);
    setModalIsVisible(true);
  };

  const deleteForm = async () => {
    formRequests.deleteForm(selectedForm!).then(() => {
      setIsVisible(false);
      setAllForms(allForms.filter((form) => form.id !== selectedForm));
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
                id: `${pluginId}.list.submissions`,
              }),
              formatMessage({
                id: `${pluginId}.list.creation_date`,
              }),
              <VisuallyHidden>Actions</VisuallyHidden>,
            ].map((heading, index) => {
              return (
                <Th key={index}>
                  <Typography variant="sigma">{heading}</Typography>
                </Th>
              );
            })}
          </Tr>
        </Thead>
        <Tbody>
          {allForms.length > 0 ? (
            allForms.map((form) => (
              <Tr key={`${form.id}-form`}>
                <Td>{form.id}</Td>
                <Td>
                  <Typography textColor="neutral800">
                    {form.attributes.title}
                  </Typography>
                </Td>
                <Td>
                  <Typography textColor="neutral800">
                    {form.attributes.submissions?.length ?? 0}
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
                  <IconButtonGroup justifyContent="end">
                    {Boolean(form.attributes?.notifications!.length) && (
                      <IconButton
                        onClick={() => openNotificationModal(form.id!)}
                        label={formatMessage({
                          id: `${pluginId}.forms.fields.actions.notifications`,
                        })}
                        icon={<Bell />}
                      />
                    )}

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
                        icon={<Mail />}
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
                      onClick={() => openConfirmModal(form.id!)}
                      label={formatMessage({
                        id: `${pluginId}.forms.fields.actions.remove`,
                      })}
                      icon={<Trash />}
                    />
                  </IconButtonGroup>
                </Td>
              </Tr>
            ))
          ) : (
            <></>
          )}
        </Tbody>
      </StrapiTable>

      {isModalVisible && (
        <NotificationModal
          formId={selectedForm!}
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
