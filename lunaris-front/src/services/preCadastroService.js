import api from "./api";

export const preCadastrarAluno = (dados) => {
  return api.post("/api/pre-cadastro", dados);
};


