import axios from 'axios';

class DocumentsProxy {
    async list() {
        const { data } = await axios.get('/jurisprudences');
        return data;
    }

    async getById(id) {
        const { data } = await axios.get(`/jurisprudences/${id}`);
        return data;
    }

    async getRelatedsById(id) {
        const { data } = await axios.get(`/jurisprudences/${id}/related`);
        return data;
    }

    async getDocumentJurisprudence(id) {
        const { data } = await axios.get(`/jurisprudences/${id}/document`);
        return data;
    }

    async getResumenDocumentJurisprudence(id) {
        const { data } = await axios.get(`/jurisprudences/${id}/document/resumen`);
        return data;
    }

    async listLegislation() {
        const { data } = await axios.get('/legislations');
        return data;
    }

    async getByIdLegislation(id) {
        const { data } = await axios.get(`/legislations/${id}`);
        return data;
    }

    async getRelatedByIdLegislation(id) {
        const { data } = await axios.get(`/legislations/${id}/related`);
        return data;
    }

    async getDocumentLegislation(id) {
        const { data } = await axios.get(`/legislations/${id}/document`);
        return data;
    }

    async getUserDocuments(id, documentType) {
        const { data } = await axios.get(`/users/${id}/documents?type=${documentType}`);
        return data;
    }

    async postUserDocument(id, document) {
        const { data } = await axios.post(`/users/${id}/documents`, document);
        return data;
    }

    async deleteUserDocument(id, documentId, documentType) {
        const { data } = await axios.delete(`/users/${id}/documents?document_id=${documentId}&document_type=${documentType}`);
        return data;
    }

}

export default new DocumentsProxy();