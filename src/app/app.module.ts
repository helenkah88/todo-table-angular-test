import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import { EditComponent } from './components/edit/edit.component';
import { LoginComponent } from './components/login/login.component';
import { ApiComponent } from './shared/services/api/api.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoTableComponent,
    EditComponent,
    LoginComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
