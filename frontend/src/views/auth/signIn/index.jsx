import React, { useState } from "react";
import { NavLink } from "react-router-dom";
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import { HSeparator } from "../../../components/separator/Separator";
import DefaultAuth from "../../../layouts/auth/Default";
// Assets
import illustration from "../../../assets/img/auth/auth.png";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import Cookies from "js-cookie";
import moment from "moment";
import axios from "axios";

function SignIn(props) {
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const googleBg = useColorModeValue("secondaryGray.300", "whiteAlpha.200");
  const googleText = useColorModeValue("navy.700", "white");
  const googleHover = useColorModeValue(
    { bg: "gray.200" },
    { bg: "whiteAlpha.300" }
  );
  const googleActive = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.200" }
  );
  const [show, setShow] = React.useState(false);

  const handleClick = () => setShow(!show);

  const [userCredentials, setUserCredentials] = useState({});
  const [formErrors, setFormErrors] = useState(null);
  const [emailInput, setEmailInput] = useState('')
  const [passInput, setPassInput] = useState('')  

  const onSubmit = () => {
     const csrfToken = Cookies.get("csrftoken") || CSRF_TOKEN;
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    };
    axios
      .post("/dj-rest-auth/login/", userCredentials, config)
      .then((response) => {
        console.log("check our details:", response.data);
        const { key, user } = response.data;
        const inHalfADay = 0.5;

        if (key) {
          Cookies.set("token", key, { expires: inHalfADay });
          //saving loggedInUserDetails in local storage
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        setFormErrors(error);
      });
  };

  const validateEmail = (value) =>{
    let regex = /([A-Za-z0-9]+(\.[A-Za-z0-9]+)+)@rightclicksolutions\.com\.ng/i;

    if (regex.test(value)){
      return true
    }
    else{
      return false
    }
  }

  const isInvalidEmail = validateEmail(emailInput)
  const emailIsRequired = emailInput === ""
  const passIsRequired = passInput === ""

  const onChange = (event) => {
    if(event.target.name == "email"){
      setEmailInput(event.target.value)
    }
    else{
      setPassInput(event.target.value)
    }
    console.log(event.target.name)
    const { name, value } = event.target;
    const credentials = { ...userCredentials };
    credentials[name] = value;
    setUserCredentials(credentials);
    setFormErrors(null);
  };

  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w="100%"
        mx={{ base: "auto", lg: "0px" }}
        me="auto"
        h="100%"
        alignItems="start"
        justifyContent="center"
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection="column"
      >
        <Box me="auto">
          <Heading color={textColor} fontSize="36px" mb="10px">
            Sign In
          </Heading>
          <Text
            mb="36px"
            ms="4px"
            color={textColorSecondary}
            fontWeight="400"
            fontSize="md"
          >
            Enter your email and password to sign in!
          </Text>
        </Box>
        <Flex
          zIndex="2"
          direction="column"
          w={{ base: "100%", md: "420px" }}
          maxW="100%"
          background="transparent"
          borderRadius="15px"
          mx={{ base: "auto", lg: "unset" }}
          me="auto"
          mb={{ base: "20px", md: "auto" }}
        >
          <Button
            fontSize="sm"
            me="0px"
            mb="26px"
            py="15px"
            h="50px"
            borderRadius="16px"
            bg={googleBg}
            color={googleText}
            fontWeight="500"
            _hover={googleHover}
            _active={googleActive}
            _focus={googleActive}
          >
            <Icon as={FcGoogle} w="20px" h="20px" me="10px" />
            Sign in with Google
          </Button>
          <Flex align="center" mb="25px">
            <HSeparator />
            <Text color="gray.400" mx="14px">
              or
            </Text>
            <HSeparator />
          </Flex>
          <FormControl>
            <FormLabel
              display="flex"
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              mb="8px"
            >
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant="auth"
              fontSize="sm"
              ms={{ base: "0px", md: "0px" }}
              type="email"
              placeholder="mail@rightclicksolutions.com.ng"
              mb="10px"
              fontWeight="500"
              size="lg"
              name="email"
              onChange={onChange}
              error={formErrors}
              value={emailInput}
            />
            {!isInvalidEmail? (
              <Text  
              mb="10px"
              fontSize="sm"
              color={"red.400"}>Enter Valid Email</Text>
            ) : null}         
            {emailIsRequired? (
              <Text  
              mb="10px"
              fontSize="sm"
              color={"red.400"}>Is Required</Text>
            ) : null}     
            <FormLabel
              ms="4px"
              fontSize="sm"
              fontWeight="500"
              color={textColor}
              display="flex"
            >
              Password<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size="md">
              <Input
                isRequired={true}
                fontSize="sm"
                placeholder="Min. 8 characters"
                mb="10px"
                size="lg"
                type={show ? "text" : "password"}
                variant="auth"
                name="password"
                value={passInput}
                onChange={onChange}
                error={formErrors}
              />
              <InputRightElement display="flex" alignItems="center" mt="4px">
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            {passIsRequired? (
              <Text  
              mb="10px"
              fontSize="sm"
              color={"red.400"}>Is Required</Text>
            ) : null}    
            {formErrors? (
              <Text  
              mb="10px"
              fontSize="sm"
              color={"red.400"}>Invalid Username or Password</Text>
            ) : null}    
            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  id="remember-login"
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
              <NavLink to="/auth/forgot-password">
                <Text
                  color={textColorBrand}
                  fontSize="sm"
                  w="124px"
                  fontWeight="500"
                >
                  Forgot password?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize="sm"
              variant="brand"
              fontWeight="500"
              w="100%"
              h="50"
              mb="24px"
              onClick={onSubmit}
            >
              Sign In
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            maxW="100%"
            mt="0px"
          >
            {/* <Text color={textColorDetails} fontWeight="400" fontSize="14px">
              Not registered yet?
              <NavLink to="/auth/sign-up">
                <Text
                  color={textColorBrand}
                  as="span"
                  ms="5px"
                  fontWeight="500"
                >
                  Create an Account
                </Text>
              </NavLink>
            </Text> */}
          </Flex>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
