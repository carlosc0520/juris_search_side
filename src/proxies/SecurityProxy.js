import axios from 'axios';

class SecurityProxy {
    async getLastBackUp() {
        const { data } = await axios.get('/security/last-back-up');
        return data;
    }

    async generateBackUp() {
        const { data } = await axios.get(`/security/back-up`);
        return data;
    }
}

export default new SecurityProxy();