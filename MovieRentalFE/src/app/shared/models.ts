export interface IMovie {
  id: string;
  name?: string;
  genre?: string;
  year?: number;
  rating?: number;
  stock?: number;
  reviews?: IReview[];
}

export interface IUser {
  id?: string;
  username: string;
  password: string;
  email?: number;
  movieId?: string[];
}

export interface IReview {
  username?: string;
  description?: string;
  datetime?: Date;
}
