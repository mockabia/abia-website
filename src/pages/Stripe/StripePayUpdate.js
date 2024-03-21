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
    const paymentuser                       = props.formvalues;
    const setFormvalues                     = props.setFormvalues;
    const paymentAPI                        = props.paymentAPI;
    const setPaymentStatus                  = props.setPaymentStatus;
    const setUpdateModal                    = props.setUpdateModal;
    const setErrorOpen                      = props.setErrorOpen;
    const setErrorMessage                   = props.setErrorMessage;
    const [error, setError]                 = useState(false);
    const [success, setSuccess]             = useState(false);

    const handleSubmit = (stripe, elements) => async () => {
        //const cardElement = elements.getElement(CardElement);
        const cardElement       = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement    = elements.getElement(CardCvcElement);
        if (cardElement == null) {
            return;
        }

        let token       = '';
        let tokenData   = '';
        stripe.createToken(cardElement, {name: paymentuser.holdername})
        .then(function(response) {
            token       = response.token.id;
            tokenData   = response.token;
            //setSuccess('Token created successfully : '+ token)
            paymentMethod(cardElement,token,tokenData);
        });
    };
    const paymentMethod = async (cardElement,token,tokenData) => {
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card:cardElement,
            billing_details: {
                name: paymentuser.holdername,
                email: paymentuser.email,
            },
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            var totalResponse = {...paymentuser,'paymentMethod':paymentMethod,['stripeToken']:token,['tokenData']:tokenData};
            await apiService.apiCall(paymentAPI+'/'+paymentuser.vid+'/5', "POST",totalResponse).then(function (response) {
                if (response.statuscode == 200) {
                    setFormvalues((values) => ({...values,["vid"]: response.result.id,["mem_card_no"]: response.result.mem_card_no,["mem_card_expiry"]: response.result.mem_card_expiry,
                            ["email"]: response.result.email,["holdername"]: response.result.contact_person,
                            ["mem_stype"]: response.result.mem_stype,["mem_ftype"]: response.result.mem_ftype,
                            ["payamount"]: response.result.mem_amount}));
                    setPaymentStatus(1)
                    setUpdateModal(false)
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

    return (
        <>
        <pre>{JSON.stringify(paymentuser, null, 2)}</pre>
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
            <div className="basicinfo-submit-button" onSubmit={handleSubmit}>
              <button type="button" onClick={handleSubmit(stripe, elements)}>Save</button>
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
