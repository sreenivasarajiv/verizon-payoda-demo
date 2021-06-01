import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { MaterialModule } from './material.module';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileInformationComponent } from './pages/create-profile/profile-information/profile-information.component';
import { ProfileConfigurationComponent } from './pages/create-profile/profile-configuration/profile-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    CreateProfileComponent,
    ProfileInformationComponent,
    ProfileConfigurationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
