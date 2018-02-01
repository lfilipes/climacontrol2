import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DevicesComponent } from './pages/devices/devices.component';
import { DashComponent } from './pages/dash/dash.component';
import { ControlComponent } from './pages/control/control.component'; 
import { ChartsComponent } from './pages/charts/charts.component'; 
import { LoginComponent } from './pages/login/login.component'; 
import { AssetsComponent } from './pages/assets/assets.component'; 
import { ChartdevComponent } from './pages/chartdev/chartdev.component'; 
import { LastReadDashComponent } from './pages/last-read-dash/last-read-dash.component';
import { PushlastdataComponent } from './pages/pushlastdata/pushlastdata.component'; 
import { PushdataComponent } from './pages/pushdata/pushdata.component'; 


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'assets',
    component: AssetsComponent
  },
  {
    path: 'lastdash',
    component: LastReadDashComponent
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
    path: 'chartdev',
    component: ChartdevComponent
  },
  {
    path: 'pushlastdata',
    component: PushlastdataComponent
  },
  {
    path: 'pushdata',
    component: PushdataComponent
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
