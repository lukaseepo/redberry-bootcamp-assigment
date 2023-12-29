import { NgModule } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";
import {QuillModule} from "ngx-quill";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    MatDialogModule, ReactiveFormsModule, CommonModule, RouterLink, FormsModule
  ],
  exports: [HeaderComponent, HttpClientModule, CommonModule, ReactiveFormsModule, RouterLink, NgSelectModule, QuillModule]
})
export class SharedModule { }
