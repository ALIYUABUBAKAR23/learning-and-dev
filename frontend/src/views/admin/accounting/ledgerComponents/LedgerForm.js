import {
    FormControl,
    Button,
    Stack,
    InputGroup,
    Text,
    Textarea,
    InputLeftAddon,
    Flex,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { Input } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import Select from "react-select";
  // Custom components
  import Card from "../../../../components/card/Card";

  // Assets
  import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
  import axios from "axios";
  import { handleWidgetChange2 } from "../../../../utility";
  axios.defaults.withCredentials = true;
  
  function LedgerForm(props) {

    const textColor = useColorModeValue("secondaryGray.900", "white");

    const {
      accountList,
      onChange,
      onOptionSelect,
      onSubmit,
    } = props;
  
    const [ledgerDetails, setLedgerDetails] = useState({});

    return (
    	<Flex
			flexDirection='column'
			gridArea={{ xl: "1 / 3 / 2 / 4", "2xl": "1 / 2 / 2 / 3" }}>
			<Card px='10px' mb='20px'>
	     
			<Flex px="25px" justify="space-between" mb="20px" align="center">
					<Text
						color={textColor}
						fontSize="20px"
						fontWeight="600"
						lineHeight="90%"
					>
                    Create New Ledger					
                    </Text>
				</Flex>
				<Stack spacing={4}>
				<FormControl>
			        <InputGroup>
						<InputLeftAddon children="Account" borderRadius="16px" />
						<Select
							name="account_id"
                            isMulti
							options={accountList}
							onChange={onOptionSelect}
							className="basic-select"
							classNamePrefix="select"
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
							type="number"
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
									type="number"
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
									type="number"
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
									type="number"
                                    borderRadius="16px"
									onChange={onChange}
							/>
					</InputGroup>
				</FormControl>
				<Button
				variant="ghost"
				onClick={() => {
				onSubmit();
				}}
			>
                Create
			</Button>
				</Stack>
			</Card>
			</Flex>
    );
  }
  
  export default LedgerForm;
  