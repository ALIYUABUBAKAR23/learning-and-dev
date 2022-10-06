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
import { Box, SimpleGrid } from "@chakra-ui/react";
import {
  columnsDataAccounts,
  columnsDataLedger,
} from "../dataTables/variables/columnsData";
import React, { useEffect, useState } from "react";
import AccountTable from "./accountComponents/account/AccountTable"
import LedgerTable from "./ledgerComponents/LedgerTable"
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";

export default function Settings() {
  // Chakra Color Mode
  const [accountList, setAccountList] = useState([])
  const [ledgerList, setLedgerList] = useState([])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        >
        <AccountTable
          columnsData={columnsDataAccounts}
          tableData={accountList}
          setAccountList={setAccountList}
        />
      </SimpleGrid>
      <SimpleGrid
        mb='20px'
        >
        <LedgerTable
          columnsData={columnsDataLedger}
          tableData={ledgerList}
          setLedgerList={setLedgerList}
        />
      </SimpleGrid>
    </Box>
  );
}
