import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
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
  
  function LedgerModal(props) {

  
    const {
      onSelect,
      accountList,
      editLedger,
      accounts,
      onChange,
      onOptionSelect,
      onSubmit,
      setLedgerToEdit,
      onOpen,
      isOpen,
      onClose,
    } = props;
  
    const [ledgerDetails, setLedgerDetails] = useState({});
    const [updatedLedgerDetails, setUpdatedLedgerDetails] = useState({});
  
    useEffect(() => {
      setLedgerDetails(editLedger || "");
    }, [editLedger]);
  
    useEffect(() => {
      setUpdatedLedgerDetails(ledgerDetails || editLedger);
    }, [ledgerDetails]);
  
    const handleChange = handleWidgetChange2(
      setLedgerDetails,
      setUpdatedLedgerDetails,
      ledgerDetails,
      updatedLedgerDetails
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          setLedgerToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editLedger ? "Edit Ledger" : "Create New Ledger"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
						{/* <InputGroup>
                <InputLeftAddon children="Account" borderRadius="16px" />
                <HStack spacing={4}>
                  {editLedger?.account_id
                    ? editLedger?.account_id.map((account, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {account.name}
                        </Tag>
                      ))
                    : accounts?.map((account, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {account.name}
                        </Tag>
                      ))}
                </HStack>
              </InputGroup> */}
              <InputGroup>
                <InputLeftAddon children="Transaction Date" borderRadius="16px" />
                <Input
								  type='date'
                  name="transaction_date"
                  placeholder="Transaction Date"
                  value={ledgerDetails?.transaction_date || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Account Code" borderRadius="16px" />
                <Input
                  name="account_code"
                  placeholder="Account Code"
                  value={ledgerDetails?.account_code || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
							<InputGroup>
                <InputLeftAddon children="Description" borderRadius="16px" />
  
                <Textarea
                  name="description"
                  placeholder="Enter A Brief Or Detailed Description Of The Ledger"
                  value={ledgerDetails?.description || ""}
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CheckIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="DR" borderRadius="16px" />
                <Input
                  name="dr"
                  placeholder="DR"
                  value={ledgerDetails?.dr || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="CR" borderRadius="16px" />
                <Input
                  name="cr"
                  placeholder="CR"
                  value={ledgerDetails?.cr || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Agent Organization" borderRadius="16px" />
                <Input
                  name="agent_organization"
                  placeholder="Agent Organization"
                  value={ledgerDetails?.agent_organization || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Type" borderRadius="16px" />
                <Input
                  name="type"
                  placeholder="Type"
                  value={ledgerDetails?.type || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Reference No" borderRadius="16px" />
                <Input
								  type='date'
                  name="reference_number"
                  placeholder="Reference No"
                  value={ledgerDetails?.reference_number || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
							</InputGroup>
              <InputGroup>
                <InputLeftAddon children="Account" borderRadius="16px" />
                <Select
                  options={accountList}
                  onChange={onSelect}
                  className="basic-select"
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
                setLedgerToEdit(null);
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onSubmit(editLedger ? "put" : "post", updatedLedgerDetails);
              }}
            >
              {editLedger ? "Edit" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default LedgerModal;
  