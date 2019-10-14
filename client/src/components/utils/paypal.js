import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
    render() {

        const onSuccess = (payment) =>{ 
            console.log(JSON.stringify(payment));
            this.props.onSuccess(payment);

             // { 
            //     "paid": true, 
            //     "cancelled": false, 
            //     "payerID": "3GFGQ6GNJ4PWA", 
            //     "paymentID": "PAY-0UB74233TB278434KLMYYMVY", 
            //     "paymentToken": "EC-2J270753AK460261B", 
            //     "returnUrl": "https://www.sandbox.paypal.com/?paymentId=PAY-0UB74233TB278434KLMYYMVY&token=EC-2J270753AK460261B&PayerID=3GFGQ6GNJ4PWA", 
            //     "address": { 
            //         "recipient_name": "test buyer", 
            //         "line1": "1 Main St", 
            //         "city": "San Jose", 
            //         "state": "CA", 
            //         "postal_code": "95131", 
            //         "country_code": "US" 
            //     }, 
            //     "email": "fernando.lobo.prez-buyer@gmail.com" 
            // }

            //{"paid":true,"cancelled":false,"payerID":"3PYVBNTD8FY2S","paymentID":"PAYID-LWFVJKI198948961X759020A","paymentToken":"EC-36W89618SC057611U","returnUrl":"https://www.paypal.com/checkoutnow/error?paymentId=PAYID-LWFVJKI198948961X759020A&token=EC-36W89618SC057611U&PayerID=3PYVBNTD8FY2S","address":{"recipient_name":"John Doe","line1":"1 Main St","city":"San Jose","state":"CA","postal_code":"95131","country_code":"US"},"email":"sb-mt8uq278164@personal.example.com"}


        }

        const onCancel = (data) =>{
            console.log(JSON.stringify(data))
        }

        const onError = (err) => {
            console.log(JSON.stringify(err))
        }

        let env = 'sandbox';
        let currency = 'USD';
        let total = this.props.toPay;

        const client = {
            sandbox:'AZpjXWftg_nP39s93MC_9puTRctRSsLWDI8YjrXt9VYBDnJG6XtZgCegNLrHHtCGm-edLbYfirDl6AFY',
            production:''
        }
        
       

        
        return (
            <div>
                <PaypalExpressBtn
                    env={env}
                    client={client}
                    currency={currency}
                    total={total}
                    onError={onError}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                    style={{
                        size:'large',
                        color: 'blue',
                        shape: 'rect',
                        label: 'checkout'
                    }}
                
                />
            </div>
        );
    }
}

export default Paypal;