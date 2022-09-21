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
import Select from 'react-select';
// Custom components
import Card from "../../../../components/card/Card";
import Menu from "../../../../components/menu/MainMenu";

// Assets
import { MdCheckCircle, MdCancel, MdOutlineError } from "react-icons/md";
import APIClient from "../../../../lib/APIClient";
import { CalendarIcon, CheckIcon, PhoneIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { PersonIcon } from "../../../../components/icons/Icons";
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
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [ledgerData, setLedgerData] = useState({});
	const [acct, setAcct] = useState([])
	const [formErrors, setFormErrors] = useState(null);
	const [accountList, setAccountList] = useState([])


	const getLedger = () =>{
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

	const createLedger = (ledgerData) =>{

		const config = {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				"X-CSRFToken": Cookies.get("csrftoken"),
				// 'authorization':`Token ${Cookies.get('token')}`,
			},
		};

		axios
			.post(`${baseUrl}accounts/ledgers/`, ledgerData, config)
			.then((response) => {
				onClose();
				getLedger();
				setLedgerData();
				console.log("check our response:", response.data);
				toast.success("user created successfully");
			})
			.catch((error) => {
				console.log(error);
				toast.error('Not created!');
			});
	}

	const deleteLedger = (id) => {
		
	}

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

	// const onSelect = (event) => {
	// 	console.log('see the event: ', event);
	// 	var newState;
	// 	if (event.length > 0) {
	// 		event?.map((input)=> {
	// 			newState = [...dept, {id: input.value ? input.value : null, name: input.label ? input.label : null}];
	// 		});
	// 	}else{
	// 		newState = [];
	// 	}
	// 	setDept(newState);
	// };

	const onSubmit = () => {
		
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
										} else if (cell.column.Header === "ACTION") {
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
				<InputGroup>
					<InputLeftAddon children="Account" borderRadius="16px" />
					<HStack spacing={4}>
						{acct?.map((account, index) => (
							<Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
								{account.name}
							</Tag>
						))}
					</HStack>
					<Select
						name="account_id"
						options={accountList}
						onChange={onOptionSelect}
						className="basic-select"
						classNamePrefix="select"
					/>
				</InputGroup>
			<FormControl>
				<InputGroup>
					<InputLeftAddon children="Transaction Date" borderRadius="16px" />
					<Input
								type='date'
								name="transaction_date"
								placeholder="Transaction Date"
								borderRadius="16px"
								onChange={onChange}
						/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<InputGroup>
					<InputLeftAddon children="Account Code" borderRadius="16px" />
					<Input
								name="account_code"
								placeholder="Account Code"
								borderRadius="16px"
								onChange={onChange}
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
                onChange={onChange}
              />
				</InputGroup>
			</FormControl>
			<FormControl>
				<InputGroup>
					<InputLeftAddon children="DR" borderRadius="16px" />
					<Input
								name="dr"
								placeholder="DR"
								borderRadius="16px"
								onChange={onChange}
						/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<InputGroup>
					<InputLeftAddon children="CR" borderRadius="16px" />
					<Input
								name="cr"
								placeholder="CR"
								borderRadius="16px"
								onChange={onChange}
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
								onChange={onChange}
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
								onChange={onChange}
						/>
				</InputGroup>
			</FormControl>
			<FormControl>
				<InputGroup>
					<InputLeftAddon children="Reference No" borderRadius="16px" />
					<Input
								name="reference_number"
								placeholder="Reference Number"
								borderRadius="16px"
								onChange={onChange}
						/>
				</InputGroup>
			</FormControl>
			<Button variant="ghost" onClick={onSubmit}>Create</Button>
		</Card>
	);
}


