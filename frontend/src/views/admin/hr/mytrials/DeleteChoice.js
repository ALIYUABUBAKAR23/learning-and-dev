import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'

function DeleteStaff() {
    const { isOpen, onOpen, onClose } = useDisclosure()
  
    return (
      <>
        <Button onClick={onOpen} colorScheme='blue'>Delete</Button>
  
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Staff</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
                Are you sure you want to Delete?
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' mr={3}>
                YES
              </Button>
              <Button onClick={onClose} colorScheme='red'>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }