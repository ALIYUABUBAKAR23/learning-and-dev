import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  

export default function StaffModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [scrollBehavior, setScrollBehavior] = React.useState('inside')
    return (
        <>
        <Button onClick={onOpen}>Create Staff</Button>

        <Modal scrollBehavior={'inside'} isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Create New Staff </ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>    
            <FormControl>
            <FormLabel>First name</FormLabel>
            <Input placeholder='First name' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Last name</FormLabel>
            <Input placeholder='Last name' />
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>Sex</FormLabel>
            <Input placeholder='Sex' />
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input placeholder='Date of Birth' />
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>State of Origin</FormLabel>
            <Input placeholder='State of Origin' />
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>Address</FormLabel>
            <Input placeholder='Address' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Phone Number</FormLabel>
            <Input placeholder='Phine Number' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Email' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Instagram</FormLabel>
            <Input placeholder='Instagram' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>LinkedIn</FormLabel>
            <Input placeholder='LinkedIN' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Staff ID</FormLabel>
            <Input placeholder='Staff ID' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Commencement Date</FormLabel>
            <Input placeholder='Commencement Date' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Salary</FormLabel>
            <Input placeholder='Salary' />
            </FormControl>

            <FormControl mt={4}>
            <FormLabel>Role</FormLabel>
            <Input placeholder='Role' />
            </FormControl>
            
            <FormControl mt={4}>
            <FormLabel>Department</FormLabel>
            <Input placeholder='Department' />
            </FormControl>

            </ModalBody>
            <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
        </>
    )
 }
 