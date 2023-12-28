import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Categories} from "../shared/interfaces/category";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private apiKey = 'https://api.blog.redberryinternship.ge/api/';
  constructor(private http: HttpClient) { }

  public getCategories(): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiKey}categories`)
  }
}
