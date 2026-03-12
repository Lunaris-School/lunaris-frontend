import api from "./api";

export const login = (email, senha) => {
  return api.post("/auth/login", { email, senha });
};

export const buscarDetalhesUsuario = () => {
    return api.get(`/auth/buscarDetalhesUsuario`);
};
