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
	SimpleGrid,
	Box,
	Grid
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
import Menu from "./MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import APIClient from "../../../../lib/APIClient";
import { CalendarIcon, CheckIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { PersonIcon } from "../../../../components/icons/Icons";

import LedgerForm from "./LedgerForm";
//Modals
import ConfirmationModal from "./ConfirmationModal";
import LedgerModal from "./LedgerModal";

import axios from "axios";
axios.defaults.withCredentials = true;
import {baseUrl} from "../../../../utility/index";
import {baseUserUrl} from "../../../../utility/index";
import Cookies from "js-cookie";
import toast from 'react-hot-toast';

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
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100"); 	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isOpenEdit,
		onOpen: onOpenEdit,
		onClose: onCloseEdit,
	  } = useDisclosure();
	const {
		isOpen: isOpenConfirm,
		onOpen: onOpenConfirm,
		onClose: onCloseConfirm,
	  } = useDisclosure();

	const [ledgerData, setLedgerData] = useState({});
	//const [acct, setAcct] = useState([])
	const [formErrors, setFormErrors] = useState(null);
	const [accountList, setAccountList] = useState([])
	const [ledgerToEdit, setLedgerToEdit] = useState();
	const [ledgerToDelete, setLedgerToDelete] = useState();  
	const [dept, setDept] = useState();  


	const getLedgers = () =>{
		const config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
				'authorization':`Token ${Cookies.get('token')}`,
			},
		};

		axios
			.get(`${baseUrl}accounts/ledgers/`, config)
			.then((response) => {
				console.log("check our ledger: ", response.data);
				setLedgerList(response.data)
			})
			.catch((error) => {
				console.log(error);
			});
	}

	const getAccounts = () =>{
		const config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
				'authorization':`Token ${Cookies.get('token')}`,
			},                               
		};

		axios
			.get(`${baseUrl}accounts/accounts/`, config)
			.then((response) => {
				console.log("check our accounts: ", response.data);
				setAccountList(response.data.map(option => ({ label: `${option.account_class} ${option.code}`, value: option.id })))
			})
			.catch((error) => {
				console.log(error);
			});
	}

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
			getLedgers();
			setLedgerData();
			toast.success(`${response.data.message}`);
		  })
		  .catch((error) => {
			console.log(error);
			toast.error("Not created!");
		  });
	  };

	  const updateLedger = (ledgerData) => {
		const config = {
		  headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			"X-CSRFToken": Cookies.get("csrftoken"),
			authorization: `Token ${Cookies.get("token")}`,
		  },
		  data: { ledger_id: ledgerData.id},
		};
	
		axios
		  .put(`${baseUrl}accounts/ledgers/`, ledgerData, config)
		  .then((response) => {
			onCloseEdit();
			getLedgers();
			setLedgerData();
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
			toast.success(`Successfully deleted account!`);
		  })
		  .catch((error) => {
			console.log(error);
			toast.error("Not deleted!");
		  });
	  };
	

	const setEditLedger = (ledgerData) => {
		console.log("editing: ", ledgerData);
		setLedgerToEdit(ledgerData);
		onOpenEdit();
	  };
	
	const setLedgerForDelete = (ledgerData) => {
		setLedgerToDelete(ledgerData.id);
		onOpenConfirm();
	};
	  
	const onChange = (event) => {
		console.log('see the event: ', event);
		const { name, value } = event.target;
		console.log('see the name, event : ', name, ' ,',value);
		const ledger = { ...ledgerData };
		ledger[name] = value;
		setLedgerData(ledger);
		setFormErrors(null);
	};

	const onOptionSelect = (event, action) => {
		console.log('see the event: ', event, action);
		const { label, value } = event;
		console.log('see the name, event : ', label, ' ,',value);
		const ledger = { ...ledgerData };
		ledger[action.name] = value;
		setLedgerData(ledger);
	};

	const onSelect = (event) => {
		console.log('see the event: ', event);
		var newState;
		if (event.length > 0) {
			event?.map((input)=> {
				newState = [...dept, {id: input.value ? input.value : null, name: input.label ? input.label : null}];
			});
		}else{
			newState = [];
		}
		setDept(newState);
	};

	const onSubmitCreate = () => {
		const ledger = { ...ledgerData };
		createLedger(ledger, "post");
	};

	const onSubmitEdit = (editedLedger) => {
		const ledger = { ...editedLedger };
		updateLedger(ledger);
	};

	useEffect(() => {
		getAccounts();
		getLedgers()
	}, []);
	return (
		<Box pt={{ base: "10px"}}>
			<Grid
			mb='20px'
			gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
			gap={{ base: "20px", xl: "20px" }}
			display={{ base: "block", xl: "grid" }}>
			{/*Ledger Table */}			
			<Flex
			flexDirection='column'
			gridArea={{ xl: "1 / 1 / 2 / 3", "2xl": "1 / 1 / 2 / 2" }}>
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
												if (cell.column.Header === "ACTIONS") {
													data = (
														<Menu
														  editData={cell.row.original}
														  setLedgerToEdit={setEditLedger}
														  setLedgerForDelete={setLedgerForDelete}
														  onOpenEdit={onOpenEdit}
														  onOpenConfirm={onOpenConfirm}
														/>
													  );
											} else {
													data = (
														<Text color={textColor} fontSize='sm' fontWeight='700'>
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
													borderColor='transparent'>
													{data}
												</Td>
											);
										})}
									</Tr>
								);
							})}
							</Tbody>
				</Table>
			</Card>	
			</Flex>
			<LedgerForm
				onSelect={onSelect}
				accountList={accountList}
				onChange={onChange}
				onOptionSelect={onOptionSelect}
				onSubmit={onSubmitCreate}
				//editLedger={ledgerToEdit}
				//setLedgerToEdit={setEditLedger}
			></LedgerForm>
			<LedgerModal
				isOpen={isOpenEdit}
				onClose={onCloseEdit}
				onOpen={onOpenEdit}
				//onSelect={onSelect}
				accountList={accountList}
				onChange={onChange}
				onOptionSelect={onOptionSelect}
				onSubmit={onSubmitEdit}
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
		</Grid>
	  </Box>
	);
}


