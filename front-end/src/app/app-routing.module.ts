import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from "./components/admin/main-page.component";
import { HttpClientModule } from '@angular/common/http';

import {ClientPageComponent} from "./components/main-page-client/client-page.component";
import {ChartPageComponent} from "./components/chart-page/chart-page.component";
import {ClientComponent} from "./components/client/client.component";

const routes: Routes = [
  { path: '', redirectTo: 'admin', pathMatch: 'full'},
  { path: 'admin', component: MainPageComponent },

];
const routes2: Routes = [
  { path: '', redirectTo: 'client', pathMatch: 'full'},
  { path: 'client', component: ClientPageComponent },
  { path: '', redirectTo: 'client/chart', pathMatch: 'full'},
  { path: 'client/chart', component: ChartPageComponent },
  { path: 'client', component: ClientComponent },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forRoot(routes2),
    HttpClientModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
