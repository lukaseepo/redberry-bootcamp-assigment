import {Category} from "./category";


export interface Blogs {
  data: Blog[],
}
export interface Blog{
  title: string;
  description: string;
  image: string;
  author: string;
  publish_date: string;
  categories: Category[];
  email: string;
}
