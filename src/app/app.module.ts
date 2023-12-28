import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import {RouterModule, Routes} from "@angular/router";



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
    CommonModule,
    SharedModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
