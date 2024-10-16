import axios from 'axios';

class AdminUsersProxy {
    async get(userType, perPage, currentPage, filter) {
        const queryStringFilter = [];
        if (filter) {
            if (filter.name) {
                queryStringFilter.push('&search=' + filter.name);
            }
        }
        const { data } = await axios.get(`/users?role=${userType}&perPage=${perPage}&currentPage=${currentPage}${queryStringFilter.join(' ')}`);
        return data;
    }
    async getById(userId) {
        const { data } = await axios.get(`/users/${userId}`);
        return data;
    }

    async editUser(userData) {
        const { data } = await axios.put(`/users`,userData);
        return data;
    }

    async deleteUser(userId) {
        const { data } = await axios.delete(`/users/${userId}`);
        return data;
    } 

    async activeUser(model) {
        const { data } = await axios.patch(`/users/update-status`, model);
        return data;
    } 
    
}

export default new AdminUsersProxy();