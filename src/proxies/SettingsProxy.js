import axios from 'axios';

class SettingsProxy {
    async create(formData) {
        const { data } = await axios.post(`/settings/help/add`, formData);
        return data;
    }

    async edit(formData) {
        const { data } = await axios.post(`/settings/help/edit`, formData);
        return data;
    }

    async list(model) {
        const { data } = await axios.get(`/settings/help/list`, {
            params: model
        });
        return data;
    }

    async delete(ID) {
        const { data } = await axios.post('/settings/help/delete', { ID });
        return data;
    }
}

export default new SettingsProxy();