import {Component, Input, OnInit, TemplateRef} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BlogsService} from "../../../blogs/blogs.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Input() showOnlyLogo = false;
  constructor(private dialog: MatDialog, private fb: FormBuilder, public blogsService: BlogsService) {
  }

  public isLoggedIn = false;
  public showEmailError = false;

  public authForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });
  public openDialog(authDialog: TemplateRef<void>): void {
    this.dialog.open(authDialog, {
      width: '480px',
    });
  }

  public ngOnInit() {
    if(localStorage.getItem('loggedIn')){
      this.isLoggedIn = true;
    }
    this.authForm.get('email')?.valueChanges.subscribe(() => {
      this.showEmailError = false;
    })
  }

  public submitForm(): void {
    this.blogsService.login(this.authForm.value).subscribe((res) => {
      localStorage.setItem('loggedIn', 'true');
      this.isLoggedIn = true;
    }, () => {
      this.showEmailError = true;
      this.authForm.get('email')?.setErrors({ 'invalidEmail': true });
    })
  }
}
