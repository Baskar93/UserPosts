import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyloadingRoutingModule } from './lazyloading-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllpostsComponent } from 'src/app/afterlogincomponents/allposts/allposts.component';
import { NewpostComponent } from 'src/app/afterlogincomponents/newpost/newpost.component';


@NgModule({
  declarations: [
    AllpostsComponent,
    NewpostComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LazyloadingRoutingModule
  ]
})
export class LazyloadingModule { }
