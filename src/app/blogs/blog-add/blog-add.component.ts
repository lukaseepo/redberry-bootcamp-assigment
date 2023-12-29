import {Component, OnInit, TemplateRef} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BlogsService} from "../blogs.service";
import {Category} from "../../shared/interfaces/category";
import {Router} from "@angular/router";
import {MatDialog, MatDialogClose} from "@angular/material/dialog";

@Component({
  selector: 'app-blog-add',
  standalone: true,
  imports: [SharedModule, MatDialogClose],
  templateUrl: './blog-add.component.html',
  styleUrl: './blog-add.component.scss'
})
export class BlogAddComponent implements OnInit{
  public imageToUpload = '';
  public imageUploaded = false;
  public imageName = '';
  public categories!: Category[];
  public savedData = localStorage.getItem('savedData') ? JSON.parse(localStorage.getItem('savedData') ?? '') : '';
  public blogForm: FormGroup = this.fb.group({
    title: [this.savedData.title ? this.savedData.title : '', [Validators.required, this.minLengthValidator(2)]],
    description: [this.savedData.description ? this.savedData.description : '', [Validators.required, this.minLengthValidator(2)]],
    author: [this.savedData.author ? this.savedData.author : '', [Validators.required, this.minLengthValidator(4), this.georgianTwoWordsValidator, Validators.pattern(/^[\u10A0-\u10FF\s]+$/)]],
    publish_date: [this.savedData.publish_date ? this.savedData.publish_date : '', [Validators.required, Validators.pattern(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/)]],
    categories: [this.savedData.categories ? this.savedData.categories : '', [Validators.required]],
    email: [this.savedData.email ? this.savedData.email : '', [Validators.required, Validators.email, Validators.pattern(/.*@redberry\.ge$/)]],
  })

  private georgianTwoWordsValidator(control: FormControl) {
    const value = control.value;

    const words = value?.trim().split(' ');
    if (words?.length !== 2) {
      return { invalidWordCount: true };
    }

    return null;
  }

  public minLengthValidator(minLength: number) {
    return (control: FormControl) => {
      const value = control.value;
      const strippedValue = value ? value.replace(/<[^>]*>|[\s&;nbsp;]/g, '') : '';
      if (strippedValue?.length < minLength) {
        return {minLengthError: true};
      }
      return null;
    }
  };

  public modules = {
    clipboard: {
      matchVisual: false,
      allowed: {
        tags: ['a', 'b', 'strong', 'p', 'br'],
        attributes: ['href', 'rel', 'target', 'class'],
      },
      substituteBlockElements: true,
      magicPasteLinks: true,
    },
  };


  public ngOnInit() {
    this.blogForm.valueChanges.subscribe((v) => {

      localStorage.setItem('savedData', JSON.stringify(v));
    })
    this.getCategories();
  }

  constructor(private fb: FormBuilder, private blogService: BlogsService, private router: Router, private dialog: MatDialog) {
  }

  public handleFileInput(event:any) {
    if(+(event.target.files[0].size / (1024*1024)).toFixed(2) > 1){
      return;
    }
    this.imageToUpload = event.target.files[0];
    this.imageName = event.target.files[0].name;
    this.imageUploaded = true;
  }

  public getCategories() {
    this.blogService.getCategories().subscribe((res) => {
      this.categories = res.data;
    })
  }

  public addNewBlog(dialog: TemplateRef<void>): void {
    if(this.blogForm.invalid){
      this.blogForm.markAllAsTouched();
      return;
    }
    const formData = new FormData();
    let categoriesToSend = JSON.stringify(this.blogForm.get('categories')?.value);
    for (const controlName of Object.keys(this.blogForm.controls)) {
      if(controlName === 'image') continue;
      formData.append(controlName, this.blogForm.get(controlName)?.value);
    }
    formData.append('image', this.imageToUpload as string);
    formData.append('categories', categoriesToSend);
    this.blogService.addNewBlog(formData).subscribe(() => {
      localStorage.removeItem('savedData');
      this.imageToUpload = '';
      this.blogForm.reset();
      this.imageUploaded = false;
      this.dialog.open(dialog, {
        width: '480px'
      })
    });
  }
}
