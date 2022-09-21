import {
    Flex,
    Table,
    Progress,
    Icon,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
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
  import Select from "react-select";
  // Custom components
  import Card from "../../../../components/card/Card";
  import Menu from "./MainMenu";
  
  // Assets
  import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
  import APIClient from "../../../../lib/APIClient";
  import {
    CalendarIcon,
    CheckIcon,
    PhoneIcon,
    PlusSquareIcon,
  } from "@chakra-ui/icons";
  import { PersonIcon } from "../../../../components/icons/Icons";
  import axios from "axios";
  axios.defaults.withCredentials = true;
  import { baseUrl } from "../../../../utility/index";
  import Cookies from "js-cookie";
  import toast from "react-hot-toast";
  import LedgerModal from "./LedgerModal";
  import ConfirmationModal from "./ConfirmationModal";
  
  export default function ColumnsTable(props) {
    const { columnsData, tableData, setLedgerList } = props;
  
    const columns = useMemo(() => columnsData, [columnsData]);
    const data = useMemo(() => tableData, [tableData]);
  
    const tableInstance = useTable(
      {
        columns,
        data,
      },
      useGlobalFilter,
      useSortBy,
      usePagination
    );
  
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      page,
      prepareRow,
      initialState,
    } = tableInstance;
    initialState.pageSize = 10;
  
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
      isOpen: isOpenConfirm,
      onOpen: onOpenConfirm,
      onClose: onCloseConfirm,
    } = useDisclosure();
    const [ledgerData, setLedgerData] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [formErrors, setFormErrors] = useState(null);
    const [accountList, setAccountList] = useState([]);
    const [ledgerToEdit, setLedgerToEdit] = useState();
    const [ledgerToDelete, setLedgerToDelete] = useState();

  
    const getLedgers = () => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios
        .get(`${baseUrl}accounts/ledgers/`, config)
        .then((response) => {
          console.log("check our ledgers: ", response.data);
          setLedgerList(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const getAccounts = () => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios
        .get(`${baseUrl}accounts/accounts/`, config)
        .then((response) => {
          console.log("check our accounts: ", response.data);
          setAccountList(
            response.data.map((option) => ({
              label: `${option.account_class} ${option.code}`,
              value: option.id,
            }))
          );
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    const createLedger = (ledgerData, httpVerb) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
      };
  
      axios[httpVerb](`${baseUrl}accounts/ledgers/`, ledgerData, config)
        .then((response) => {
          onClose();
          getLedgers();
          setLedgerData();
          setLedgerToEdit();
          console.log("check our response:", response.data);
          toast.success(`${response.data.message}`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not created!");
        });
    };
  
    const deleteLedger = (ledger_id) => {
      const config = {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
          authorization: `Token ${Cookies.get("token")}`,
        },
        data: { ledger_id: ledger_id },
      };
  
      axios
        .delete(`${baseUrl}accounts/ledgers/`, config)
        .then((response) => {
          onCloseConfirm();
          getLedgers();
          console.log("Successfully deleted ledger!", response.data);
          toast.success(`Successfully deleted ledger!`);
        })
        .catch((error) => {
          console.log(error);
          toast.error("Not deleted!");
        });
    };
  
    const setEditLedger = (ledgerData) => {
      console.log("ledger data: ", ledgerData);
      setLedgerToEdit(ledgerData);
      onOpen();
    };

    const setLedgerForDelete = (ledgerData) => {
      console.log("delete ledger data id: ", ledgerData.id);
      setLedgerToDelete(ledgerData.id);
      onOpenConfirm();
    };

    const onChange = (event) => {
      console.log("see the event: ", event);
      const { name, value } = event.target;
      console.log("see the name, event : ", name, " ,", value);
      const ledger = { ...ledgerData };
      ledger[name] = value;
      setLedgerData(ledger);
      setFormErrors(null);
    };
  
    const onOptionSelect = (event, action) => {
      console.log("see the event: ", event, action);
      const { label, value } = event;
      console.log("see the name, event : ", label, " ,", value);
      const ledger = { ...ledgerData };
      ledger[action.name] = value;
      setLedgerData(ledger);
    };
  
    // const onSelect = (event) => {
    //   console.log("see the event: ", event);
    //   var newState;
    //   if (event.length > 0) {
    //     event?.map((input) => {
    //       newState = [
    //         ...assignedTo,
    //         {
    //           id: input.value ? input.value : null,
    //           name: input.label ? input.label : null,
    //         },
    //       ];
    //     });
    //   } else {
    //     newState = [];
    //   }
    //   setAssignedTo(newState);
    // };
  
    // const formatData = (data) => {
    //   console.log("formatting...");
    //   console.log(data);
    //   const keys = Object.keys(data);
  
    //   keys.forEach((key) => {
    //     if (key === "priority") {
    //       data[key] = data[key].value;
    //     }
    //     if (key === "status") {
    //       data[key] = data[key].value;
    //     }
    //   });
  
    //   console.log(`our formatted data in formatData: \n ${data}`);
    //   return data;
    // };
  
    const onSubmit = (httpVerb, ledgerData) => {
      const ledger = { ...ledgerData };
      console.log("check our post:", ledgerData);
      createLedger(ledger, httpVerb);
    };

    const whenSubmit = (ledgerData) => {
      console.log("check our post:", ledgerData);
      const ledger = { ...ledgerData };
      console.log("check our post:", ledgerData);
      createLedger(ledger);
    };

    useEffect(() => {
      getAccounts();
    }, []);
	return (
		<Card
			direction="column"
			w="100%"
			px="0px"
			overflowX={{ sm: "scroll", lg: "scroll" }}
		>
			<Flex px="25px" justify="space-between" mb="20px" align="center">
				<Text
					color={textColor}
					fontSize="22px"
					fontWeight="700"
					lineHeight="100%"
				>
					Ledger
				</Text>
			</Flex>
			<Table {...getTableProps()} variant="simple" color="gray.500" mb="24px">
				<Thead>
					{headerGroups.map((headerGroup, index) => (
						<Tr {...headerGroup.getHeaderGroupProps()} key={index}>
							{headerGroup.headers.map((column, index) => (
								<Th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									pe="10px"
									key={index}
									borderColor={borderColor}
								>
									<Flex
										justify="space-between"
										align="center"
										fontSize={{ sm: "10px", lg: "12px" }}
										color="gray.400"
									>
										{column.render("Header")}
									</Flex>
								</Th>
							))}
						</Tr>
					))}
				</Thead>
				<Tbody {...getTableBodyProps()}>
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<Tr {...row.getRowProps()} key={index}>
									{row.cells.map((cell, index) => {
										let data = "";
											if (cell.column.Header === "ACCOUNT") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										} else if (cell.column.Header === "TRANSACTION DATE") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													$ {cell.value}
												</Text>
											);
										} else if (cell.column.Header === "ACCOUNT CODE") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
											
										} else if (cell.column.Header === "DESCRIPTION") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										} else if (cell.column.Header === "DR") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										} else if (cell.column.Header === "CR") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										} else if (cell.column.Header === "AGENT ORGANIZATION") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										} else if (cell.column.Header === "TYPE") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										} else if (cell.column.Header === "REFERENCE NO") {
											data = (
												<Text color={textColor} fontSize='sm' fontWeight='700'>
													{cell.value}
												</Text>
											);
										}  else if (cell.column.Header === "ACTIONS") {
                      data = (
                        <Menu
                          editData={cell.row.original}
                          setLedgerToEdit={setEditLedger}
                          setLedgerForDelete={setLedgerForDelete}
                          onOpen={onOpen}
                          onOpenConfirm={onOpenConfirm}
                        />
                      );
                    } else {
                      data = (
                        <Text color={textColor} fontSize="sm" fontWeight="700">
                          {cell.value}
                        </Text>
                      );
										}
											return (
                      <Td
                        {...cell.getCellProps()}
                        key={index}
                        fontSize={{ sm: "14px" }}
                        minW={{ sm: "150px", md: "200px", lg: "auto" }}
                        borderColor="transparent"
                      >
                        {data}
                      </Td>
                    );
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
        <InputGroup>
                <InputLeftAddon children="Transaction Date" borderRadius="16px" />
                <Input
								  type='date'
                  name="transaction_date"
                  placeholder="Transaction Date"
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Account Code" borderRadius="16px" />
                <Input
                  name="account_code"
                  placeholder="Account Code"
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
			<Button variant="ghost" onClick={whenSubmit}>Create</Button>
      <LedgerModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        // onSelect={onSelect}
        accountList={accountList}
        // assignedTo={assignedTo}
        onChange={onChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
        whenSubmit={whenSubmit}
        editLedger={ledgerToEdit}
        setLedgerToEdit={setEditLedger}
      />
      <ConfirmationModal
        ledgerId={ledgerToDelete}
        deleteLedger={deleteLedger}
        setLedgerToDelete={setLedgerToDelete}
        onOpen={onOpenConfirm}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      />
      </Card>
    );
  
  }
  