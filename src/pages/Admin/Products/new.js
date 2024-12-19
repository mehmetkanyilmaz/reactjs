import React, { useState } from 'react'


import { postProduct } from '../../../api'
import { useMutation, useQueryClient } from 'react-query'

import { Formik } from 'formik'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react"
import validationSchema from "./validations"

import { message } from "antd"

import styles from "./styles.module.css";

function NewProduct() {

    const [errorList, setErrorList] = useState([]);

    const queryClient = useQueryClient();

    const newPRoductMutation = useMutation(postProduct, {
        onSuccess: () => { queryClient.invalidateQueries("admin:products"); queryClient.removeQueries('items'); },
        onError: (e) => { setErrorList(e.response?.data.Errors) }});

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: "product_save" })

        newPRoductMutation.mutate(values, { 
            onSuccess: () =>{ 
              console.log("success")

              message.success({
                content: "The product successfully saved",
                key:"product_save",
                duration:2
              })
            } 
          }) 
    }

  return <div>
    <Text fontSize="2xl">New Product</Text>

    <Formik
        initialValues={{
            title: "",
            description: "",
            price: "",
            stock: "",
            thumbnail: ""
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {
            ({ handleSubmit, errors, touched, handleChange, handleBlur, values, isSubmitting }) => <>

                <Box>
                    <Box my="5" textAlign="left">
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                                <FormLabel>Title</FormLabel>
                                <Input
                                    name="title"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                    disabled={isSubmitting}
                                    isInvalid={touched.title && errors.title}
                                ></Input>
                                {
                                    touched.title && errors.title && (<Text color="red.500">{errors.title}</Text>)
                                }
                            </FormControl>
                            <FormControl mt="4">
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    name="description"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.description}
                                    disabled={isSubmitting}
                                    isInvalid={touched.description && errors.description}
                                ></Textarea>
                            </FormControl>
                            <FormControl mt="4">
                                <FormLabel>Price</FormLabel>
                                <Input
                                    name="price"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.price}
                                    disabled={isSubmitting}
                                    isInvalid={touched.price && errors.price}
                                ></Input>
                            </FormControl>
                            <FormControl mt="4">
                                <FormLabel>Stock</FormLabel>
                                <Input
                                    name="stock"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.stock}
                                    disabled={isSubmitting}
                                    isInvalid={touched.stock && errors.stock}
                                ></Input>
                            </FormControl>
                            <FormControl mt="4">
                                <FormLabel>Thumbnail</FormLabel>
                                <Input
                                    name="thumbnail"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.thumbnail}
                                    disabled={isSubmitting}
                                    isInvalid={touched.thumbnail && errors.thumbnail}
                                ></Input>
                            </FormControl>

                            <Button mt="4" width="full" type="submit" isLoading={isSubmitting}>
                                Save
                            </Button>
                        </form>
                    </Box>
                </Box>
                
            </>
        }
    </Formik>
    
    <ul className={styles.itemList}>
      {errorList.map((item, index) => (
        <li key={index}>
            <span className={styles.dot}></span> {item.ErrorMessage}
        </li>
      ))}
    </ul>

  </div>

}

export default NewProduct