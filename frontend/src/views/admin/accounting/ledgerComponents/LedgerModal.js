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
      //onSelect,
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

  	useEffect(() => {
      console.log(updatedLedgerDetails)
    }, []);
    
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
				<FormControl>
			        <InputGroup>
						<InputLeftAddon children="Account" borderRadius="16px" />
						<Select
							name="account_id"
                            isMulti
							options={accountList}
              onChange={handleChange}
							className="basic-select"
							classNamePrefix="select"
              defaultValue={ledgerDetails.account_id}
						/>
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Transaction Date" borderRadius="16px" />
						<Input
							type='date'
							name="transaction_date"
							placeholder="Transaction Date"
							borderRadius="16px"
              defaultValue={ledgerDetails.transaction_date}
              onChange={handleChange}
							/>
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Account Code" borderRadius="16px" />
						<Input		
							name="account_code"
							placeholder="Account Code"
							type="number"
                            borderRadius="16px"
              defaultValue={ledgerDetails.account_code}

              onChange={handleChange}
							/>
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Description" borderRadius="16px" />
						<Textarea
					name="description"
					borderRadius="16px"
					placeholder="Enter A Brief Or Detailed Description Of The Ledger"
          defaultValue={ledgerDetails.description}
          onChange={handleChange}
          />
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Debit" borderRadius="16px" />
						<Input
									name="dr"
									placeholder="DR"
									type="number"
									borderRadius="16px"
                  defaultValue={ledgerDetails.dr}
                  onChange={handleChange}
                  />
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Credit" borderRadius="16px" />
						<Input
									name="cr"
									placeholder="CR"
									type="number"
									borderRadius="16px"
                  defaultValue={ledgerDetails.cr}
                  onChange={handleChange}
                  />
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Agent Organization" borderRadius="16px" />
						<Input
									name="agent_organization"
									placeholder="Agent Organization"
									borderRadius="16px"
                  defaultValue={ledgerDetails.agent_organization}
                  onChange={handleChange}
                  />
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Type" borderRadius="16px" />
						<Input
									name="type"
									placeholder="Type"
									borderRadius="16px"
                  defaultValue={ledgerDetails.type}
                  onChange={handleChange}
                  />
					</InputGroup>
				</FormControl>
				<FormControl>
					<InputGroup>
						<InputLeftAddon children="Reference No" borderRadius="16px" />
						<Input
                  name="reference_number"
									placeholder="Reference Number"
									type="number"
                  borderRadius="16px"
                  defaultValue={ledgerDetails.reference_number}
                  onChange={handleChange}
                  />
					</InputGroup>
				</FormControl>
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
                onSubmit(updatedLedgerDetails);
              }}
            >
              Edit
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default LedgerModal;
  