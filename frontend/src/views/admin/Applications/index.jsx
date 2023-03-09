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
import DevelopmentTable from "../dataTables/components/DevelopmentTable";
import CheckTable from "../dataTables/components/CheckTable";
import ColumnsTable from "../dataTables/components/ColumnsTable";
import ComplexTable from "../dataTables/components/ComplexTable";
import { 
  columnsDataComplex,
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns 
} from "./variables/columnsData";
import tableDataDevelopment from "../dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "../dataTables/variables/tableDataCheck.json";
import tableDataColumns from "../dataTables/variables/tableDataColumns.json";
import tableDataComplex from "../dataTables/variables/tableDataComplex.json";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";
import ApplicationsTable from "./components/ApplicationsTable";

export default function Settings() {
  // Chakra Color Mode
  const [ApplicationsList, setApplicationsList] = useState([]);
  
  const setList = (data) => {
    setApplicationsList(data);
  };

  const getApplications = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}application`, config)
      .then((response) => {
        console.log("check our Applications: ", response.data);
        setApplicationsList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getApplications();
  }, [setApplicationsList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        // columns={{ sm: 1, md: 1 }}
        // spacing={{ base: "20px", xl: "20px" }}>
        >
        <ApplicationsTable
          columnsData={columnsDataComplex}
          tableData={ApplicationsList}
          setApplicationsList={setList}
        />
       
      </SimpleGrid>
    </Box>
  );
}
