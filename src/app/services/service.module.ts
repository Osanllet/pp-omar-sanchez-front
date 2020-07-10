import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    LoginService,
    UsersService
} from './service.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        LoginService,
        UsersService
    ],
    declarations: []
})
export class ServiceModule { }
