import {
    Flex,
    Table,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Stack,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Textarea,
    // Select,
    InputLeftAddon,
    HStack,
    Tag,
  } from "@chakra-ui/react";
  import { Input } from "@chakra-ui/react";
  import React, { useEffect, useMemo, useState } from "react";
  import {
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
  } from "react-table";
  import Select from 'react-select';
  // Custom components
  import Card from "../../../../components/card/Card";
  import Menu from "../../../../components/menu/ProjectTableMenu";
  
  // Assets
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  import APIClient from "../../../../lib/APIClient";
  import { CalendarIcon, CheckIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
  import { PersonIcon } from "../../../../components/icons/Icons";
  import axios from "axios";
  axios.defaults.withCredentials = true;
  import {baseUrl} from "../../../../utility/index";
  import Cookies from "js-cookie";
  import toast from 'react-hot-toast';
  
  export default function DeleteModal(props) {
    const { isOpen, onClose, targetProject} = props;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    //const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen , onClose: onDeleteClose } = useDisclosure()
    
    const [projectData, setProjectData] = useState({});
    // const [assignedTo, setAssignedTo] = useState([])
    const [projectLead, setProjectLead] = useState([])
    const [owner, setOwner] = useState([])    

    const deleteProject = (projectData) =>{
  
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          'authorization':`Token ${Cookies.get('token')}`,
        },
      };
  
      axios
        .delete(`${baseUrl}business_analysis/projects/${projectData.id}`,config)
        .then((response) => {
          onClose();
          //getProjects();
          console.log("check our response:", response.data);
          toast.success(`${response.data.message}`);
        })
        .catch((error) => {
          console.log(error);
          toast.error('Project Not deleted!');
        });
    }

    const test = () =>{
        console.log(targetProject)
        deleteProject(targetProject)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Delete Project </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                Are you sure you want to delete {targetProject.name}?
            </ModalBody>
            <ModalFooter>
            <Button variant="ghost" mr={3}>Cancel</Button>
                <Button colorScheme="red" onClick={test}>
                    Delete
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
      );
  }
  