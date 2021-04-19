import React, { useEffect, useRef } from 'react';
import AdyenCheckout from '@adyen/adyen-web';
import moment from 'moment';
import publicIpData from '../utils/getIp';

function Adyen(props) {
  const adyne_container_ref = useRef();
  const { setResultCode } = props;
  
  useEffect(() => {
    const main = async() => {
      console.log('listando metodos de pagamentos');
      const paymentMethods = await fetch(`${process.env.REACT_APP_BASE_URL}methods/list`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        // body: JSON.stringify({ value: 47.70 * 100 })
      })
      .then(response => {
        console.log('success...');
        return response.json();
      })
      .catch(error => {
        console.error(error);
        alert('error', JSON.stringify(error));
      })

      const configuration = {
        paymentMethodsResponse: paymentMethods,
        clientKey: process.env.REACT_APP_ADYEN_KEY,
        locale: 'pt-BR',
        environment: 'test',
        onSubmit: async (state, component) => {
          const data = {
            paymentData: {
              ...state.data,
              shopperEmail: 'luisfsdsantiago@gmail.com',
              shopperIP: await publicIpData(),
            },
            reference: '1',
            inscricao: 88032223,
            deliveryDate: moment().add(3, 'days').toISOString(),
            value: 47.70 * 100,
            origin: 'http://localhost:3000',
            // shopperEmail: 'luisfsdsantiago@gmail.com',
            // shopperIp: (async() => {
            //   return await publicIp.v4()
            // })()
          }

          if (state.data.paymentMethod.type === 'scheme') {
            const cartao = await fetch(`${process.env.REACT_APP_BASE_URL}payments/receveid`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
              body: JSON.stringify(data)
            })
            .then(response => {
              console.log('cobrando valor...');
              return response.json();
            })
            .catch(err => {
              console.error(err);
              alert('error: ', JSON.stringify(err));
            })

            console.log(cartao)

            if (cartao.action) {
              console.log('handleAction /payments');
              component.handleAction(cartao.action);
            } else {
              console.log('showFinalResult /payments', cartao.resultCode);
              alert(cartao.resultCode)
              setResultCode(cartao.resultCode)
            }
          }

          console.log('submit')
        },
        onchange: (handle) => {
          console.log(handle);
        },
        onerror: (error) => {
          console.error(error);
        },
        onAdditionalDetails: async (state, dropin) => {
          // Post para o servidor 
          console.log('payments /details')
          const dados = await fetch(`${process.env.REACT_APP_BASE_URL}payments/details`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify(state.data)
          })
          .then(res => res.json());

          console.log(dados.resultCode);

          if (dados.action) {
            return dropin.handleAction(dados.action);
          } else {
            console.log('finish...');
            alert(dados.resultCode);
            return dropin.onComplete({ data: state.data.details })
          }
          
        } 
      }
      
      const checkout = new AdyenCheckout(configuration);
      checkout.create('dropin', {
        showPayButton: true,
        paymentMethodsConfiguration: {
          card: { // Sample Drop-in configuration for 3D Secure
              hasHolderName: true,
              holderNameRequired: true,
              enableStoreDetails: true,
              name: 'Credit or debit card',
              billingAddressRequired: true,
              data: {
                holderName: 'Luis Felipe',

              }
              
          },
        },
      }).mount(adyne_container_ref.current);
    }
    main();
    console.log('In useEffect');
  }, [setResultCode]);

  return (
      <div>
          <h1>Modal</h1>
          <div ref={adyne_container_ref} id="adyen-container"></div>
          {/* </div><div ref={voucher_container_ref}></div> */}
      </div>
  );
}

export default Adyen;