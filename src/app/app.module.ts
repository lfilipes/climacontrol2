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
import { DataService } from './core/data-service.service'; 
import { FormsModule } from '@angular/forms';
import { DevicesComponent } from './pages/devices/devices.component';
import { FilterPipe } from './core/filter-pipe';
import { DashComponent } from './pages/dash/dash.component';
import { ControlComponent } from './pages/control/control.component'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DevicesComponent,
    FilterPipe,
    DashComponent,
    ControlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule
  ],
  providers: [
    Title,
    ApiService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
