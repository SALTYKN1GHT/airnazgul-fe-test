import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CartComponent } from './cart/cart.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { PassListComponent } from './pass-list/pass-list.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/helpers/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'userprofile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'ticket-list', component: TicketListComponent },
  { path: 'pass-list', component: PassListComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
