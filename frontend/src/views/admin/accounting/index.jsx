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
    columnsDataLedger,
  } from "./variables/columnsData";
import React, { useEffect, useState } from "react";
import LedgerTable from "./components/LedgerTableeee"
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";

export default function Ledger() {
  // Chakra Color Mode
  const [ledgerList, setLedgerList] = useState([])

  const setList = (data) => {
    setLedgerList(data);
  };

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
        console.log("check our ledgers: ", response.data);
        setLedgerList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getLedgers();
  }, [setLedgerList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        // columns={{ sm: 1, md: 2 }}
        // spacing={{ base: "20px", xl: "20px" }}
        >
        <LedgerTable
          columnsData={columnsDataLedger}
          tableData={ledgerList}
          setLedgerList={setList}
        />
      </SimpleGrid>
    </Box>
  );
}
