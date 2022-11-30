import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    useColorModeValue,
    InputGroup,
    InputRightElement,
    Textarea,
    InputLeftAddon,
  } from "@chakra-ui/react";
  import { Input } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import Select from "react-select";
  import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
  import axios from "axios";
  import { handleWidgetChange2 } from "../../../utility";
  axios.defaults.withCredentials = true;
  
  function ReportModal(props) {
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
  
    const reportStatusOptions = [
      { label: "Active", value: "Active" },
      { label: "InActive", value: "InActive" },
      ];
  
    const {
      editReport,
      onChange,
      onSubmit,
      setReportToEdit,
      onOpen,
      isOpen,
      onClose,
    } = props;
  
    const [reportDetails, setReportDetails] = useState({});
    const [updatedReportDetails, setUpdatedReportDetails] = useState({});
  
    useEffect(() => {
      setReportDetails(editReport || "");
    }, [editReport]);
  
    useEffect(() => {
      setUpdatedReportDetails(reportDetails || editReport);
    }, [reportDetails]);
  
    const handleChange = handleWidgetChange2(
      setReportDetails,
      setUpdatedReportDetails,
      reportDetails,
      updatedReportDetails
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          setReportToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editReport ? "Edit Report" : "Create New Report"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              {/* Reporter name field */}            
              <InputGroup>
                <InputLeftAddon children="Reporter" borderRadius="16px" />
                <Input
                  name="reporter_name"
                  type="text"
                  placeholder="Reporter name"
                  value={reportDetails?.reporter_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                  color={textColor} 
                />
              </InputGroup>
              {/* Title field */}            
              <InputGroup>
                <InputLeftAddon children="Title" borderRadius="16px" />
                <Input
                  name="title"
                  type="text"
                  placeholder="Title of the incidence"
                  value={reportDetails?.title || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                  color={textColor} 
                />
              </InputGroup>
              {/* Description field */}            
              <InputGroup>
                <InputLeftAddon children="Description" borderRadius="16px" />
                <Textarea
                  name="description"
                  placeholder="Enter a Brief Description of the Incidence"
                  defaultValue={reportDetails?.description || ""}
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
              {/* Reporter date field */}            
              <InputGroup>
                <InputLeftAddon children="Date" borderRadius="16px" />
                <Input
                  name="report_date"
                  type="date"
                  placeholder="Report Date"
                  value={reportDetails?.report_date || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                  color={textColor} 
                />
              </InputGroup>
              {/* Reporter incidence date field */}            
              <InputGroup>
                <InputLeftAddon children="Date" borderRadius="16px" />
                <Input
                  name="incidence_report_date"
                  type="date"
                  placeholder="Incidence report date"
                  value={reportDetails?.incidence_report_date || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                  color={textColor} 
                />
              </InputGroup>
               {/* Report status field */}            
            <InputGroup>
              <InputLeftAddon children="status" borderRadius="16px" />
              <Select
                name="status"
                options={reportStatusOptions}
                onChange={(option) => handleChange(option.value, "status")}
              />
            </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                setReportToEdit(null);
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onSubmit(editReport ? "put" : "post", updatedReportDetails);
              }}
            >
              {editReport ? "Edit" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default ReportModal;
  