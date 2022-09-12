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
  InputGroup,
  InputRightElement,
  Textarea,
  // Select,
  InputLeftAddon,
  HStack,
  Tag,
  useDisclosure,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Select from "react-select";
// Custom components

// Assets
import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
import axios from "axios";
import { handleWidgetChange2 } from "../../../../utility";
axios.defaults.withCredentials = true;

function ContractModal(props) {
  const contractData = [
    { label: "Full-Time", value: "Full-Time" },
    { label: "Part-Time", value: "Part-Time" }, 
  ];

  const TYPE = {
    FullTime: { label: "Full-Time", value: "Full-Time" },
    PartTime: { label: "Part-Time", value: "Part-Time" }, 
  };
  
  const {
    onSelect,
    userList,
    editContract,
    assignedTo,
    onChange,
    onOptionSelect,
    onSubmit,
    setContractToEdit,
    onOpen,
    isOpen, 
    onClose,
    } = props;

    const [contractDetails, setContractDetails] = useState({});
    const [updatedContractDetails, setUpdatedContractDetails] = useState({});
 
    useEffect(() => {
      setContractDetails(editContract || "");
    }, [editContract]);
  
    useEffect(() => {
      setUpdatedContractDetails(contractDetails || editContract);
    }, [contractDetails]);
  
    const handleChange = handleWidgetChange2(
      setContractDetails,
      setUpdatedContractDetails,
      contractDetails,
      updatedContractDetails
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          setContractToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editContract ? "Edit Contract" : "Create New Contract"}</ModalHeader>
          <ModalCloseButton />

        <ModalBody>
          <Stack spacing={4}>

            <InputGroup>
              <InputLeftAddon children="Contract Type" borderRadius="16px" />
              <Select
                name="contract_type"
                value={TYPE[contractDetails.contract_type]}
                options={contractData}
                onChange={(option) => handleChange(option, "contract_type")}
              />
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Date Issued" borderRadius="16px" />
              <Input
                name="date_issued"
                placeholder="Set the date this contract was issued"
                type="date"
                onChange={handleChange}
                value={contractDetails?.date_issued || ""}
              />

            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Contract Length" borderRadius="16px" />

              <Input
                name="contract_length"
                placeholder="Set the length of this contract in months"
                type="number"
                onChange={handleChange}
                value={contractDetails?.contract_length || ""}
              />

        
            </InputGroup>

            <InputGroup>
              <InputLeftAddon children="Contract Details" borderRadius="16px" />
              <Textarea
                name="contract_details"
                placeholder="Set Contract Details"
                borderRadius="16px"
                size='lg'
        	      value={contractDetails?.contract_details || ""}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Contract Document" borderRadius="16px" />
              <Input
                name="contract_document"
                placeholder="Set Contract Document"
                borderRadius="16px"
                onChange={handleChange}
                value={contractDetails?.contract_document || ""}
              />
    
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="End Date" borderRadius="16px" />
              <Input
                name="end_date"
                placeholder="Set the end date of this contract"
                type="date"
                onChange={handleChange}
                value={contractDetails?.end_date || ""}
              />
    
            </InputGroup>
            <InputGroup>
              <InputLeftAddon children="Approved By" borderRadius="16px" />
              <Select
                options={userList}
                isMulti
                onChange={onSelect}
                className="basic-multi-select"
                classNamePrefix="select"
              />
          
            </InputGroup>
          
          </Stack>
        </ModalBody>
        <ModalFooter>
        <Button
            colorScheme="brand"
            mr={3}
            onClick={() => {
              setContractToEdit(null);
              onClose();
            }}
          >
            Close
          </Button>
          <Button
            variant="ghost"
            onClick={() => {
              onSubmit(editContract ? "put" : "post", updatedContractDetails);
            }}
          >
            {editContract ? "Edit" : "Create"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}




export default ContractModal;
