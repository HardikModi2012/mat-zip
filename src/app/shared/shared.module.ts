import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalculateAgePipe } from './pipe/calculateAge.pipe';

@NgModule({
  declarations : [CalculateAgePipe],
  imports: [
    CommonModule,    
  ],
  exports: [
    CalculateAgePipe
  ],
})
export class SharedModule { }
