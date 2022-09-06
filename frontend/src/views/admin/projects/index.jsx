// Chakra imports
import { Box, SimpleGrid } from "@chakra-ui/react";
import {  columnsDataProjects } from "./variables/columnsData"

import React, { useEffect, useState } from "react";
import ProjectTable from "./components/ProjectTable"
import axios from "axios";
import Cookies from "js-cookie";
import { baseUrl } from "../../../utility";

export default function Settings() {
  // Chakra Color Mode
  const [projectList, setProjectList] = useState([])

  const setList = (data) => {
    setProjectList(data);
  };

  const getProjects = () =>{
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": Cookies.get("csrftoken"),
        'authorization':`Token ${Cookies.get('token')}`,
      },
    };

    axios
      .get(`${baseUrl}business_analysis/projects`, config)
      .then((response) => {
        console.log("check our projects: ", response.data);
        setProjectList(response.data)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getProjects();
  }, [setProjectList]);

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid
        mb='20px'
        >
        <ProjectTable
          columnsData={columnsDataProjects}
          tableData={projectList}
          setProjectList={setList}
        />
      </SimpleGrid>
    </Box>
  );
}
