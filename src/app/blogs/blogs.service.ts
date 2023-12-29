import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Categories} from "../shared/interfaces/category";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Blog, Blogs} from "../shared/interfaces/blog";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiKey = 'https://api.blog.redberryinternship.ge/api/';
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiKey}categories`)
  }

  public addNewBlog(blog: FormData) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 9b528cdeebd96aa5955677a58fdd64acc4f558be1a59cb04224efe31793978a2',
    });
    return this.http.post(`${this.apiKey}blogs`, blog, {headers: headers});
  }

  public getBlogById(id:number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 9b528cdeebd96aa5955677a58fdd64acc4f558be1a59cb04224efe31793978a2',
    });
    return this.http.get<Blog>(`${this.apiKey}blogs/${id}`,{headers: headers});
  }

  public getBlogs() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 9b528cdeebd96aa5955677a58fdd64acc4f558be1a59cb04224efe31793978a2',
    });
    return this.http.get<Blogs>(`${this.apiKey}blogs`, {headers: headers});
  }

  public login(user: {email: string}) {
    return this.http.post(`${this.apiKey}login`, user)
  }
}
