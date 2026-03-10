import api from "./api";

export const buscarBoletinsPorAluno = (cpf) => {
  return api.get(`/v1/boletim/aluno/${cpf}`);
};