export const handleChange = (name,value,setFormValues,setErrors) => {
    setErrors({})
    setFormValues(values => ({ ...values, [name]: value }))
};