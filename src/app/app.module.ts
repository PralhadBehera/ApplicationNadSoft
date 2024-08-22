import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { TestComponent } from './test/test.component';
import { TableComponent } from './table/table.component'; 
import { FormsModule } from '@angular/forms';
import { AddMemberComponent } from './add-member/add-member.component';
@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    TableComponent,
    AddMemberComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
