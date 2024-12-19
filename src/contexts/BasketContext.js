import {useState, createContext, useContext, useEffect} from 'react'

const BasketContext = createContext();

const defaultBasket = JSON.parse(localStorage.getItem("basket")) || [];

const BasketProvider = ({children}) => {
    const [items, setItems] = useState(defaultBasket);

    useEffect(() => {
        localStorage.setItem("basket", JSON.stringify(items))
    }, [items])

    const addToBasket = (data, findBasketItem) => {

        if(!findBasketItem) {
            data.quantity = 1;
            return setItems((items) => [data, ...items]);
        }

        const filtered = items.filter((item) => item.id != findBasketItem.id)        
        setItems(filtered)
    }

    const removeFromBasket = (itemId) => {
        const filtered = items.filter((item) => item.id != itemId)
        setItems(filtered)
    }

    const emptyBasket = () => setItems([]);

    const values = {
        items,
        setItems,
        addToBasket,
        removeFromBasket,
        emptyBasket
    }

    return (
        <BasketContext.Provider value={values}>{children}</BasketContext.Provider>
    )
}

const useBasket = () => useContext(BasketContext);

export {BasketProvider, useBasket}