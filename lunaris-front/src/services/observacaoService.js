import api from "./api";

export const inserirObservacao = (dados) => {
  return api.post("/observacao/inserir", dados);
};

export const buscarObservacoesPorAluno = (alunoCpf) => {
  return api.get(`/observacao/buscar/aluno/${alunoCpf}`);
};