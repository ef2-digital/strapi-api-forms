import * as React from "react";
import { useContext } from "react";

/*
 * Strapi Design system
 */
import {
  Button,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalLayout,
  Typography,
} from "@strapi/design-system";

import { useIntl } from "react-intl";
import { HandlerContext } from "../../hooks/useHandler";
import pluginId from "../../pluginId";

interface FieldModalProps {}

const HandlerModal = () => {
  const { formatMessage } = useIntl();
  const { visible, setVisible, handler } = useContext(HandlerContext);

  const closeModal = () => {
    setVisible(false);
  };

  if (!handler) {
    return <></>;
  }

  return (
    <>
      {visible && (
        <ModalLayout onClose={() => closeModal()} labelledBy="title">
          <ModalHeader>
            <Typography textAlign="center">{handler.identifier}</Typography>
          </ModalHeader>
          <ModalBody>
            <pre>{JSON.stringify(handler.data, null, 2)}</pre>
          </ModalBody>
          <ModalFooter
            startActions={
              <Button onClick={() => closeModal()} variant="tertiary">
                {formatMessage({ id: `${pluginId}.close` })}
              </Button>
            }
          />
        </ModalLayout>
      )}
    </>
  );
};

export default HandlerModal;
