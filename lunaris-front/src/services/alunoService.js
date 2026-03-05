import api from "./api";

export const listarAlunos = () => {
  return api.get("/aluno");
};

export const buscarAlunoPorCpf = (cpf) => {
  return api.get(`/aluno/buscar/${cpf}`);
};

export const buscarAlunosPorTurma = (ano) => {
  return api.get(`/aluno/listarPorTurma?ano=${ano}`);
};

export const inserirAluno = (dados) => {
  return api.post("/aluno/inserir", dados);
};

export const atualizarAluno = (cpf, dados) => {
  return api.put(`/aluno/atualizar/${cpf}`, dados);
};

