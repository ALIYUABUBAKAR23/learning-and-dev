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

    const {
      projectId,
      onOpen,
      isOpen,
      onClose,
      setProjectToDelete,
      setProjectList
    } = props;

    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    //const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isDeleteOpen , onClose: onDeleteClose } = useDisclosure()

    const [projectData, setProjectData] = useState({});
    // const [assignedTo, setAssignedTo] = useState([])
    const [projectLead, setProjectLead] = useState([])
    const [owner, setOwner] = useState([])    

    const getProjects = () =>{
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          'authorization':`Token ${Cookies.get('token')}`,
        },
      };
  
      axios
        .get(`${baseUrl}business_analysis/projects`, config)
        .then((response) => {
          console.log("check our projects: ", response.data);
          setProjectList(response.data)
        })
        .catch((error) => {
          console.log(error);
        });
    }

    const deleteProject = (project_id) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
        data: { project_id: project_id },
      };
  
      axios
        .delete(`${baseUrl}business_analysis/projects`, config)
        .then((response) => {
          onClose();
          getProjects();
          toast.success(`Successfully deleted project!`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not deleted!");
        });
    };

    return (
      <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      size="sm"
      onClose={() => {
        onClose();
        setProjectToDelete();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Confirm Delete </ModalHeader>
        <ModalCloseButton />
        <ModalBody>Are you sure you want to delete this account?</ModalBody>
        <ModalFooter>
          <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              onClose();
              setProjectToDelete();
            }}
          >
            No
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              console.log(projectId);
              deleteProject(projectId);
            }}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
      );
  }
  