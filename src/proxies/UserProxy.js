import axios from 'axios';

class UserProxy {

    async validate() {
        const { data } = await axios.get('/admin/user/validate-token');
        return data;
    }

    async idRolByPath() {
        const { data } = await axios.get('/admin/user/get-role');
        return data;
    }

    async addFavorite(IDENTRIE) {
        const { data } = await axios.get('/admin/user/add-favorite?IDENTRIE=' + IDENTRIE,{
            params: {  }
        });

        return data;
    }

    async createDirectory(model) {
        const { data } = await axios.post('/admin/user/add-directory', model);
        return data;
    }

    async listDirectory(model) {
        const { data } = await axios.get('/admin/user/list-directory', {
            params: model
        });
        return data;
    }

    async listDirectoryAll() {
        const { data } = await axios.get('/admin/user/list-directory-all');
        return data;
    }

    async saveAddDirectory(model) {
        const { data } = await axios.post('/admin/entries/save-add-directory', model);
        return data;
    }

    async create(model) {
        const { data } = await axios.post('/admin/user/add', model);
        return data;
    }

    async editar(model) {
        const { data } = await axios.post('/admin/user/edit', model);
        return data;
    }

    async editarFoce(model) {
        const { data } = await axios.post('/admin/user/edit-force', model);
        return data;
    }

    async list(model, IDROLE) {
        const { data } = await axios.get(`/admin/user/list?IDROLE=${IDROLE}`, {
            params: model
        });
        return data;
    }

    async getUsuario() {
        const { data } = await axios.get('/admin/user/get');
        return data;
    }


    async delete(ID) {
        const { data } = await axios.post('/admin/user/delete', { ID });
        return data;
    }

    async recover(model) {
        const { data } = await axios.post('/auth/lost-password', model);
        return data;
    }

}

export default new UserProxy();