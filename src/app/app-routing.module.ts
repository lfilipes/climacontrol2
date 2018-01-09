import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DashComponent } from './pages/dash/dash.component';
import { ControlComponent } from './pages/control/control.component'; 
import { ChartsComponent } from './pages/charts/charts.component'; 


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'dash',
    component: DashComponent
  },
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'charts',
    component: ChartsComponent
  },
  {
    path: 'devices' , 
    component: DevicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
