import axios from 'axios';

class LoginProxy {
    async login(model) {
        const resp = await axios.post(`/login/autenticar`, model)
        return resp;
    }

    async logout() {
        const resp = await axios.get(`/login/logout?token=${localStorage.getItem('user-token')}`);
        return resp;
    }

    // * NOTICIAS
    async list(model) {
        const { data } = await axios.get(`/login/noticias`, {
            params: model
        });
        return data;
    }

    async listCategorias(model) {
        const { data } = await axios.get(`/login/list-categorias`, {
            params: model
        });
        return data;
    }
    
    // * PREGUNTAS
    async listpreguntas(model) {
        const { data } = await axios.get(`/login/preguntas`, {
            params: model
        });
        return data;
    }
    async recover(model) {
        const { data } = await axios.post(`/auth/lost-password`, model);
        return data;
    }
}

export default new LoginProxy();