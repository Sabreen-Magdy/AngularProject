import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/core/home/home.component';
import { ProductsComponent } from './components/core/products/products.component';
import { ProductDetailsComponent } from './components/core/product-details/product-details.component';
import { ProductFormComponent } from './components/core/product-form/product-form.component';
import { LoginComponent } from './components/core/login/login.component';
import { ContactsComponent } from './components/core/contacts/contacts.component';
import { NotfoundComponent } from './components/core/notfound/notfound.component';
import { authenticationGuard } from './services/authentication.guard';
import { RegisterComponent } from './components/core/register/register.component';

const routes: Routes = [
  {path:"" , redirectTo:"home", pathMatch:"full"},
  {path:"home" , component:HomeComponent},
  {path:"products" , component:ProductsComponent ,canActivate:[authenticationGuard]},
  {path:"products/details/:id" , component:ProductDetailsComponent,canActivate:[authenticationGuard]},
  {path:"products/add" , component:ProductFormComponent,canActivate:[authenticationGuard]},
  {path:"products/edit/:id" , component:ProductFormComponent,canActivate:[authenticationGuard]},
  {path:"login" , component:LoginComponent},
  {path:"register" , component:RegisterComponent},
  {path:"contacts" , component:ContactsComponent},
  {path:"**" , component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
