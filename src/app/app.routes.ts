import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';

const APP_ROUTES: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'usuarios', component: UsersComponent },
    { path: '**', redirectTo: 'usuarios' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, { useHash: true });
