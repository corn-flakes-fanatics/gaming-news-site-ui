import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './compontents/registration/registration.component';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastContainerModule, ToastrModule } from "ngx-toastr";

@NgModule({
    declarations: [
        AppComponent,
        RegistrationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        ToastrModule.forRoot({preventDuplicates: true, timeOut: 10000, positionClass: 'inline'}),
        ToastContainerModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
