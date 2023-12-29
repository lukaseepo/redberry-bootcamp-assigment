import { NgModule } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    MatDialogModule, ReactiveFormsModule, CommonModule, RouterLink
  ],
  exports: [HeaderComponent, HttpClientModule, CommonModule, ReactiveFormsModule,RouterLink, NgSelectModule]
})
export class SharedModule { }
