import axios from 'axios';

class FilterProxy {
    async list(model, TIPO) {
        const { data } = await axios.get(`/admin/filtros/list?TIPO=${TIPO}`, {
            params: model
        });
        return data;
    }

    async delete(ID) {
        const { data } = await axios.post('/admin/filtros/delete', { ID });
        return data;
    }

    async create(model) {
        const { data } = await axios.post(`/admin/filtros/add`, model);
        return data;
    }
    
    async edit(model) {
        const { data } = await axios.post(`/admin/filtros/edit`, model);
        return data;
    }
    
    async get(id) {
        const { data } = await axios.get(`/filters/${id}`);
        return data;
    }


    async jurisprudenceSearch(filters) {
        const { data } = await axios.post(`/jurisprudences/search`, filters);
        return data;
    }

    async legislationSearch(filters) {
        const { data } = await axios.post(`/legislations/search`, filters);
        return data;
    }
}

export default new FilterProxy();