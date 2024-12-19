import React from 'react'

import { Alert, Button, Image, Box, Text, FormLabel, Input, Textarea, Link } from '@chakra-ui/react'
import { useBasket } from "../../contexts/BasketContext"
import { postOrder } from '../../api'
import { useFormik } from 'formik'
import { message } from "antd"

function Basket() {

    const { items, removeFromBasket, emptyBasket } = useBasket()

    const removeBasketBox = (itemId) => {

        const newProducts = formik.values.orderDetails.filter(product => product.productId !== itemId);
        formik.values.orderDetails = newProducts;

    }

    const formik = useFormik({
        initialValues: {
            address: '',
            orderDetails: items.reduce((acc, item) => {
                acc.push({ productId: item.id, quantity: item.quantity, title: item.title, id: item.id, price: item.price, thumbnail: item.thumbnail });
                return acc;
            }, []),
        },
        onSubmit: async (values) => {
            try {

                await postOrder(values)
                emptyBasket()

            } catch (e) {
                // TODO: business exception' case'ini kontrol et.
                if(e.response == null || e.response.data == null || e.response.data.Detail == null) {
                    message.error({ content:"An unexpected error occurred", key:"send_order", duration:2 })
                }
                else {
                    message.error({ content: e.response?.data.Detail, key:"send_order", duration:2 })
                }
            }
        },
    });

    return (
        <Box p={5}>
            {items.length < 1 && (
                <Alert status="warning">You have not any items in your basket.</Alert>
            )}

            {
                items.length > 0 && (
                    <div>
                        <form onSubmit={formik.handleSubmit}>
                            {
                                formik.values.orderDetails.map((item, index) => (
                                    <Box key={item.id} style={{ marginBottom: 15 }}>
                                        <Link to={`/product/${item.id}`}>
                                            <Text fontSize={18}>{item.title} - {item.price}</Text>
                                            <Image htmlWidth={200} src={item.thumbnail} alt="basket item" loading="lazy" />
                                        </Link>

                                        <Input id={`orderDetails[${index}].productId`} name={`orderDetails[${index}].productId`} type="hidden" value={item.id} />
                                        <Input id={`orderDetails[${index}].quantity`} name={`orderDetails[${index}].quantity`} onChange={formik.handleChange} type="text" value={item.quantity} size="md" width={150} placeholder='quantity' />
                                        <br />
                                        <Button mt="2" size="sm" colorScheme="pink" onClick={() => { removeFromBasket(item.id); removeBasketBox(item.id) }}>
                                            Remove from basket
                                        </Button>
                                    </Box>
                                ))
                            }
                            <div>
                                <FormLabel htmlFor="address">Address</FormLabel>
                                <Textarea id="address" name="address" type="text" onChange={formik.handleChange} value={formik.values.address} size="md" width={300} placeholder='Address'/>
                            </div>
                            <Button mt="2" size="sm" colorScheme="green" type="submit">Send Order</Button>
                        </form>
                    </div>
                )
            }
        </Box>
    )
}

export default Basket