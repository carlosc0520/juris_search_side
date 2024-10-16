import axios from 'axios';

class AuditoriaProxy {
    async list(model) {
        const { data } = await axios.get(`/admin/auditoria/list`, {
            params: model
        });
        return data;
    }
}

export default new AuditoriaProxy();