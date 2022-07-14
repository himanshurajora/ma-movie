import { database, IMovie } from ".";

export const addMovie = async (movie: IMovie) => {
  await database.movies.add(movie);
};

export const getLastMovie = async () => {
  const movies = await database.movies
    .orderBy("id")
    .reverse()
    .limit(1)
    .toArray();
  return movies[0];
};

export const getNRecentMovies = async (n: number) => {
  const movies = await database.movies
    .orderBy("id")
    .reverse()
    .limit(n)
    .toArray();
  return movies;
};

export const getMovieById = async (id: number) => {
  const movie = await database.movies.get(id);
  return movie;
};

export const getPageOfMovies = async (page: number, n: number) => {
  const movies = await database.movies
    .orderBy("id")
    .reverse()
    .offset(page * n)
    .limit(n)
    .toArray();
  return movies;
};