import axios from "axios";

class boletinProxy {
  async create(formData) {
    const { data } = await axios.post(`/admin/boletin/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    return data;
  }

  async list(model) {
      const { data } = await axios.get(`/admin/boletin/list`, {
          params: model
      });
      return data;
  }
}

export default new boletinProxy();
