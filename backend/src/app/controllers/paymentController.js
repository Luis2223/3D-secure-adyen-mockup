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
            } = req.body.paymentData;
            const { value, inscricao } = req.body;

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
                returnUrl: 'http://localhost:4444/teste',
            });

            
            return res.json(response)
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: 'error', stack: error })
        }
    }
}

module.exports = new PaymentController();