import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AseguradosComponent } from './asegurados/asegurados.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConsultasComponent } from './consultas/consultas.component';

const routes: Routes = [
  { path:'', component: HomeComponent },
  { path:'asegurados', component: AseguradosComponent },
  { path:'consultas', component: ConsultasComponent }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forRoot(routes, {useHash: true})]
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
