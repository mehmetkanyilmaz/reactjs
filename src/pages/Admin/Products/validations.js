import * as yup from "yup"

const newProductScheme = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required().min(5),
    price: yup.string().required()
})

export default newProductScheme