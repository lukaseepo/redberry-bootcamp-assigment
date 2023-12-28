import { Component, OnInit } from '@angular/core';
import { BlogsService } from "../blogs.service";
import { Category } from "../../shared/interfaces/category";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit{

   public categories!: Category[];
   constructor(private blogService: BlogsService) {
   }

   public ngOnInit() {
     this.getCategories();
   }

  public getCategories(): void {
     this.blogService.getCategories().subscribe((res) => {
       this.categories = res.data;
     })
   }
}
