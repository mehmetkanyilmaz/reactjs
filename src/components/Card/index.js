import { Box, Image, Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"

import {useBasket} from "../../contexts/BasketContext"

function Card({ item }) {

    const { addToBasket, items } = useBasket();

    const findBasketItem = items.find((basketItem) => basketItem.id == item.id)

  return (
    <Box fontFamily="Roboto, sans-serif" fontSize={14} borderWidth="1px" borderStyle="solid" borderColor="#80808061" borderRadius="lg" overflow="hidden" p="2">
        <Link to={`/product/${item.id}`}>
            <Image src={item.thumbnail} alt="product" loading="lazy"></Image>

            <Box p="2">

                <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" maxLength={5}>
                    {item.title}
                </Box>

                <Box>{item.price} TL</Box>
            </Box>
        </Link>

        <Button fontSize={13} colorScheme={findBasketItem ? "pink":"green"} variant="outline" onClick={() => addToBasket(item, findBasketItem)} 
            _hover={findBasketItem ? { bg: "pink.500", color: "white" } : {bg: "green.500", color: "white"}} width="100%">
            {
                findBasketItem ? "Remove from basket" : "Add to basket"
            }
        </Button>
    </Box>
  )
}

export default Card