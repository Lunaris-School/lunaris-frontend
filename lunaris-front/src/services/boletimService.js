import api from "./api";

export const buscarBoletinsPorAluno = (cpf) => {
  return api.get(`/v1/boletim/aluno/${cpf}`);
};

export const criarBoletim = (alunoCpf) => {
  return api.post("/v1/boletim", { alunoCpf: Number(alunoCpf) });
};