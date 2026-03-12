import api from "./api";

export const lancarNota = (dados) => {
  return api.post("/v1/notas", dados);
};

export const atualizarNota = (notaId, dados) => {
  return api.patch(`/v1/notas/${notaId}`, dados);
};