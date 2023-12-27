export interface IGenre {
	_id: string
	name: string
	slug: string
	description: string
	icon: string
}

export interface IParameters {
	year: number
	duration: number
	country: string
}

export interface IActor {
	_id: string
	photo: string
	name: string
	countMovies: number
	slug: string
}

export interface IMovie {
	_id: string
	poster: string
	bigPoster: string
	title: string
	parameters: IParameters
	genres: IGenre[]
	actors: IActor[]
	countOpened: number
	videoUrl: string
	rating: number
	slug: string
    year: number
    totalCount: number
    totalPages: number
}

export interface IMovieResponse {
    movies: IMovie[];
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }
