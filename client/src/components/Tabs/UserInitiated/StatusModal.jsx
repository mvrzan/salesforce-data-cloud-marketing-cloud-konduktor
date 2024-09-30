import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { Button } from "@twilio-paste/core/button";
import { Spinner } from "@twilio-paste/core/spinner";
import { useUID } from "@twilio-paste/core/uid-library";
import { Modal, ModalBody, ModalFooter, ModalFooterActions, ModalHeader, ModalHeading } from "@twilio-paste/core/modal";
import { Stack } from "@twilio-paste/core";

const StatusModal = ({ isModalOpen, setIsModalOpen, publishingText }) => {
  const handleClose = () => setIsModalOpen(false);
  const modalHeadingID = useUID();

  return (
    <div>
      <Modal ariaLabelledby={modalHeadingID} isOpen={isModalOpen} onDismiss={handleClose} size="default">
        <ModalHeader>
          <ModalHeading as="h3" id={modalHeadingID}>
            Publishing to Marketing Cloud
          </ModalHeading>
        </ModalHeader>
        <ModalBody>
          <Stack orientation="vertical" spacing="space80">
            <Flex hAlignContent="center" vAlignContent="center" margin="space60">
              <Spinner decorative={false} title="Loading" size="sizeIcon110" color="colorTextDestructive" />
            </Flex>
            <Flex hAlignContent="center" vAlignContent="center" margin="space60">
              <Text fontSize="fontSize60">{publishingText}</Text>
            </Flex>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ModalFooterActions>
            <Button variant="destructive" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooterActions>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default StatusModal;
