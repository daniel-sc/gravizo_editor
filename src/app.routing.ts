import { ModuleWithProviders } from '@angular/core';
import { Graph } from './graph';
import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: Graph }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
