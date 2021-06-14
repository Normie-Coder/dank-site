import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.components';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { TweetsComponent } from './home/tweets/tweets.component';
import { FooterComponent } from './footer/footer.component';
import { TweetComponent } from './home/tweets/tweet/tweet.component';
import {MatMenuModule, MatButtonModule, MatSliderModule} from '@angular/material'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingComponent } from './home/settings/setting/setting.component';
import { HelpSupportComponent } from './help-support/help-support.component';
import { UsersComponent } from './home/users/users.component';
import { AlertComponent } from './shared/alert/alert.component';
import { UserComponent } from './home/users/user/user.component';
import { AnalyticsComponent } from './home/analytics/analytics.component';
//import { Ng2GoogleChartsModule } from 'ng2-google-charts';
//import { NgxEchartsModule } from 'ngx-echarts';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    LoadingSpinnerComponent,
    TweetsComponent,
    FooterComponent,
    TweetComponent,
    UsersComponent,
    HelpSupportComponent,
    SettingComponent,
    AlertComponent,
    UserComponent,
    AnalyticsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    MatMenuModule,
    MatButtonModule,
    MatSliderModule,
    BrowserAnimationsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
