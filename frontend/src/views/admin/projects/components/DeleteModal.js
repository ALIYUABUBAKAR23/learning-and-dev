import {
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
  } from "@chakra-ui/react";
  import React, { useEffect, useMemo, useState } from "react";

  // Assets
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
        <ModalHeader> Confirm Delete</ModalHeader>
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
  