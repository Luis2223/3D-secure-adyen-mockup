const Adyen = require('../../config/adyen');

class PaymentDetailsController {
    // Recupera detalhes do pagamento 3ds
    async store(req, res) {
        try {
            const {
                details,
                paymentData
            } = req.body;

            const response = await Adyen.paymentsDetails({
                details,
                paymentData
            });

            return res.json(response);
        } catch (error) {
            console.error(error)
            return res.status(400).json(error);
        }
    }
}

module.exports = new PaymentDetailsController();