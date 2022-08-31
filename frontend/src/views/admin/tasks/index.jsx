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
  columnsDataDevelopment,
  columnsDataCheck,
  columnsDataColumns,
  columnsDataComplex,
} from "../dataTables/variables/columnsData";
import tableDataDevelopment from "../dataTables/variables/tableDataDevelopment.json";
import tableDataCheck from "../dataTables/variables/tableDataCheck.json";
import tableDataColumns from "../dataTables/variables/tableDataColumns.json";
import tableDataComplex from "../dataTables/variables/tableDataComplex.json";
import React, { useEffect, useState } from "react";
import TaskTable from "./components/TaskTable"
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";

export default function Settings() {
  // Chakra Color Mode
  const [taskList, setTaskList] = useState([])

  const setList = (data) => {
    setTaskList(data);
  };

  const getTasks = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}tasks/tasks`, config)
      .then((response) => {
        console.log("check our tasks: ", response.data);
        setTaskList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getTasks();
  }, [setTaskList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        // columns={{ sm: 1, md: 2 }}
        // spacing={{ base: "20px", xl: "20px" }}
        >
        <TaskTable
          columnsData={columnsDataComplex}
          tableData={taskList}
          setTaskList={setList}
        />
      </SimpleGrid>
    </Box>
  );
}
