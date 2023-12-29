import { Component, OnInit } from '@angular/core';
import { BlogsService } from "../blogs.service";
import { Category } from "../../shared/interfaces/category";
import {SharedModule} from "../../shared/shared.module";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {Blog} from "../../shared/interfaces/blog";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  standalone: true,
  imports: [SharedModule, RouterOutlet],
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit{

   public categories!: Category[];
   public blogs!: Blog[];
   constructor(private blogService: BlogsService) {
   }

   public ngOnInit() {
     this.getCategories();
     this.getBlogs();
   }

   public getBlogs() {
     this.blogService.getBlogs().subscribe((res) => {
       this.blogs = res.data;
     })
   }

   public getCategories(): void {
     this.blogService.getCategories().subscribe((res) => {
       this.categories = res.data;
     })
   }
}
