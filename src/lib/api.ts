import axios, { AxiosError } from "axios";

const BASE = import.meta.env.PUBLIC_API_URL;

export const api = {

submitApplication: async (payload: { offer_uuid: string; fields: any }) => {
  try {
    const formData = new FormData();
    formData.append("client_offer_uuid", payload.offer_uuid);

    // Iteramos los campos dinámicos
    Object.keys(payload.fields).forEach((key) => {
      const value = payload.fields[key];
      // Si el valor es una lista de archivos (input type="file"), los adjuntamos
      if (value instanceof FileList || value instanceof File) {
        if (value instanceof FileList) {
          Array.from(value).forEach((file) => formData.append(`fields[${key}]`, file));
        } else {
          formData.append(`fields[${key}]`, value);
        }
      } else {
        formData.append(`fields[${key}]`, value);
      }
    });

    const { data } = await axios.post(`${BASE}/offers/applications`, formData);
    return data;
  } catch (error) {
    const err = error as AxiosError;
    console.error("API submitApplication error:", err.response?.data);
    throw new Error(err.response?.data?.message ?? "Error al enviar la solicitud");
  }
},


products: async () => {
  try {
    const { data } = await axios.get(`${BASE}/products`);
    return data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("API products error:", {
      message: err.message,
      status: err.response?.status,
    });


    throw new Error("No se pudieron cargar los productos");
  }
},

entities: async () => {
  try {
    const { data } = await axios.get(`${BASE}/entities`);
    return data;
  } catch (error) {
    const err = error as AxiosError;

    console.error("API clientes error:", {
      message: err.message,
      status: err.response?.status,
    });


    throw new Error("No se pudieron cargar los clientes");
  }
},


  searchOffers: async (params: {
    type: string;
    amount?: number;
    ingreso?: number;
    plazo?: number;
  }) => {
    try {
      const { data } = await axios.get(`${BASE}/offers/search`, { params });
      return data;
    } catch (error) {
      const err = error as AxiosError;

      // Log seguro (server-only)
      console.error("API searchOffers error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      // ❗ Lanza SOLO información serializable
      throw new Error(
        err.response?.data?.message ??
        "Error al buscar ofertas"
      );
    }
  }
};
