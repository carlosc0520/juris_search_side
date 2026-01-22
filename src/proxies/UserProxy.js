import axios from 'axios';

class UserProxy {

    async validate() {
        const { data } = await axios.get('/admin/user/validate-token');
        return data;
    }

    async validateTokenGoogle(token) {
        const { data } = await axios.get('/admin/user/validate-token', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    }


    async idRolByPath() {
        const { data } = await axios.get('/admin/user/get-role');
        return data;
    }

    async getReporte(model) {
        const { data } = await axios.get('/admin/user/reporte-estadisticos', {
            params: model
        });
        return data;
    }

    async addFavorite(IDENTRIE) {
        const { data } = await axios.get('/admin/user/add-favorite?IDENTRIE=' + IDENTRIE, {
            params: {}
        });

        return data;
    }

    async deleteFavorite(IDFAV) {
        const { data } = await axios.post('/admin/user/delete-favorite', { IDFAV });
        return data;
    }

    async paymentSubscription(model) {
        const { data } = await axios.post('/admin/user/payment-subscription', model);
        return data;
    }

    // * DIRECTORIOS
    async createDirectory(model) {
        const { data } = await axios.post('/admin/user/add-directory', model);
        return data;
    }

    async updateDirectory(model) {
        const { data } = await axios.post('/admin/user/edit-directory', model);
        return data;
    }

    async deleteDirectory(DIRECTORIOS) {
        const { data } = await axios.post('/admin/user/delete-directory', { DIRECTORIOS });
        return data;
    }

    async sharedDirectory(model) {
        const { data } = await axios.post('/admin/user/shared-directory', model);
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

    async editarFoce(formData) {
        const { data } = await axios.post('/admin/user/edit-force', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Accept: "application/json",
            },
        });
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

    async deleteFavoriteDirectorio(IDDIRECTORIO, IDENTRIE) {
        const { data } = await axios.post('/admin/user/delete-favorite-directory', {
            IDDIRECTORIO,
            IDENTRIE
        });
        return data;
    }

    // * CONTACTO
    async getContactos(params) {
        const { data } = await axios.get('/admin/user/get-contacts', {
            params,
        });
        return data;
    }

    async createContacto(model) {
        const { data } = await axios.post('/admin/user/add-contact', model);
        return data;
    }

    async updateContacto(model) {
        const { data } = await axios.post('/admin/user/edit-contact', model);
        return data;
    }

    async deleteContacto(ID) {
        const { data } = await axios.post('/admin/user/delete-contact', { ID });
        return data;
    }
   
    async deleteNotificaciones(IDS) {
        const { data } = await axios.post('/admin/user/delete-notificaciones', { IDS });
        return data;
    }

    // NOTIFICACIONES
    async getNotificaciones(params) {
        const { data } = await axios.get('/admin/user/get-notifications', {
            params,
        });
        return data;
    }

    // * COMPARTIR
    async setCompartirEntrada(model) {
        const { data } = await axios.post('/admin/user/compartir-entradas', model);
        return data;
    }

    async getContactosSelecteds(model) {
        const { data } = await axios.get('/admin/user/get-contacts-selecteds', {
            params: model,
        });
        return data;
    }

    async updateView() {
        const { data } = await axios.get('/admin/user/update-view');
        return data;
    }
}

export default new UserProxy();