import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedMaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddContactComponent } from './pages/contact-list/add-contact/add-contact.component';
import { ViewDetailsComponent } from './pages/contact-list/view-details/view-details.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ContactsDbService } from './utils/contacts-db/contacts-db.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ViewDetailsComponent,
    AddContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(ContactsDbService),
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
