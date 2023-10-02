import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './register/register.component';
import { TicketComponent } from './ticket-list/ticket/ticket.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DestinationsInputComponent } from './destinations-input/destinations-input.component';
import { DestListComponent } from './destinations-input/dest-list/dest-list.component';
import { DatepickerComponent } from './destinations-input/datepicker/datepicker.component';
import { PassListComponent } from './pass-list/pass-list.component';
import { PassComponent } from './pass-list/pass/pass.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselComponent } from './carousel/carousel.component';
import { HeroComponent } from './hero/hero.component';
import { HomeComponent } from './home/home.component';
import { NotificationService } from 'src/services/notification.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../helpers/token.interceptor';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { BillingInfoComponent } from './billing-info/billing-info.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TicketComponent,
    RegisterComponent,
    TicketListComponent,
    CartComponent,
    LoginComponent,
    DestinationsInputComponent,
    DestListComponent,
    DatepickerComponent,
    PassListComponent,
    PassComponent,
    FooterComponent,
    CarouselComponent,
    HeroComponent,
    HomeComponent,
    UserProfileComponent,
    PersonalInfoComponent,
    BillingInfoComponent,
    ProfileComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, FontAwesomeModule],
  providers: [
    NotificationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
