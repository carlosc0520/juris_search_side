import axios from 'axios';

class JurisGPTProxy {
    async preguntarGPT(formData) {
        const { data } = await axios.post(`/admin/openai/preguntar`, formData);
        return data;
    }

}

export default new JurisGPTProxy();