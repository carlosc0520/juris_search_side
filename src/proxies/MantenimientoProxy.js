import axios from 'axios';

class MantenimientoProxy {
    // * NOTICIAS
    async list(model) {
        const { data } = await axios.get(`/admin/noticias/list`, {
            params: model
        });
        return data;
    }

    async delete(ID) {
        const { data } = await axios.post('/admin/noticias/delete', { ID });
        return data;
    }

    async create(model) {
        const { data } = await axios.post(`/admin/noticias/add`, model, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json'
            }
        });
        return data;
    }

    async edit(model) {
        const { data } = await axios.post(`/admin/noticias/edit`, model, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Accept: 'application/json'
            }
        });
        return data;
    }

    async getImage(model) {
        const { data } = await axios.post(`/admin/noticias/get-image`, model, {
            responseType: 'blob',
            headers: {
                Accept: 'application/json'
            }
        });
        return data;
    }

    // * PREGUNTAS
    async listPreguntas(model) {
        const { data } = await axios.get(`/admin/preguntas/list`, {
            params: model
        });
        return data;
    }

    async deletePregunta(ID) {
        const { data } = await axios.post('/admin/preguntas/delete', { ID });
        return data;
    }

    async createPregunta(model) {
        const { data } = await axios.post(`/admin/preguntas/add`, model);
        return data;
    }

    async editPregunta(model) {
        const { data } = await axios.post(`/admin/preguntas/edit`, model);
        return data;
    }

    // * PLANES
    async listPlanes(model) {
        const { data } = await axios.get(`/admin/planes/list`, {
            params: model
        });
        return data;
    }

    async listPlanesAbout(model) {
        const { data } = await axios.get(`/settings/help/listPlanes`, {
            params: model
        });
        return data;
    }


    async deletePlan(ID) {
        const { data } = await axios.post('/admin/planes/delete', { ID });
        return data;
    }

    async createPlan(model) {
        const { data } = await axios.post(`/admin/planes/add`, model);
        return data;
    }

    async editPlan(model) {
        const { data } = await axios.post(`/admin/planes/edit`, model);
        return data;
    }


}

export default new MantenimientoProxy();