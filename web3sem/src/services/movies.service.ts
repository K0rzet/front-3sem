import axios, { AxiosResponse } from "axios";
import { API_URL, getMoviesUrl } from "../configs/urls.config";
import { IMovieEdit, IMovieResponse } from "../shared/types/movie.types";

export const MovieService = {
  async getAll(searchTerm?: string, page: number = 1, pageSize: number = 1): Promise<AxiosResponse<IMovieResponse>> {
    return await axios.get<IMovieResponse>(getMoviesUrl(""), {
      params: {
        searchTerm,
        page,
        pageSize,
      },
    });
  },

  async deleteMovie(_id: string) {
    return await axios.delete<string>(getMoviesUrl(`/${_id}`));
  },
};

export const getMovieById = async (id: string) => {
  const response = await axios.get(`${API_URL}/movies/${id}`);
  return response.data;
};

export const updateMovie = async (id: string, newData: IMovieEdit) => {
  const response = await axios.put(`${API_URL}/movies/${id}`, newData);
  return response.data;
};
