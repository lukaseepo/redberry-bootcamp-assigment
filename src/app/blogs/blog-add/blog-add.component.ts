import {Component, OnInit} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogsService} from "../blogs.service";
import {Category} from "../../shared/interfaces/category";
import {Router} from "@angular/router";

@Component({
  selector: 'app-blog-add',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss'
})
export class BlogAddComponent implements OnInit{
  public imageToUpload = localStorage.getItem('image') ? localStorage.getItem('image') : '';
  public imageUploaded = !!localStorage.getItem('image');
  public imageName = '';
  public categories!: Category[];
  public savedData = localStorage.getItem('savedData') ? JSON.parse(localStorage.getItem('savedData') ?? '') : '';
  public blogForm: FormGroup = this.fb.group({
    title: [this.savedData.title ? this.savedData.title : '', [Validators.required, this.countCharsValidator(2)]],
    description: [this.savedData.description ? this.savedData.description : '', [Validators.required, this.countCharsValidator(2)]],
    author: [this.savedData.author ? this.savedData.author : '', [Validators.required, this.countCharsValidator(4), this.georgianTwoWordsValidator, Validators.pattern(/^[\u10A0-\u10FF\s]+$/)]],
    publish_date: [this.savedData.publish_date ? this.savedData.publish_date : '', [Validators.required, Validators.pattern(/^(0[1-9]|[12][0-9]|3[01])[-./](0[1-9]|1[0-2])[-./]\d{4}$/)]],
    categories: [this.savedData.categories ? this.savedData.categories : '', [Validators.required]],
    email: [this.savedData.email ? this.savedData.email : '', [Validators.required, Validators.email, Validators.pattern(/.*@redberry\.ge$/)]],
  })

  private georgianTwoWordsValidator(control: FormControl) {
    const value = control.value;

    const words = value.trim().split(' ');
    if (words.length !== 2) {
      return { invalidWordCount: true };
    }

    return null;
  }

  public countCharsValidator(minCharCount: number) {
    return (control: FormControl) => {
      const value = control.value;
      const chars = value.trim().split(' ').join('');

      if (chars.length < minCharCount) {
        return { invalidCharCount: true };
      }

      return null;
    };
  }


  public ngOnInit() {
    this.blogForm.valueChanges.subscribe((v) => {

      localStorage.setItem('savedData', JSON.stringify(v));
    })
    this.getCategories();
  }

  constructor(private fb: FormBuilder, private blogService: BlogsService, private router: Router) {
  }

  public handleFileInput(event:any) {
    this.imageToUpload = event.target.files[0];
    this.imageName = event.target.files[0].name;
    this.imageUploaded = true;
  }

  public getCategories() {
    this.blogService.getCategories().subscribe((res) => {
      this.categories = res.data;
    })
  }

  public addNewBlog(): void {
    if(this.blogForm.invalid){
      this.blogForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    const savedValue = this.blogForm.get('categories')?.value;
    this.blogForm.get('categories')?.setValue(JSON.stringify(this.blogForm.get('categories')?.value))
    for (const controlName of Object.keys(this.blogForm.controls)) {
      if(controlName === 'image') continue;
      formData.append(controlName, this.blogForm.get(controlName)?.value);
    }
    this.blogForm.get('categories')?.setValue(savedValue);
    formData.append('image', this.imageToUpload as string);
    this.blogService.addNewBlog(formData).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
