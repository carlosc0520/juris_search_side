import axios from 'axios';

class HelpersProxy {
    async getHead(tipo) {
        const { data } = await axios.get(`/admin/helpers/getHead?TIPO=${tipo}`);
        return data;
    }


    
}

export default new HelpersProxy();