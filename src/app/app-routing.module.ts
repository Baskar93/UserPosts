import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { PublicpostsComponent } from './components/publicposts/publicposts.component';
import { RegisterComponent } from './components/register/register.component';
import { RouteGuard } from './Guard/route.guard';



const routes: Routes = [
  {path:"", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"publicpost", component:PublicpostsComponent},
  {path:"logged", canActivate:[RouteGuard], loadChildren:()=>import("./module2/lazyloading/lazyloading.module").then(m=>m.LazyloadingModule)},
  {path:"**", component:PagenotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
