import Dexie, { Table } from "dexie";

export interface IMovie {
  id: number;
  title: string;
  description: string;
  date: string;
  path: string;
}

export class MovieDatabase extends Dexie {
  public movies!: Table<IMovie, number>;

  constructor() {
    super("MoviesDatabase");
    this.version(1).stores({
      movies: "++id,title,description,date,path",
    });
  }
}

export const database = new MovieDatabase();
