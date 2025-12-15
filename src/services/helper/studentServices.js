import api from "./api";

const studentServices = {
  getStudent: (page = 1) =>
    api.get("/students/get-all-student", {
      params: { page },
    }),
  uploadImage: (formData) =>
    api.post("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      timeout: 30000, // 30 seconds
    }),
  addStudent: (data) => api.post("/students/add-student", data),
};

export default studentServices;
