import axios from 'axios';

class MagistradoProxy {
    async list(model, ESTADO = 1) {
        const { data } = await axios.get(`/admin/magistrados/list?ESTADO=${ESTADO}`, {
            params: model
        });
        return data;
    }

    async delete(ID) {
        const { data } = await axios.post('/admin/magistrados/delete', { ID });
        return data;
    }

    async create(model) {
        const { data } = await axios.post(`/admin/magistrados/add`, model);
        return data;
    }
    
    async edit(model) {
        const { data } = await axios.post(`/admin/magistrados/edit`, model);
        return data;
    }
    
}

export default new MagistradoProxy();