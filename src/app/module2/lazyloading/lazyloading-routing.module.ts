import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllpostsComponent } from 'src/app/afterlogincomponents/allposts/allposts.component';
import { NewpostComponent } from 'src/app/afterlogincomponents/newpost/newpost.component';




const routes: Routes = [
  {path:"", children:[
  {path:"newpost", component:NewpostComponent},
  {path:"allpost", component:AllpostsComponent},
  
 ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LazyloadingRoutingModule { }
