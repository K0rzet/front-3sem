import axios, { AxiosResponse } from "axios"
import { getMoviesUrl } from "../configs/urls.config"
import { IMovieResponse } from "../shared/types/movie.types"

export const MovieService = {
	async getAll(
		searchTerm?: string,
		page: number = 1,
		pageSize: number = 1
	): Promise<AxiosResponse<IMovieResponse>> {
		return axios.get<IMovieResponse>(getMoviesUrl(''), {
			params: {
				searchTerm,
				page,
				pageSize,
			},
		})
	},

    async deleteMovie(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	},

}