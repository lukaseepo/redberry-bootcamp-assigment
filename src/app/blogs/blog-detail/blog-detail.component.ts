import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {BlogsService} from "../blogs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Blog} from "../../shared/interfaces/blog";
@Component({
  selector: 'app-blog-detail',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
})
export class BlogDetailComponent implements OnInit {
  public blog!: Blog;
  public blogs: Blog[][] = [];
  public currentIndex = 0;
  constructor(private blogService: BlogsService, private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    this.getBlogById();
    this.getBlogs();
  }

  public nextSlide(): void {
    if(this.currentIndex === this.blogs.length - 1) return;
    this.currentIndex++;
  }

  public previousSlide():void {
    if(this.currentIndex === 0) return;
    this.currentIndex--;
  }

  public getBlogById() {
    this.blogService.getBlogById(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.blog = res;
    });
  }

  public getBlogs() {
    this.blogService.getBlogs().subscribe((allBlogs) => {
      this.blogs = this.groupBlogsByCategory(allBlogs.data);
    });
  }

  private groupBlogsByCategory(blogs: any[]): any[][] {
    const groupedBlogs = [];
    let currentGroup: any[] = [];

    blogs.forEach(blog => {
      currentGroup.push(blog);

      if (currentGroup.length === 3) {
        groupedBlogs.push([...currentGroup]);
        currentGroup = [];
      }
    });

    if (currentGroup.length > 0) {
      groupedBlogs.push([...currentGroup]);
    }

    return groupedBlogs;
  }

  public navigateToBlogDetail(id: number): void {
    this.router.navigate([`/blogs/blog-detail/${id}`]).then(() => this.getBlogById());
    window.scroll(0,0);
  }

}
