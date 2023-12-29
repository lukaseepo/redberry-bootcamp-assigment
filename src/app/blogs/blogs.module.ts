import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingComponent } from "./landing/landing.component";
import { RouterModule, Routes } from "@angular/router";
import {SharedModule} from "../shared/shared.module";

const routes: Routes = [{
  path: '',
  loadComponent: () => import('./landing/landing.component').then((m) => m.LandingComponent)
},{
  path: 'blog-add',
  loadComponent: () => import('./blog-add/blog-add.component').then((m) => m.BlogAddComponent)
}]

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class BlogsModule { }
