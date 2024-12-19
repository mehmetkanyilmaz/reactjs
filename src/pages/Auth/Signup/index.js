import React from 'react'

import { Flex, Box, Heading, FormControl, FormLabel, Input, Button, Alert } from "@chakra-ui/react"
import {useFormik} from "formik"
import validationSchema from './validation';

import { fetchRegister } from "../../../api"

import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom'

function Signup() {

  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: ""
    },
    validationSchema,
    onSubmit: async(values, bag) => {
      try{
        const registerResponse = await fetchRegister({ Email: values.email, Password: values.password, FistName: values.firstName, LastName: values.lastName })
        login(registerResponse)
        navigate('/')
      }
      catch(e) {
        bag.setErrors({ general: e.response.data.message });
      }
    }
  });

  return (
    <div>
      
      <Flex align="center" width="full" justifyContent="center">
        <Box pt={10}>
          <Box textAlign="center">
            <Heading>Sign Up</Heading>
          </Box>

          <Box my={5}>{ formik.errors.general && (<Alert status="error">{ formik.errors.general }</Alert>) }</Box>

          <Box my={5} textAlign="left">
            <form onSubmit={formik.handleSubmit}>

             <FormControl>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} isInvalid={formik.touched.firstName && formik.errors.firstName}/>
             </FormControl>

              <FormControl>
                <FormLabel>Last Name</FormLabel>
                <Input name="lastName" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} isInvalid={formik.touched.lastName && formik.errors.lastName}/>
              </FormControl>

              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input name="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} isInvalid={formik.touched.email && formik.errors.email}/>
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input name="password" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} isInvalid={formik.touched.password && formik.errors.password}/>
              </FormControl>

              <FormControl mt="4">
                <FormLabel>Password Confirm</FormLabel>
                <Input name="passwordConfirm" type="password" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} isInvalid={formik.touched.passwordConfirm && formik.errors.passwordConfirm}/>
              </FormControl>

              <Button mt="4" width="full" type="submit">Sign Up</Button>
            </form>
          </Box>
        </Box>
      </Flex>

    </div>
  )
}

export default Signup