const { Config, Client, CheckoutAPI } = require('@adyen/api-library');

class Adyen {
    constructor() {
        console.log('initialize adyen...')
        console.log('set .env ', process.env.API_KEY)
        const config = new Config({
            apiKey: process.env.API_KEY
        })
        this.client = new Client({ config })
        this.client.setEnvironment(
            process.env.ADYEN_AMBIENTE,
            process.env.ADYEN_PASS
        )

        this.checkout = new CheckoutAPI(this.client);

    }    
}

module.exports = new Adyen().checkout;