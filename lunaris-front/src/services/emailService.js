import axios from "axios";

const emailApi = axios.create({
  baseURL: "https://lunaris-mail-service.onrender.com"
});

export const enviarEmail = async (nomeAluno, emailProfessor, assunto, conteudo) => {
  try {
    const response = await emailApi.post("/enviar-email", {
      nomeAluno,
      emailProfessor,
      assunto,
      conteudo
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar email:", error);
    throw error;
  }
};
