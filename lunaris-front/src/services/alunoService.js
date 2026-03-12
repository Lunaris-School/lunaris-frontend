import api from "./api";

export const listarAlunos = () => {
  return api.get("/aluno");
};

export const buscarAlunoPorCpf = (cpf) => {
  return api.get(`/aluno/buscar/${cpf}`);
};

export const bucarAlunosPorTurma = (ano) => {
    return api.get(`/aluno/listarPorTurma/${ano}`);
};

export const inserirAluno = (dados) => {
  return api.post("/aluno/inserir", dados);
};

export const atualizarAluno = (cpf, dados) => {
  return api.put(`/aluno/atualizar/${cpf}`, dados);
};

export const quantidadeAlunosStatus = (cpf) => {
  return api.get(`/v1/turma/listarQuantidadeStatus/${cpf}`);
}

export const listarRankingAlunos = (professorCpf, disciplinaId, quantidade = 10) => {
  return api.get("/aluno/listarRanking", {
    params: {
      professorCpf,
      disciplinaId,
      quantidade,
    },
  });
};
