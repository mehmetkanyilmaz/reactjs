import axios from "axios";

axios.interceptors.request.use(

    config => {
        const token = localStorage.getItem('access-token'); // Token'ı yerel depolamadan alıyoruz
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Token'ı header'a ekliyoruz
        }
        return config;
    },
    function (error) {
        return Promise.reject(error)
    });

export const fetchProductList = async ({ pageParam = 0 }) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product?PageSize=10&PageIndex=${pageParam}`);

    return data;
}

export const fetchProduct = async (id) => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`);

    return data;
}

export const postProduct = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/product/add`, input);

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
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/user/me`);

    return data;
}

export const fetchLogout = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`, {refresh_token: localStorage.getItem("refresh-token")});

    return data;
}

export const postOrder = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/order/add`, input);

    return data;
}

export const fetchOrders = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_BASE_ENDPOINT}/order/getlist`);
    return data;
}

export const deleteProduct = async (productId) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/product/delete/${productId}`);

    return data;
}

export const updateProduct = async (input) => {
    const { data } = await axios.post(`${process.env.REACT_APP_BASE_ENDPOINT}/product/update`, input);

    return data;
}