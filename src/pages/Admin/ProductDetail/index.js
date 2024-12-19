import React , {useState} from 'react'

import { useParams } from 'react-router-dom'
import { fetchProduct, updateProduct } from '../../../api'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { Formik } from 'formik'
import { Text, Box, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react"
import validationSchema from "./validations"

import { message } from "antd"

import styles from "../Products/styles.module.css";

function AdminProductDetail() {

    const { productId } = useParams()

    const { isLoading, isError, data, error } = useQuery(
        ["admin:product", productId],
        () => fetchProduct(productId)
        )

    const queryClient = useQueryClient();

    const productUpdateMutation = useMutation(updateProduct, {
        onSuccess: () => { 
            queryClient.removeQueries("admin:products"); 
            queryClient.invalidateQueries("admin:product", productId);
            queryClient.removeQueries('items');

            message.success({
                content: "The product successfully updated",
                key: "product_update",
                duration: 2
            })
         },
        onError: (e) => { 
            setErrorList(e.response?.data.Errors)
            message.error({content: "The product does not updated.", key: "product_update"})
        }});

    const [errorList, setErrorList] = useState([]);

    if(isLoading) {
        return <div>Loading...</div>
    }

    if(isError) {
        return <div>Error {error.message}</div>
    }

    const handleSubmit = async (values, bag) => {
        message.loading({ content: "Loading...", key: "product_update" })

        productUpdateMutation.mutate(values)
    }

  return <div>
    <Text fontSize="2xl">Edit</Text>

    <Formik
        initialValues={{
            id: productId,
            title: data.title,
            description: data.description,
            price: data.price,
            stock: data.stock,
            thumbnail: data.thumbnail
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
                                <input name="id" type="hidden" value={productId} />
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
                                Update
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

export default AdminProductDetail