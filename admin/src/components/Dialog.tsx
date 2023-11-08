import * as React from "react";
import {
  Button,
  Box,
  Dialog as StrapiDialog,
  DialogBody,
  Flex,
  DialogFooter,
  Typography,
} from "@strapi/design-system";
import { Trash, ExclamationMarkCircle } from "@strapi/icons";

const Dialog = ({
  title,
  description,
  isVisible,
  setIsVisible,
  confirmAction,
}: {
  title: string;
  description: string;
  isVisible: boolean;
  setIsVisible: Function;
  confirmAction: Function;
}) => {
  return (
    <StrapiDialog
      onClose={() => setIsVisible(false)}
      title={title}
      isOpen={isVisible}
    >
      <DialogBody icon={<ExclamationMarkCircle />}>
        <Flex direction="column" alignItems="center" gap={2}>
          <Flex justifyContent="center">
            <Typography id="confirm-description">{description}</Typography>
          </Flex>
        </Flex>
      </DialogBody>
      <DialogFooter
        startAction={
          <Button onClick={() => setIsVisible(false)} variant="tertiary">
            Cancel
          </Button>
        }
        endAction={
          <Button
            variant="danger-light"
            onClick={() => confirmAction()}
            startIcon={<Trash />}
          >
            Confirm
          </Button>
        }
      />
    </StrapiDialog>
  );
};

export default Dialog;
