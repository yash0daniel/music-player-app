import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [
        MatCardModule,
        MatIconModule, 
        MatProgressBarModule,
    ],
    exports: [
        MatCardModule,
        MatIconModule,
        MatProgressBarModule,
    ]
})

export class AangularMaterial { }
