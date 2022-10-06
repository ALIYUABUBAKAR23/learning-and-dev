// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import { contractDataContracts } from "./variables/columnsData";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";
import ContractTable from "./components/ContractTable";


export default function Settings() {
  // Chakra Color Mode
  const [contractList, setContractList] = useState([]);
  
  const setList = (data) => {
    setContractList(data);
  };

  const getContracts = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}hr/contracts`, config)
      .then((response) => {
        console.log("check our contracts: ", response.data);
        setContractList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getContracts();
  }, [setContractList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        // columns={{ sm: 1, md: 1 }}
        // spacing={{ base: "20px", xl: "20px" }}>
        >
        <ContractTable
          columnsData={contractDataContracts}
          contractData={contractList}
          setContractList={setList}
        />
       
      </SimpleGrid>
    </Box>
  );
}




