import api from "./api";

export const buscarBoletimAluno = (cpf) => {
  return api.get(`/v1/boletim/aluno/${cpf}`);
};
