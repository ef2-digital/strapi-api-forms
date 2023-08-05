import * as React from "react";
import { useState } from "react";
import { FormType } from "../../utils/types";
import formRequests from "../../api/form";
import { format, parseISO } from "date-fns";

/*
 * Strapi Design system
 */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  LinkButton,
  Stack,
  Tr,
  Td,
  Typography,
} from "@strapi/design-system";
import {
  Pencil,
  ExclamationMarkCircle,
  Trash,
  Attachment,
  Mail,
} from "@strapi/icons";
import pluginId from "../../pluginId";
import { useIntl } from "react-intl";

type FormListItemProps = {
  item: FormType;
};
const FormListItem = ({ item }: FormListItemProps) => {
  const { formatMessage } = useIntl();
  const [isVisible, setIsVisible] = useState<Boolean>(false);

  const remove = () => {
    // @ts-ignore
    formRequests.deleteForm(item.id).then(() => window.location.reload());
  };

  return (
    <Tr>
      <Td>
        <Typography textColor="neutral800">{item.attributes.title}</Typography>
      </Td>
      <Td>
        <Typography textColor="neutral800">
          {
            //@ts-ignore
            format(parseISO(item.createdAt!), "dd-MM-yyyy HH:mm")
          }
        </Typography>
      </Td>
      <Td>
        <Flex justifyContent="right" alignItems="right">
          <Stack horizontal={true} spacing={3}>
            <LinkButton
              to={`/plugins/${pluginId}/form/submissions/${item.id}`}
              startIcon={<Mail />}
            >
              {formatMessage({ id: `${pluginId}.submissions.label` })}
            </LinkButton>
            <LinkButton
              to={`/plugins/${pluginId}/form/edit/${item.id}`}
              startIcon={<Pencil />}
            >
              {formatMessage({ id: `${pluginId}.actions.edit` })}
            </LinkButton>
            <LinkButton
              to={`/plugins/${pluginId}/form/handlers/${item.id}`}
              startIcon={<Attachment />}
            >
              {formatMessage({ id: `${pluginId}.actions.handlers` })}
            </LinkButton>
            <Button
              onClick={() => setIsVisible(true)}
              startIcon={<Trash />}
              variant="danger"
            >
              {formatMessage({ id: `${pluginId}.actions.delete` })}
            </Button>
            <Dialog
              onClose={() => setIsVisible(false)}
              title={formatMessage({ id: `${pluginId}.dialog.confirm.title` })}
              isOpen={isVisible}
            >
              <DialogBody icon={<ExclamationMarkCircle />}>
                <Flex direction="column" alignItems="center" gap={2}>
                  <Flex justifyContent="center">
                    <Typography id="confirm-description">
                      {formatMessage({ id: `${pluginId}.dialog.delete.text` })}
                    </Typography>
                  </Flex>
                </Flex>
              </DialogBody>
              <DialogFooter
                startAction={
                  <Button
                    onClick={() => setIsVisible(false)}
                    variant="tertiary"
                  >
                    {formatMessage({ id: `${pluginId}.dialog.cancel` })}
                  </Button>
                }
                endAction={
                  <Button
                    onClick={() => remove()}
                    variant="danger-light"
                    startIcon={<Trash />}
                  >
                    {formatMessage({ id: `${pluginId}.dialog.confirm` })}
                  </Button>
                }
              />
            </Dialog>
          </Stack>
        </Flex>
      </Td>
    </Tr>
  );
};

export default FormListItem;
