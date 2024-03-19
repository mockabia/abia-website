import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
    Elements,
    CardElement,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement,
    useStripe
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import * as apiService from "../../api/apiServices";
import * as apiUrls from "../../api/apiUrls";
import { CheckBoxStyle2, PaymentInput } from "../../components/FormStyle";
import { Checkbox, FormControlLabel } from "@mui/material";

const publishKey = await apiService.apiCall(apiUrls.STRIPE_API.STRIPE_PUBLISHKEY, "GET").then(function (response) {
    if (response.statuscode == 200) {
        return response.result.stripe_purl;
    }
});
const stripePromise = loadStripe(publishKey);
let succesUrl       = window.location.origin+process.env.REACT_APP_URL+'payment-success';
//let options = {};

const validateForm = (fields,setError) => {
    setError({});
    let validate = true;
    if(fields.holdername=='' || fields.holdername ==undefined || fields.holdername ==null){
        validate = false;
        setError((values) => ({...values,["holdername"]: "Card holder name is required"}));
    }
    if(fields.email=='' || fields.email ==undefined || fields.email ==null){
        validate = false;
        setError((values) => ({...values,["email"]: "Email is required"}));
    }
    if(fields.condition=='' || fields.condition ==undefined || fields.condition ==null || fields.condition ==0){
        validate = false;
        setError((values) => ({...values,["condition"]: "Please agree with terms and conditions"}));
    }
    return validate;
}
const PaymentForm = (props) => {

    const stripe                    = useStripe();
    const elements                  = useElements();
    let navigate                    = useNavigate();
    const location                  = useLocation();
    //const paymentuser               = props.request;
    const paymentAPI                = props.paymentAPI;
    const setPaymentStatus          = props.setPaymentStatus;
    const [fields, setFields]       = useState({});
    const [error, setError]         = useState(false);
    const [success, setSuccess]     = useState(false);
    const handleSubmit = (stripe, elements) => async () => {
        //const cardElement = elements.getElement(CardElement);
        //console.log(validateForm(fields,setError))
        if(validateForm(fields,setError)){
            const cardElement       = elements.getElement(CardNumberElement);
            const cardExpiryElement = elements.getElement(CardExpiryElement);
            const cardCvcElement    = elements.getElement(CardCvcElement);
            if (cardElement == null) {
                return;
            }

            let token       = '';
            let tokenData   = '';
            stripe.createToken(cardElement, {name: fields.holdername})
            .then(function(response) {
                token       = response.token.id;
                tokenData   = response.token;
                setSuccess('Token created successfully : '+ token)
                paymentMethod(cardElement,token,tokenData);
            });
        }
    };
    const paymentMethod = async (cardElement,token,tokenData) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card:cardElement,
            billing_details: {
                name: fields.holdername,
                email: fields.email,
            },
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            var totalResponse = {...fields,'paymentMethod':paymentMethod,['stripeToken']:token,['tokenData']:tokenData};
            await apiService.apiCall(paymentAPI+'/'+fields.vid, "POST",totalResponse).then(function (response) {
                if (response.statuscode == 200) {
                    setPaymentStatus(true)
                }else{
                    setError(response.error)
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
        setFields(values => ({ ...values, [name]: value }))
    };
    const onChangeEventValue = (name,value) => {
        setFields(values => ({ ...values, [name]: value }))
    };
    useEffect(() => {
        setFields((values) => ({ ...values,...props.request, ['condition']: 1 }));
    }, []);
    return (
        <>
            <PaymentInput name="email" value={fields.email} 
                onChange={(e) =>{
                    //call api for email checking
                    onChangeEventValue("email", e.target.value)
                }}
            //onChange={onChangeEvent}
                InputProps={{
                    placeholder: "Email",
                    style: { color: "#000", fontWeight: "600" },
                }}
            />
            {error.email && (
              <span className="error-message">{error.email}</span>
            )}
            {fields.vid==0 && (
                <>
                    <PaymentInput name="state" value={fields.state} onChange={onChangeEvent}
                        InputProps={{
                            placeholder: "State",
                            style: { color: "#000", fontWeight: "600" },
                        }}
                    />
                    {error.state && (
                    <span className="error-message">{error.state}</span>
                    )}
                </>
            )}
            <PaymentInput name="holdername" value={fields.holdername} onChange={onChangeEvent}
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
                    checked={fields.condition==1 ? true : false}
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
              <button type="button" className="button-2" onClick={redirectBack}>
                Back
              </button>
            </div>
        </>
    );
}

const StripePaymentForm = (props) => {
    const location                  = useLocation();
    const paymentuser               = props.request;

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
