import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


// Router
import { RouterModule } from "@angular/router"
import { AppRouterModule } from "./app.router";
import { AuthGuard } from "./auth.guard";
import { AppComponent } from './app.component';

//Routes
import { HomePageComponent } from './routes/home-page/home-page.component';
import { ConnectedPageComponent } from './routes/connected-page/connected-page.component';
import { BookmarkPageComponent } from './routes/bookmark-page/bookmark-page.component';


//Services
import { CrudService } from "./services/crud/crud.service";
import { AuthService } from './services/auth/auth.service';


//Shared
import { HeaderComponent } from './shared/header/header.component';
import { FormLoginComponent } from './shared/form-login/form-login.component';
import { ItemPostComponent } from './shared/item-post/item-post.component';
import { RegisterFormComponent } from './shared/register-form/register-form.component';
import { SearchSourceFormComponent } from './shared/search-source-form/search-source-form.component';
import { ItemSourceComponent } from './shared/item-source/item-source.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ConnectedPageComponent,
    HeaderComponent,
    FormLoginComponent,
    ItemPostComponent,
    RegisterFormComponent,
    SearchSourceFormComponent,
    BookmarkPageComponent,
    ItemSourceComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot( AppRouterModule, { onSameUrlNavigation: 'reload' } ),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    CrudService,
    AuthService
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
