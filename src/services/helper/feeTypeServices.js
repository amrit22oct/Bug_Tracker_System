import api from "./api";

const feeTypeServices = {
  getFeeType: (page = 1) =>
    api.get("/fee-type/feetype-list", {
      params: { page },
    }),
  addFeeType: (data) => api.post("/api/fee-type/add-feetype", data),
};

export default feeTypeServices;
