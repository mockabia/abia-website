import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Elements, CardElement, useElements, CardNumberElement, CardExpiryElement, CardCvcElement,useStripe} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";
import { CheckBoxStyle2, PaymentInput } from "../../components/FormStyle";
import { Checkbox, FormControlLabel } from "@mui/material";      
import PaymentSelect from "../../components/input-fields/PaymentSelect";

const publishKey = await apiService.apiCall(apiUrls.STRIPE_API.STRIPE_PUBLISHKEY, "GET").then(function (response) {
    if (response.statuscode == 200) {
        return response.result.stripe_purl;
    }
});
const stripePromise = loadStripe(publishKey);
let succesUrl       = window.location.origin+process.env.REACT_APP_URL+'payment-success';
//let options = {};


const PaymentForm = (props) => {

    const stripe                            = useStripe();
    const elements                          = useElements();
    let navigate                            = useNavigate();
    const location                          = useLocation();
    //const paymentuser                       = props.formvalues;
    const payFrom                           = props.payFrom;
    const paymentAPI                        = props.paymentAPI;
    const setPaymentStatus                  = props.setPaymentStatus;
    const [stateOptions, setStateOptions]   = useState({});
    //const [fields, setFields]               = useState({});
    const formvalues                        = props.formvalues;
    const setFormvalues                     = props.setFormvalues;
    const setErrorOpen                      = props.setErrorOpen;
    const setErrorMessage                   = props.setErrorMessage;
    const [error, setError]                 = useState(false);
    const [success, setSuccess]             = useState(false);
    
    const validateForm = (formvalues,setError) => {
        setError({});
        let validate = true;
        if(formvalues.holdername=='' || formvalues.holdername ==undefined || formvalues.holdername ==null){
            validate = false;
            setError((values) => ({...values,["holdername"]: "Card holder name is required"}));
        }
        if(formvalues.email=='' || formvalues.email ==undefined || formvalues.email ==null){
            validate = false;
            setError((values) => ({...values,["email"]: "Email is required"}));
        }
        if((formvalues.vid==0 && stateOptions.length>0) && (formvalues.state=='' || formvalues.state ==undefined || formvalues.state ==null)){
            validate = false;
            setError((values) => ({...values,["state"]: "State is required"}));
        }
        if(formvalues.condition=='' || formvalues.condition ==undefined || formvalues.condition ==null || formvalues.condition ==0){
            validate = false;
            setError((values) => ({...values,["condition"]: "Please agree with terms and conditions"}));
        }
        return validate;
    }

    const handleSubmit = (stripe, elements) => async () => {
        //const cardElement = elements.getElement(CardElement);
        //console.log(validateForm(formvalues,setError))
        if(validateForm(formvalues,setError)){
            const cardElement       = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpiryElement);
            const cardCvcElement    = elements.getElement(CardCvcElement);
            if (cardElement == null) {
                return;
            }

            let token       = '';
            let tokenData   = '';
            stripe.createToken(cardElement, {name: formvalues.holdername})
            .then(function(response) {
                token       = response.token.id;
                tokenData   = response.token;
                //setSuccess('Token created successfully : '+ token)
                paymentMethod(cardElement,token,tokenData);
            });
        }
    };
    const paymentMethod = async (cardElement,token,tokenData) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card:cardElement,
            billing_details: {
                name: formvalues.holdername,
                email: formvalues.email,
            },
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            var totalResponse = {...formvalues,'paymentMethod':paymentMethod,['stripeToken']:token,['tokenData']:tokenData};
            await apiService.apiCall(paymentAPI+'/'+formvalues.vid+'/'+payFrom, "POST",totalResponse).then(function (response) {
                if (response.statuscode == 200) {
                    setPaymentStatus(1)
                }else{
                    setErrorOpen(true)
                    setErrorMessage('Email not found')
                }
            });
        }
    };
    const redirectBack = async (event) => {
        navigate(-1);
    };
    const cardOnChange = async (event) => {
        if (event.error) {
            setError(event.error.message)
        }else{
            setError(false)
        }
    };
    const onChangeEvent = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setError({})
        setFormvalues(values => ({ ...values, [name]: value }))
    };
    const onChangeEventValue = (name,value) => {
        setError({})
        setFormvalues(values => ({ ...values, [name]: value }))
    };
    const checkMultipleEmailAccounts = async (email) => {
        await apiService.apiCall(apiUrls.BUSINESS_API.MULTIPLE_ACCOUNTS_EMAIL+'/'+email, "GET").then(function (response) {
            if (response.statuscode == 200) {
                setStateOptions(response.result)
            }
        });
    };
    useEffect(() => {
        setFormvalues((values) => ({ ...values,['condition']: 1 }));
        //setFormvalues((values) => ({ ...values,...props.request, ['condition']: 1 }));
    }, []);
    return (
        <>
        {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
            <PaymentInput name="email" value={formvalues.email} disabled={payFrom==3 ? 'disabled' : '' }
                onChange={(e) =>{
                    checkMultipleEmailAccounts(e.target.value)
                    onChangeEventValue("email", e.target.value)
                }}
                InputProps={{
                    placeholder: "Email",
                    style: { color: "#000", fontWeight: "600" },
                }}
            />
            {error.email && (
              <span className="error-message">{error.email}</span>
            )}
            {(formvalues.vid==0 && stateOptions.length>0) && (
                <>
                    <PaymentSelect
                        className="custom-select-dropdown"
                        name="state"
                        placeholder="State"
                        type="select"
                        sx={{ width: "100%", fontSize: "14px" }}
                        options={stateOptions}
                        value={
                            stateOptions.length > 0 && stateOptions.filter((option) => {
                                if (option.value == formvalues.state) {
                                    return option;
                                }
                            })
                        }
                        onChange={(selectedOption) => onChangeEventValue("state", selectedOption.value) }
                    />
                    {error.state && (
                    <span className="error-message">{error.state}</span>
                    )}
                </>
            )}
            <PaymentInput name="holdername" value={formvalues.holdername} onChange={onChangeEvent} disabled={payFrom==3 ? 'disabled' : '' }
                InputProps={{
                    placeholder: "Cardholder Name",
                    style: { color: "#000", fontWeight: "600" },
                }}
            />
            {error.holdername && (
                <span className="error-message">{error.holdername}</span>
              )}
            <div class="form-group has-feedback">
                <label for="inputEmail3" class="control-label">Card Number</label>
                <CardNumberElement onChange={cardOnChange}/>
            </div>
            <div class="form-group has-feedback">
                <label for="inputEmail3" class="control-label">Card Expiry</label>
                <CardExpiryElement onChange={cardOnChange}/>
            </div>
            <div class="form-group has-feedback">
                <label for="inputEmail3" class="control-label">Card CCV</label>
                <CardCvcElement onChange={cardOnChange}/>
            </div>
            <div>
              <FormControlLabel
                value="end"
                control={
                  <CheckBoxStyle2
                    name="condition"
                    checked={formvalues.condition==1 ? true : false}
                    onChange={(e) =>
                        onChangeEventValue("condition", e.target.checked==1 ? 1: 0)
                    }
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label={
                  <span
                    style={{
                      fontFamily: "raleway",
                      fontSize: "14px",
                      textTransform: "capitalize",
                    }}
                  >
                    I{" "}
                    <span style={{ textTransform: "lowercase" }}>
                      Agree To The{" "}
                    </span>
                    <span
                      style={{ textTransform: "capitalize", color: "#6cc2bc" }}
                    >
                      <Link>Payment Terms And Conditions </Link>
                    </span>
                    <span style={{ textTransform: "lowercase" }}>Of</span> ABIA
                    Weddings Australia.
                  </span>
                }
                labelPlacement="end"
              />
              {error.condition && (
                <span className="error-message">{error.condition}</span>
              )}
            </div>
            {typeof error != 'object' && error !== null && error != false && error != '' ? (
                <div class="form-group">
                    <div class="error" align="center">{error}</div>
                </div>
            ) :''}
            {success != false && success != '' ? (
                <div class="form-group">
                    <div class="success" align="center">{success}</div>
                </div>
            ) : ''}
            <div className="payments-pay-buttons flex justify-normal gap-[1rem]">
              <button type="button" className="button-1" onClick={handleSubmit(stripe, elements)}>
                Pay
              </button>
              {payFrom!='3' && (
                <button type="button" className="button-2" onClick={redirectBack}>
                Back
              </button>
              )}
              
            </div>
        </>
    );
}

const StripePaymentForm = (props) => {
    const location                  = useLocation();
    const paymentuser               = props.formvalues;

    let options = {
        mode: 'payment',
        amount: (paymentuser.payamount ? parseFloat(paymentuser.payamount) : parseFloat(0)),
        country:'AUS',
        currency: 'usd'
    }

    return (
    <Elements stripe={stripePromise} options={options}>
        <PaymentForm {...props}/>
    </Elements>
    );
}
export default StripePaymentForm;
