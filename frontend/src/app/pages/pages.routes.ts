import { Routes } from '@angular/router';
import { Documentation } from './documentation/documentation';
// import { Crud } from './crud/crud';
import { Empty } from './empty/empty';
import { AiTableComponent } from './crud/crud-test';

export default [
    { path: 'documentation', component: Documentation },
    { path: 'crud', component: AiTableComponent },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
