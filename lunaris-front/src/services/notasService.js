import api from "./api";

export const lancarNota = (dados) => {
  return api.post("/v1/notas", dados);
};