const Adyen = require('../../config/adyen');

class PaymentController {
    async index(req, res) {
        try {
            
            return res.json({ message: 'sucesso' })
        } catch (error) {
            return res.status(400).json({ message: 'error' })
        }
    }
}

module.exports = new PaymentController();