import api from "./api";

export const listarDisciplinas = () => {
  return api.get("/api/disciplina");
};

export const inserirDisciplina = () => {
    return api.post("/api/disciplina");
}

export const atualizarDisciplina = (id) => {
    return api.put(`/api/disciplina/${id}`);
}