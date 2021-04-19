const Adyen = require('../../config/adyen');

class MethodsPaymentController {
    async index(req, res) {
        try {
            const response = await Adyen.paymentMethods({
                merchantAccount: process.env.ADYEN_MERCHANT_ACOUNT,
                countryCode: 'BR',
                shopperLocale: 'pt-BR',
                amount: {
                    currency: 'BRL',
                    value: 1000
                },
                splitCardFundingSources: true,
                channel: 'Web'
            });


            return res.json(response);
        } catch (error) {
            return res.status(400).json(error);    
        }
    }
}

module.exports = new MethodsPaymentController();