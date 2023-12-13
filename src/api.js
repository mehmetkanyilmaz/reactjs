import axios from "axios";

axios.interceptors.request.use(
    function (config) {
        const { origin } = new URL(config.url)

        const allowedOrigins = [process.env.REACT_APP_BASE_ENDPOINT]
        const token = localStorage.getItem("access-token")

        if(allowedOrigins.includes(origin)) {
            config.headers.authorization = token
        }

        return config
    },
    function (error) {
        return Promise.reject(error)
    });

export const fetchProductList = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products?limit=10&skip=${pageParam}`);

    return data.products;
}

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/products/${id}`);

    return data;
}

export const postProduct = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/products/`, input);

    return data;
}

export const fetchRegister = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`, input);

    return data;
}

export const fetchLogin = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`, input);

    return data;
}

export const fetchMe = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`);

    return data;
}

export const fetchLogout = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`, {refresh_token: localStorage.getItem("refresh-token")});

    return data;
}

export const postOrder = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order`, input);

    return data;
}

export const fetchOrders = async () => {
    // TODO: api yazılınca düzenlecek.
    // const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order`);
    const data = '[{"id":1, "user": {"email":"1@hotmail.com"}, "address":"Sakarya Adapazarı", "items":[ {"a":1}, {"b":1}, {"c":1}, {"d":1} ] },' + 
                    '{ "id":2, "user": {"email":"2@hotmail.com"}, "address":"Ankara", "items":[ {"a":2}, {"b":2}, {"c":2}, {"d":2} ] },' +
                    '{ "id":3, "user": {"email":"3@hotmail.com"}, "address":"İstanbul", "items":[ {"a":3}, {"b":3}, {"c":3}, {"d":3} ] } ]';
    return JSON.parse(data);
}

export const deleteProduct = async (productId) => {
    const { data } = await axios.delete(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${productId}`);

    return data;
}

export const updateProduct = async (input, productId) => {
    const { data } = await axios.put(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${productId}`, input);

    return data;
}