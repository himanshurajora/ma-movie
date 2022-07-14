import Dexie, { Table } from "dexie";

export interface IMovie {
  id?: number;
  remark: string;
  date: string;
  content: string;
}

export class MovieDatabase extends Dexie {
  public movies!: Table<IMovie, number>;

  constructor() {
    super("MoviesDatabase");
    this.version(1).stores({
      movies: "++id,remark,date,content",
    });
  }
}

export const database = new MovieDatabase();
