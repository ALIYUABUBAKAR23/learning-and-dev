/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// Chakra imports
import { Button, ButtonGroup } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, SimpleGrid } from "@chakra-ui/react";
import CRMTable from "../crm/components/CRMTable";
import {
  columnsDataCustomer,
} from "./variables/columnsData";
import tableDataCustomer from "../hr/variables/tableDataCustomer.json";
import React, { useEffect, useState} from "react";
import CRMModal from './components/CRMModal';
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";


export default function HR() {
// Chakra Color Mode
  // const [openModal, setOpenModal] = useState(false);
  const [customerList, setCustomerList] = useState([])
  
  const setList = (data) => {
    setCustomerList(data);
  };

  const getCustomers = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
    .get(`${baseUrl}customers/customers`, config)
    .then((response) => {
      console.log("check our customers: ", response.data);
      setCustomerList(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  useEffect(() => {
    getCustomers();
  }, [setCustomerList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
          mb='20px'
          // columns={{ sm: 1, md: 2 }}
          // spacing={{ base: "20px", xl: "20px", top: "20px" }}
        >
        <CRMTable
          columnsData={columnsDataCustomer}
          tableData={customerList}
          setCustomerList={setList}
        />
      </SimpleGrid>
    </Box>

  );
}
