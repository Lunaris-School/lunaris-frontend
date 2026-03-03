import axios from "axios";

localStorage.setItem("token", "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJkaXJldG9yLmdlcmFsQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsInVzZXJJZCI6MzYsImlhdCI6MTc3MjUzOTEwOCwiZXhwIjoxNzcyNTQyNzA4fQ.ULY2ypZ5FIa2JrqILggGWYO8uLrNYRXPJVnQimaBpsJGTudqN5omFa1ChYRLJMib7I5eClTnjy5zhW6Nb8CLB8Wjdb5RCb2C5ttWxjOF07xLnsW3ajpIgjBocaGE8moslwTJE3C55ODPOfMrkOo5X9xpG9ZJC5SWssJdtynz4IPD7LT96kXF5FO3a-OU4hq-Mz3oRRbafBDIvKuYQqNw3lWO1r-M2NkylkW7w6c5aYfco5yaYgZQoebsyTnVuclqHMgfL6jCVGLYR5ayTlzFg8RE0j8osJIJIc52PJi8g4MonT5BLic5tO_ltJ_JrZLpbt2vV26FaqCqiqKPEg5Hkg");


const api = axios.create({
  baseURL: "https://lunaris-api-u0r1.onrender.com", 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;