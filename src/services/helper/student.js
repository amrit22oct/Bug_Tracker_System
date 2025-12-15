import api from "./api";

const studentDetaislService = {
  // Get student details by studentId
  getStudentDetails: (studentId) => api.get(`/students/get-student/${studentId}`),
};

export default studentDetaislService;
