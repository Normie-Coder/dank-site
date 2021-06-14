import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HelpSupportComponent } from './help-support/help-support.component';
import { AnalyticsComponent } from './home/analytics/analytics.component';
import { HomeComponent } from './home/home.component';
import { SettingComponent } from './home/settings/setting/setting.component';
import { TweetComponent } from './home/tweets/tweet/tweet.component';
import { UserComponent } from './home/users/user/user.component';
import { UsersComponent } from './home/users/users.component';
import { LoginComponent } from './login/login.component';



const routes: Routes = [
  {path : '', component:LoginComponent},
   {path : 'login', component:LoginComponent},
   {
     path: 'social/tweets',
     component: HomeComponent,

   },
   {
     path: 'social/tweets/:id',
     component: TweetComponent
   },
   {
     path:'help-support', component: HelpSupportComponent
   },
   {
    path:'social/setting', component:SettingComponent
   },
   {
     path: 'social/users', component: UsersComponent
   },
   {
    path: 'social/users/:id', component: UserComponent
   },
   {
     path: 'social/analytics', component:AnalyticsComponent
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
