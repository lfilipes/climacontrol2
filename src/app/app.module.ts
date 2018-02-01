import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './core/api.service';
import { AuthserviceService } from './core/authservice.service';
import { DataService } from './core/data-service.service'; 
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './pages/devices/devices.component';
import { FilterPipe } from './core/filter-pipe';
import { NgxGaugeModule } from 'ngx-gauge';
import { DashComponent } from './pages/dash/dash.component';
import { ControlComponent } from './pages/control/control.component'; 
import { ChartsModule } from 'ng2-charts';
import { ChartsComponent } from './pages/charts/charts.component';
import { LoginComponent } from './pages/login/login.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { ChartdevComponent } from './pages/chartdev/chartdev.component';
import { LastReadDashComponent } from './pages/last-read-dash/last-read-dash.component';
import { PushlastdataComponent } from './pages/pushlastdata/pushlastdata.component';
import { PushdataComponent } from './pages/pushdata/pushdata.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DevicesComponent,
    FilterPipe,
    DashComponent,
    ControlComponent,
    ChartsComponent,
    LoginComponent,
    AssetsComponent,
    ChartdevComponent,
    LastReadDashComponent,
    PushlastdataComponent,
    PushdataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgxGaugeModule,
    FormsModule,
    ChartsModule
  ],
  providers: [
    Title,
    ApiService,
    DataService,
    AuthserviceService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
