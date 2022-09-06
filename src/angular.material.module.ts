import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button'; 

@NgModule({
    imports: [
        MatCardModule,
        MatIconModule, 
        MatProgressBarModule,
        MatButtonModule,
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,
        MatButtonModule,
    ]
})

export class AangularMaterial { }
