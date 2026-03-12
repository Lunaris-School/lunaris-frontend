import api from "./api";

export function listarTurmas(){
  return api.get("/v1/turma/listarTodas");
};

export const listarMediasPorTurma = () => {
  return api.get("/v1/turma/listarMedias");
};

export const buscarTurmaPorProfessor = (cpf) => {
  return api.get(`/v1/turma/listarTurmaPorProfessor/${cpf}`);
};

export const inserirTurma = (dados) => {
  return api.post("/v1/turma", dados);
};

export const atualizarDisciplinasTurma = (id, dados) => {
  return api.patch(`/v1/turma/${id}`, dados);
};

export const deletarTurma = (id) => {
  return api.delete(`/v1/turma/deletar/${id}`);
};

export const listarTurmasPorProfessor = (cpf) => {
  return api.get(`/v1/turma/listarTurmaPorProfessor/${cpf}`);
};