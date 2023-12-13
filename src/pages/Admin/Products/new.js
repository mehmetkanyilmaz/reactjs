import React from 'react'


import { postProduct } from '../../../api'
import { useMutation, useQueryClient } from 'react-query'

import { Formik, FieldArray } from 'formik'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react"
import validationSchema from "./validations"

import { message } from "antd"

function NewProduct() {

    const queryClient = useQueryClient();

    const newPRoductMutation = useMutation(postProduct, {
        onSuccess: () => queryClient.invalidateQueries("admin:products")});

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: "product_save" })

        const newValues = {
            ...values,
            images: JSON.stringify(values.images)
        }

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
            images: []
        }}
        // validationSchema={validationSchema}
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
                                <FormLabel>Images</FormLabel>
                                <FieldArray
                                    name="images"
                                    render={(arrayHelpers) => (
                                        <div>
                                            {
                                                values.images && values.images.map((image, index) => (
                                                    <div key={index}>
                                                        <Input 
                                                            name={`images.${index}`}
                                                            value={image}
                                                            disabled={isSubmitting}
                                                            onChange={handleChange}
                                                            width="3xl"
                                                        />
                                                        <Button ml="4" type="button" colorScheme="red" onClick={() => arrayHelpers.remove(index)}>
                                                            Remove
                                                        </Button>
                                                    </div>
                                                ))
                                            }

                                            <Button mt="5" onClick={() => arrayHelpers.push("")}>
                                                Add a Image
                                            </Button>
                                        </div>
                                    )}
                                />
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
  </div>

}

export default NewProduct