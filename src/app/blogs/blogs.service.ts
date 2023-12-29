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
      'Authorization': 'Bearer 10dd4997172cd37aa0ccc0e707ee6771b110afcc1c2edef494a284cee3117b5e',
    });
    return this.http.post(`${this.apiKey}blogs`, blog, {headers: headers});
  }

  public getBlogById(id:number) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 10dd4997172cd37aa0ccc0e707ee6771b110afcc1c2edef494a284cee3117b5e',
    });
    return this.http.get<Blog>(`${this.apiKey}blogs/${id}`,{headers: headers});
  }

  public getBlogs() {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer 10dd4997172cd37aa0ccc0e707ee6771b110afcc1c2edef494a284cee3117b5e',
    });
    return this.http.get<Blogs>(`${this.apiKey}blogs`, {headers: headers});
  }

  public login(user: {email: string}) {
    return this.http.post(`${this.apiKey}login`, user)
  }
}
