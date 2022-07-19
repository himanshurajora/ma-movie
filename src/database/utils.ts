import { database, IMovie } from ".";

export const addMovie = async (movie: IMovie) => {
  return await database.movies.add(movie);
};

export const updateMovie = async (movie: IMovie) => {
  return await database.movies.update(movie.id!, movie);
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
  // TODO: Learn Dexie Where clause

  const movies = await database.movies
    .orderBy("id")
    .reverse()
    .offset((page - 1) * n)
    .limit(n)
    .toArray();

  return movies;

  // later filter using database for soft deleted
  // return movies.filter((movie) => {
  //   return movie.deletedAt === null || movie.deletedAt === undefined;
  // });
};

export const getAllMoviesCount = async () => {
  const count = await database.movies.count();
  return count;
};

export const deleteMovieByID = async (id: number) => {
  // implement soft delete
  // const movie = await database.movies.get(id);
  // if (movie) {
  //   movie.deletedAt = new Date().toISOString();
  //   await database.movies.put(movie);
  // }

  // hard delete
  await database.movies.delete(id);
};
