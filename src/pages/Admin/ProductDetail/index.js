import React from 'react'

import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../../../api'
import { useQuery } from 'react-query'

import { Formik, FieldArray } from 'formik'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react"
import validationSchema from "./validations"

import { message } from "antd"

function AdminProductDetail() {

    const { productId } = useParams()

    const { isLoading, isError, data, error } = useQuery(
        ["admin:product", productId],
        () => fetchProduct(productId)
        )

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error {error.message}</div>
    }

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: "product_update" })

        try{
            await updateProduct(values, productId)

            message.success({
                content: "The product successfully updated",
                key: "product_update",
                duration: 2
            })
        }
        catch(e) {
            message.error("The product does not updated.")
        }
    }

  return <div>
    <Text fontSize="2xl">Edit</Text>

    <Formik
        initialValues={{
            title: data.title,
            description: data.description,
            price: data.price,
            images: data.images
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
                                Update
                            </Button>
                        </form>
                    </Box>
                </Box>
                
            </>
        }
    </Formik>
  </div>

}

export default AdminProductDetail