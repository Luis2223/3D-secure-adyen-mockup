const Adyen = require('../../config/adyen');
const { uuid } = require('uuidv4')

class PaymentController {
    async store(req, res) {
        try {
            const {
                paymentMethod,
                shopperName,
                shopperEmail,
                installments,
                browserInfo,
                shopperIP
            } = req.body.paymentData;
            const { value, inscricao, origin } = req.body;

            console.log('shopper ip', shopperIP)

            const reference = uuid();

            const response = await Adyen.payments({
                merchantAccount: process.env.ADYEN_MERCHANT_ACOUNT,
                reference,
                amount: {
                    currency: 'BRL',
                    value,
                },
                shopperName,
                shopperEmail,
                paymentMethod,
                installments,
                shopperReference: inscricao,
                recurringProcessingModel: 'CardOnFile',
                shopperInteraction: 'Ecommerce',
                returnUrl: 'http://localhost:3000',
                browserInfo,
                origin,
                shopperIP,
                additionalData: {
                    allow3DS2: true
                },
                channel: 'Web',
            });

            
            return res.json(response)
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: 'error', stack: error })
        }
    }
}

module.exports = new PaymentController();