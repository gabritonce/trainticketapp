import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './pages/search/search.component';
import { TicketComponent } from './pages/tickets/tickets.component';
import { CommonModule } from '@angular/common';
export const routes: Routes = [
    {
        path:"",
        redirectTo:"home",
        pathMatch:"full"
    },
    {
        path:'home',
        component:HomeComponent
    },
    {
        path:'search/:fromStationId/:toStationId/:dateOfTravel',
        component:SearchComponent
    },
    {
    
            path: 'ticket/:passengerId',
            component: TicketComponent
          
    }
];
