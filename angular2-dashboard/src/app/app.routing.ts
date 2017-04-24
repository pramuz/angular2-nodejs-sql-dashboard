import { NgModule } from '@angular/core';
import { Routes,RouterModule } from '@angular/router';
import { DashboardComponent } from './app.dashboard.component';
import { Dashboard2Component } from './app.dashboard2.component';

const routes: Routes = [
    {path:'', pathMatch:'full', redirectTo:'dashboard'},
    {path:'dashboard', component:DashboardComponent},
    {path:'dashboard2', component:Dashboard2Component}
];


@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRoutingModule {}

export const routingComponents =[DashboardComponent,Dashboard2Component]