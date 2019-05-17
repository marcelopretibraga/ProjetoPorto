import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerComponent } from './cadastros/container/container.component';

const routes: Routes = [
  {path: 'container', component: ContainerComponent}
  //{path: '', redirectTo: 'home'},
  //{path: '**', component: PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
