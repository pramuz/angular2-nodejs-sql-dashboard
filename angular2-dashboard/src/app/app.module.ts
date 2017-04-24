import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule  } from '@angular/http';
import {MdButtonModule, MdCheckboxModule,MdSelectModule ,MaterialModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { AppRoutingModule,routingComponents} from './app.routing';
import { DialogComponent } from './app.dashboard.component';
import { HttpComponent } from './app.http.component';
import {DataTableModule} from "angular2-datatable";
import {DataFilterPipe} from "./data-filter.pipe";


import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BodyComponent,
    routingComponents,
    DialogComponent,
    HttpComponent,
    DataFilterPipe
  ],
  imports: [
    BrowserModule,AppRoutingModule,
    FormsModule,
    HttpModule,
    MdButtonModule, MdCheckboxModule,BrowserAnimationsModule,MdSelectModule,MaterialModule.forRoot(),DataTableModule
  ],
  providers: [],
  entryComponents: [DialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
