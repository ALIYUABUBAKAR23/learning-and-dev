import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    InputGroup,
    InputRightElement,
    Textarea,
    // Select,
    InputLeftAddon,
    HStack,
    Tag,
    useDisclosure,
  } from "@chakra-ui/react";
  import { Input } from "@chakra-ui/react";
  import React, { useEffect, useState } from "react";
  import Select from "react-select";
  // Custom components
  
  // Assets
  import { CalendarIcon, CheckIcon } from "@chakra-ui/icons";
  import axios from "axios";
  import { handleWidgetChange2 } from "../../../../utility";
  axios.defaults.withCredentials = true;
  
  function StaffModal(props) {

    const staffStateOptions = [
      {label:"Abia", value:"Abia"},
      {label:"Adamawa", value:"Adamawa"},
      {label:"Akwa Ibom", value:"Akwa Ibom"},
      {label:"Anambra", value:"Anambra"},
      {label:"Bauchi", value:"Bauchi"},
      {label:"Bayelsa", value:"Bayelsa"},
      {label:"Benue", value:"Benue"},
      {label:"Borno", value:"Borno"},
      {label:"Cross River", value:"Cross River"},
      {label:"Delta", value:"Delta"},
      {label:"Ebonyi", value:"Ebonyi"},
      {label:"Edo", value:"Edo"},
      {label:"Ekiti", value:"Ekiti"},
      {label:"Enugu", value:"Enugu"},
      {label:"Gombe", value:"Gombe"},
      {label:"Imo", value:"Imo"},
      {label:"Jigawa", value:"Jigawa"},
      {label:"Kaduna", value:"Kaduna"},
      {label:"Kano", value:"Kano"},
      {label:"Katsina", value:"Katsina"},
      {label:"Kebbi", value:"Kebbi"},
      {label:"Kogi", value:"Kogi"},
      {label:"Kwara", value:"Kwara"},
      {label:"Lagos", value:"Lagos"},
      {label:"Nasarawa", value:"Nasarawa"},
      {label:"Niger", value:"Niger"},
      {label:"Ogun", value:"Ogun"},
      {label:"Ondo", value:"Ondo"},
      {label:"Osun", value:"Osun"},
      {label:"Oyo", value:"Oyo"},
      {label:"Plateau", value:"Plateau"},
      {label:"Rivers", value:"Rivers"},
      {label:"Sokoto", value:"Sokoto"},
      {label:"Taraba", value:"Taraba"},
      {label:"Yobe", value:"Yobe"},
      {label:"Zamfara", value:"Zamfara"},
    ]
  
  
  const staffSexOptions = [
    {label:"Male", value:"Male"},
    {label:"Female", value:"Female"},
  ]

  const maritalStatusOptions = [
    {label:"true", value:"true"},
    {label:"false", value:"false"},
  ]
  
    const STATE = {
      Abia: {label:"Abia", value:"Abia"},
      Adamawa: {label:"Adamawa", value:"Adamawa"},
      Akwa_Ibom: {label:"Akwa Ibom", value:"Akwa Ibom"},
      Anambra: {label:"Anambra", value:"Anambra"},
      Bauchi: {label:"Bauchi", value:"Bauchi"},
      Bayelsa: {label:"Bayelsa", value:"Bayelsa"},
      Benue: {label:"Benue", value:"Benue"},
      Borno: {label:"Borno", value:"Borno"},
      Cross_River:{label:"Cross River", value:"Cross River"},
      Delta: {label:"Delta", value:"Delta"},
      Ebonyi: {label:"Ebonyi", value:"Ebonyi"},
      Edo: {label:"Edo", value:"Edo"},
      Ekiti: {label:"Ekiti", value:"Ekiti"},
      Enugu: {label:"Enugu", value:"Enugu"},
      Gombe: {label:"Gombe", value:"Gombe"},
      Imo: {label:"Imo", value:"Imo"},
      Jigawa: {label:"Jigawa", value:"Jigawa"},
      Kaduna: {label:"Kaduna", value:"Kaduna"},
      Kano: {label:"Kano", value:"Kano"},
      Katsina: {label:"Katsina", value:"Katsina"},
      kebbi: {label:"Kebbi", value:"Kebbi"},
      Kogi: {label:"Kogi", value:"Kogi"},
      Kwara: {label:"Kwara", value:"Kwara"},
      Lagos: {label:"Lagos", value:"Lagos"},
      Nasarawa: {label:"Nasarawa", value:"Nasarawa"},
      Niger: {label:"Niger", value:"Niger"},
      Ogun: {label:"Ogun", value:"Ogun"},
      Ondo: {label:"Ondo", value:"Ondo"},
      Osun: {label:"Osun", value:"Osun"},
      Oyo: {label:"Oyo", value:"Oyo"},
      Plateau: {label:"Plateau", value:"Plateau"},
      Rivers: {label:"Rivers", value:"Rivers"},
      Sokoto: {label:"Sokoto", value:"Sokoto"},
      Taraba: {label:"Taraba", value:"Taraba"},
      Yobe: {label:"Yobe", value:"Yobe"},
      Zamfara: {label:"Zamfara", value:"Zamfara"},
    };
  
    const SEX = {
      Male: {label:"Male", value:"Male"},
      Female: {label:"Female", value:"Female"},
    };

    const MARITAL = {
      True: {label:"true", value:"true"},
      False: {label:"false", value:"false"},
    };
  
    const {
      onSelect,
      userList,
      editStaff,
      dept,
      onChange,
      onOptionSelect,
      departmentList,
      onSubmit,
      setStaffToEdit,
      onOpen,
      isOpen,
      onClose,
    } = props;
  
    const [staffDetails, setStaffDetails] = useState({});
    const [updatedStaffDetails, setUpdatedStaffDetails] = useState({});
  
    useEffect(() => {
      setStaffDetails(editStaff || "");
    }, [editStaff]);
  
    useEffect(() => {
      setUpdatedStaffDetails(staffDetails || editStaff);
    }, [staffDetails]);
  
    const handleChange = handleWidgetChange2(
      setStaffDetails,
      setUpdatedStaffDetails,
      staffDetails,
      updatedStaffDetails
    );
  
    return (
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        size="xl"
        onClose={() => {
          setStaffToEdit(null);
          onClose();
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editStaff ? "Edit Staff" : "Create New Staff"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <InputGroup>
                <InputLeftAddon children="Email" borderRadius="16px" />
                <Input
                  name="email"
                  placeholder="Email"
                  value={staffDetails?.email || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Password" borderRadius="16px" />
                <Input
                  name="password1"
                  placeholder="Password"
                  value={staffDetails?.password1 || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Retype Password" borderRadius="16px" />
                <Input
                  name="password2"
                  placeholder="Retype Password"
                  value={staffDetails?.password2 || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="First Name" borderRadius="16px" />
                <Input
                  name="first_name"
                  placeholder="First Name"
                  value={staffDetails?.first_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Middle Name" borderRadius="16px" />
                <Input
                  name="middle_name"
                  placeholder="Middle Name"
                  value={staffDetails?.middle_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Last Name" borderRadius="16px" />
                <Input
                  name="last_name"
                  placeholder="Last Name"
                  value={staffDetails?.last_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Sex" borderRadius="16px" />
                <Select
                  name="sex"
                  value={SEX[staffDetails.sex]}
                  options={staffSexOptions}
                  onChange={(option) => handleChange(option, "sex")}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Department" borderRadius="16px" />
                <HStack spacing={4}>
                {/* {headOfDepartment?.map((user, index) => (
                      <Tag size={'lg'} key={index} variant='solid' colorScheme='teal'>
                        {user.name}
                      </Tag>
                    ))}
                  </HStack> */}

                  {editStaff?.dept
                    ? editStaff?.dept.map((department, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {department.name}
                        </Tag>
                      ))
                    : dept?.map((department, index) => (
                        <Tag
                          size={"lg"}
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {department.name}
                        </Tag>
                      ))}
                </HStack>
								<Select
                    name="department_id"
                    options={departmentList}
                    onChange={onOptionSelect}
                    className="basic-multi-select"
                    classNamePrefix="select"
                  />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Date of Birth" borderRadius="16px" />
                <Input
                  name="date_of_birth"
                  placeholder="Date of Birth"
                  type="date"
                  value={staffDetails?.date_of_birth || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="State of Origin" borderRadius="16px" />
                <Select
                  name="state_of_origin"
                  value={STATE[staffDetails.state_of_origin]}
                  options={staffStateOptions}
                  onChange={(option) => handleChange(option, "state_of_origin")}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Phone Number" borderRadius="16px" />
                <Input
                  name="phone_number"
                  placeholder="Phone Number"
                  value={staffDetails?.phone_number || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Address" borderRadius="16px" />
                <Input
                  name="address"
                  placeholder="Address"
                  value={staffDetails?.address || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Twitter" borderRadius="16px" />
                <Input
                  name="twitter"
                  placeholder="Twitter"
                  value={staffDetails?.twitter || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Instagram" borderRadius="16px" />
                <Input
                  name="tnstagram"
                  placeholder="Instagram"
                  value={staffDetails?.tnstagram || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="LinkedIn" borderRadius="16px" />
                <Input
                  name="linkedIn"
                  placeholder="LinkedIn"
                  value={staffDetails?.linkedIn || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Staff ID" borderRadius="16px" />
                <Input
                  name="staff_id"
                  placeholder="Staff ID"
                  value={staffDetails?.staff_id || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Commencement Date" borderRadius="16px" />
                <Input
                  name="commencement_date"
                  placeholder="Commencement Date"
                  value={staffDetails?.commencement_date || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
                <InputRightElement
                  borderRadius="16px"
                  children={<CalendarIcon color="green.500" />}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Salary" borderRadius="16px" />
                <Input
                  name="salary"
                  placeholder="Salary"
                  value={staffDetails?.salary || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Role" borderRadius="16px" />
                <Input
                  name="role"
                  placeholder="Role"
                  value={staffDetails?.role || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Bank" borderRadius="16px" />
                <Input
                  name="bank_name"
                  placeholder="Bank"
                  value={staffDetails?.bank_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Account Number" borderRadius="16px" />
                <Input
                  name="bank_account"
                  placeholder="Account Number"
                  value={staffDetails?.email || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Spouse Name" borderRadius="16px" />
                <Input
                  name="spouse_name"
                  placeholder="Spouse Name"
                  value={staffDetails?.spouse_name || ""}
                  borderRadius="16px"
                  onChange={handleChange}
                />
              </InputGroup>
              <InputGroup>
                <InputLeftAddon children="Marital Status" borderRadius="16px" />
                <Select
                  name="is_married"
                  value={MARITAL[staffDetails.is_married]}
                  options={maritalStatusOptions}
                  onChange={(option) => handleChange(option, "is_married")}
                />
              </InputGroup>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="brand"
              mr={3}
              onClick={() => {
                setStaffToEdit(null);
                onClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                onSubmit(editStaff ? "put" : "post", updatedStaffDetails);
              }}
            >
              {editStaff ? "Edit" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }
  
  export default StaffModal;
  