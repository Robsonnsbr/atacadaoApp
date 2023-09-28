import axios from "axios";
// import dotenv from "dotenv";
// dotenv.config();

const api = axios.create({
  baseURL: "https://back-end-one-theta.vercel.app",
});

export const createSession = async (email: string, password: string) => {
  try {
    const responsePost = await api.post("/sessions", {
      email,
      password,
    });
    console.log(responsePost.data);
    return responsePost.data;
  } catch (error: unknown) {
    throw new Error(`Erro ao criar sessão:\n ${error}`);
  }
};

const getToken = async () => {
  try {
    const response = await api.get("/user");
    return response.data[1];
  } catch (error) {
    console.error("Erro ao obter token:", error);
    throw error; // Rejeitar o erro para que o chamador possa tratá-lo
  }
};

export const getUser = async (_email: string, _password: string) => {
  try {
    const response = await api.get("/user");
    const { email, password } = response.data[0];
    if (email === _email && password === _password) {
      const token = await getToken();
      return token;
    } else {
      return null; // Retorna nulo se as credenciais não coincidirem
    }
  } catch (error) {
    console.error("Erro ao obter usuário:", error);
    throw error; // Rejeitar o erro para que o chamador possa tratá-lo
  }
};
