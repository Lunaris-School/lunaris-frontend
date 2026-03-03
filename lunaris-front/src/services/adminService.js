import api from "./api";

export const listarAdmins = () => {
  return api.get("/api/admin");
};

export const buscarAdminPorId = (id) => {
  return api.get(`/api/admin/${id}`);
};

export const inserirAdmin = (dados) => {
  return api.post("/api/admin/", dados);
};

export const atualizarAdmin = (id, dados) => {
  return api.put(`/api/admin/${id}`, dados);
};

export const deletarAdmin = (id) => {
    return api.delete(`/api/admin/${id}`);
};