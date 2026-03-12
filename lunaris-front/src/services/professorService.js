import api from "./api";

export const listarProfessores = () => {
  return api.get("/api/professor");
};

export const buscarProfessorPorCpf = (cpf) => {
  return api.get(`/api/professor/buscar/${cpf}`);
};

export const bucarAlunosPorProfessor = (cpf) => {
    return api.get(`/api/professor/alunos/${cpf}`);
};

export const inserirProfessor = (dados) => {
  return api.post("/api/professor", dados);
};

export const atualizarProfessor = (cpf, dados) => {
  return api.put(`/api/professor/atualizar/${cpf}`, dados);
};

export const deletarProfessor = (cpf) => {
    return api.delete(`/api/professor/deletar/${cpf}`);
};

// não foi add o endpoit de patch do ProfessorController

