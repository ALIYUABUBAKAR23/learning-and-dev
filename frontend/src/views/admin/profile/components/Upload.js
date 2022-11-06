// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
  FormControl,
  FormLabel,
  Input,
  
} from "@chakra-ui/react";
// Custom components
import Card from "../../../../components/card/Card.js";
import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Assets
import { MdUpload } from "react-icons/md";
import Dropzone from "./Dropzone";



export default function Upload(props) {
  const { used, total, ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const brandColor = useColorModeValue("brand.500", "white");
  const textColorSecondary = "gray.400";

  const [userDetails, setUserDetails] = useState({});
  const [formErrors, setFormErrors] = useState(null);

  const updateUser = () => {
    const csrfToken = Cookies.get("csrftoken") || CSRF_TOKEN;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
        
      },
    };
    axios
      .put("/rest-auth/user/", userDetails, config)
      .then((response) => {
        console.log("check user details:", response.data);
        toast.success(`${response.data.message}`);
        
      })
      .catch((error) => {
        console.log(error);
        setFormErrors(error);
        // toast.error("Not updated!");
      });
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    const credentials = { ...userDetails };
    credentials[name] = value;
    setUserDetails(credentials);
    setFormErrors(null);
  };
  return (
    <Card {...rest} mb='20px' align='center' p='20px' alignItems='center'>
      <Flex h='100%' direction={{ base: "column", "2xl": "row" }}>
        <Flex direction='column' pe='44px' alignItems='center'>
          <Text
            color={textColorPrimary}
            fontWeight='bold'
            textAlign='center'
            fontSize='2xl'
            marginBottom='8'
            mt={{ base: "20px", "2xl": "50px" }}>
            User profile details
          </Text>
          <FormControl>
          <FormLabel>
              First Name
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="first_name"
              onChange={onChange}
              error={formErrors}
            />
            <FormLabel>
              Last Name
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="last_name"
              onChange={onChange}
              error={formErrors}
            />
            <FormLabel>
              Middle Name
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="middle_name"
              onChange={onChange}
              error={formErrors}
            />
            <FormLabel>
              Address
            </FormLabel>
            
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="text"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="address"
              onChange={onChange}
              error={formErrors}
            />
             <FormLabel>
              Email
            </FormLabel>
            
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="email"
              onChange={onChange}
              error={formErrors}
            />
             <FormLabel>
              Date of Birth
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="date"
              mb="24px"
              fontWeight="500"
              size="lg"
              name="date_of_birth"
              onChange={onChange}
              error={formErrors}
            />
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={updateUser}
              >
                Edit your details
            </Button>
          </FormControl>
        </Flex>
      </Flex>
    </Card>
  );
}
