type Nullable<T> = T | null;

interface Post {
  id: string;
  title: string;
  date: Date;
  body: string;
  excerpt: string;
}

export type NPost = Nullable<Post>;
export type Posts = Post[];
