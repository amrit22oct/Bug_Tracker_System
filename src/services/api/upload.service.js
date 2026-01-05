import api from "./api";

const uploadService = {
   /* ===================== upload document ================ */
   uploadDocument: async (document) => {
      const response = await api.post("/upload/upload-document", document);
      return response.data;
   }

}

export default uploadService;