import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {BlogsService} from "../blogs.service";
import {ActivatedRoute} from "@angular/router";
import {Blog} from "../../shared/interfaces/blog";

@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.scss'
})
export class BlogDetailComponent implements OnInit{
  public blog!: Blog;
  constructor(private blogService: BlogsService, private activatedRoute: ActivatedRoute) {
  }
  public ngOnInit() {
   this.getBlogById();
  }

  public getBlogById() {
    this.blogService.getBlogById(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.blog = res;
    })
  }

}
