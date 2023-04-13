export interface IMovie {
  id: string;
  name?: string;
  genre?: string;
  year?: number;
  rating?: number;
  stock?: number;
}

export interface IUser {
  id?: string;
  username: string;
  password: string;
  email?: number;
  movieId?: string[];
}
