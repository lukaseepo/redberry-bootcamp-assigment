import { NgModule } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [HeaderComponent],
  imports: [

  ],
  exports: [HeaderComponent, BrowserModule, HttpClientModule
  ]
})
export class SharedModule { }
