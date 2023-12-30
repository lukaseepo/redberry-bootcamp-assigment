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
  public blogsLoading = false;
  public currentIndex = 0;
  constructor(private blogService: BlogsService, private activatedRoute: ActivatedRoute, private router: Router) {}

  public ngOnInit() {
    this.getBlogById()
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
    this.getBlogs();
    this.blogService.getBlogById(this.activatedRoute.snapshot.params['id']).subscribe((res) => {
      this.blog = res;
    });
  }

  public getBlogs() {
    this.blogsLoading = true;
    this.blogService.getBlogs().subscribe((allBlogs) => {
      this.blogsLoading = false;
      this.currentIndex = 0;
      allBlogs.data = allBlogs.data.filter(blog => {
        const blogDate = new Date(Date.parse(blog.publish_date));
        const currentDate = new Date();
        if (!isNaN(blogDate.getTime())) {
          return blogDate <= currentDate && blog.id !== this.blog.id;
        } else {
          return false;
        }
      })

      allBlogs.data = allBlogs.data.filter(blog =>
        blog.categories.some(blogCategory =>
          this.blog.categories.some(selectedCategory =>
            selectedCategory.id === blogCategory.id
          )
        )
      );

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
