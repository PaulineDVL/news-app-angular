/*
Imports
*/
// Angular
import { Routes } from '@angular/router';
import { AuthGuard } from "./auth.guard";

//

/*
Export
*/
export const AppRouterModule: Routes = [
  {
    path: '',
    component: HomePageComponent,

  },
  {
    path: 'connected',
    component: ConnectedPageComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'bookmark',
    component: BookmarkPageComponent,
    canActivate: [AuthGuard]
  }
];
//

// Inner
import { HomePageComponent } from "./routes/home-page/home-page.component";
import { ConnectedPageComponent } from "./routes/connected-page/connected-page.component";
import { BookmarkPageComponent } from './routes/bookmark-page/bookmark-page.component';
