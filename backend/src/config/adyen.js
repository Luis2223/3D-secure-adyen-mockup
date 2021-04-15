const { Config, Client, CheckoutAPI } = require('@adyen/api-library');

class Adyen {
    constructor() {
        const config = new Config({
            apiKey: process.env.API_KEY
        })
        const client = new Client({ config })
        client.setEnvironment(
            process.env.ADYEN_AMBIENTE,
            process.env.ADYEN_PASS
        )

        this.checkout = new CheckoutAPI(client);

    }    
}

module.exports = new Adyen().checkout;