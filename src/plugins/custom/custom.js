export const handleChange = (name,value,setFormValues,setErrors) => {
    setErrors({})
    setFormValues(values => ({ ...values, [name]: value }))
};
export const errorClose = (setInputsErrors) => {
    setInputsErrors({})
};