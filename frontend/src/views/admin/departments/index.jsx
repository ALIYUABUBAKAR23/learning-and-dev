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
import DepartmentTable from "../departments/components/DepartmentTable";
import {
  columnsDataDepartment,
} from "./variables/columnsData";
import React, { useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";


export default function departments() {
// Chakra Color Mode
  // const [openModal, setOpenModal] = useState(false);
  const [departmentList, setDepartmentList] = useState([])
  
  const setList = (data) => {
    setDepartmentList(data);
  };

  const getDepartment = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}hr/departments`, config)
      .then((response) => {
        console.log("check our departments: ", response.data);
        setDepartmentList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getDepartment();
  }, [setDepartmentList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
          mb='20px'
          // columns={{ sm: 1, md: 2 }}
          // spacing={{ base: "20px", xl: "20px", top: "20px" }}
        >
        <DepartmentTable
          columnsData={columnsDataDepartment}
          tableData={departmentList}
          setDepartmentList={setList}
        />
        {/* <Button 
        classname="createModalBtn" 
        onClick={() => {setOpenModal(true);}} 
        rightIcon={<AddIcon />} 
        colorScheme='blue' 
        variant='solid'
        >
          Create Staff
        </Button>
        {openModal && <NewModal closeModal={setOpenModal} />} */}
      </SimpleGrid>
    </Box>

  );
}
