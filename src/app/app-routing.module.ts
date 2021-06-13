import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './principal/home/home.component';
import { ListComponent } from './principal/list/list.component';

const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'list', component: ListComponent },
  { path: '**', redirectTo: '' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
