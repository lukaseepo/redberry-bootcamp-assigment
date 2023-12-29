import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [{
  path: '',
  pathMatch: "full",
  redirectTo: 'blogs'
},{
  path: 'blogs',
  loadChildren: () => import('./blogs/blogs.module').then(m => m.BlogsModule)
}]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
