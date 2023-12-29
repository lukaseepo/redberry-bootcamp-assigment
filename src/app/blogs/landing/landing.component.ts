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
   public allBlogs!: Blog[];
   public selectedCategories: Category[] = [];
   constructor(private blogService: BlogsService) {
   }

   public ngOnInit() {
     this.getCategories();
     this.getBlogs();
   }

   public getBlogs() {
     this.blogService.getBlogs().subscribe((res) => {
       this.blogs = res.data;

       // Filter out blogs with publishDate greater than current date
       const currentDate = new Date();
       this.blogs = this.blogs.filter(blog => {
         const blogDate = new Date(Date.parse(blog.publish_date));

         // Ensure that blogDate is a valid date
         if (!isNaN(blogDate.getTime())) {
           return blogDate <= currentDate;
         } else {
           return false; // Exclude blogs with invalid date format
         }
       });
       this.allBlogs = this.blogs;
     });
   }

  public onCategoryClick(category: any): void {
    const index = this.selectedCategories?.indexOf(category);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories?.splice(index, 1);
      if (this.selectedCategories.length === 0) {
        // If no selected categories left, reset blogs to show all
        this.blogs = this.allBlogs;
        return;
      }
    }

    this.filterBlogs();
  }

  public filterBlogs(): void {
    this.blogs = this.allBlogs.filter(blog =>
      blog.categories.some(blogCategory =>
        this.selectedCategories.some(selectedCategory =>
          selectedCategory.id === blogCategory.id
        )
      )
    );
  }

  isCategoryClicked(category: any): boolean {
    return this.selectedCategories?.includes(category);
  }

   public getCategories(): void {
     this.blogService.getCategories().subscribe((res) => {
       this.categories = res.data;
     })
   }
}
