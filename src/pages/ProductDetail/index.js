import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'

import { fetchProduct } from "../../api"
import { Box, Text, Button } from '@chakra-ui/react';
import moment from "moment"
import ImageGallery from "react-image-gallery";
import { useBasket } from '../../contexts/BasketContext';

function ProductDetail() {
    const { productId } = useParams();
    const { addToBasket, items } = useBasket();

    const { isLoading, error, data } = useQuery(['product', productId], () => fetchProduct(productId));

    if (isLoading) return <div>Loading...</div>

     if (error) return <div>An error has occurred: ' + {error.message}</div>

    console.log("data",data)

    const findBasketItem = items.find((item) => item.id == productId)
    const images = data.images.map((url) => ({original: url}))
  return (
    <div>
        <Button colorScheme={findBasketItem ? "pink":"green"} onClick={() => addToBasket(data, findBasketItem)}>
            {
                findBasketItem ? "Remove from basket" : "Add to basket"
            }
        </Button>

        <Text as="h2" fontSize="2xl">
            {data.title}
        </Text>
        <Text as="h2" fontSize="2xl">
        {moment(data.createdAt).format('DD/MM/YYYY')}
        </Text>
        
        <p>{data.description}</p>

        <Box margin="10">
            <ImageGallery items={images} showThumbnails={true} />
        </Box>
        </div>
  )
}

export default ProductDetail