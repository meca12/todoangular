import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';
import { LabsComponent } from './pages/labs/labs.component';
import { Routes } from '@angular/router';
export const routes: Routes = [
    {
        path: "", 
         component:HomeComponent
        
    },
  
    {
        path: "laboratorio", 
        component:LabsComponent
    }
    
];
