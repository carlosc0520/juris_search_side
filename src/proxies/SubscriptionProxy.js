import axios from 'axios';

class SubscriptionProxy {
    // apiUrl = "https://unrevealed-thoughtful-georgiana.ngrok-free.dev/admin/culqi";
    apiUrl = "";
    async create(formData) {
        const { data } = await axios.post(`${this.apiUrl}/admin/culqi/create-order`, formData);
        return data;
    }

    async chargeWithToken(formData) {
        const { data } = await axios.post(`${this.apiUrl}/admin/culqi/charge-with-token`, formData);
        return data;
    }
    
    async payment_list(model) {
        const { data } = await axios.get(`/admin/user/payment-list`, {
            params: model
        });
        return data;
    }
}

export default new SubscriptionProxy();