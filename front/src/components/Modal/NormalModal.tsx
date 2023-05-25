import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Modal,
  ModalCloseButton,
} from "@chakra-ui/react";

interface NormalModalProps {
  onCloseModal: () => void;
  confirmClear: () => void;
  text: string;
}

export const NormalModal = ({
  onCloseModal,
  confirmClear,
  text,
}: NormalModalProps) => {
  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={true}
        onClose={onCloseModal}
        size={"sm"}
      >
        <ModalOverlay />

        <ModalContent style={{ background: "#dddddd" }}>
          <ModalHeader> {text}?</ModalHeader>
          <ModalCloseButton style={{ border: "none", margin: "none" }} />
          <ModalFooter
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div></div>
            <div>
              <button
                onClick={() => {
                  onCloseModal();
                }}
                style={{ marginRight: "20px" }}
                type="button"
              >
                No
              </button>
              <button
                onClick={() => {
                  onCloseModal();
                }}
              >
                <button
                  onClick={() => {
                    confirmClear();
                  }}
                  type="submit"
                >
                  Yes
                </button>
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
