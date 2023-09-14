import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { SignupComponent } from './signup.component';
import { SignUpRoutingModule } from './signup-routing.module';
import { MatModule } from '../modules/mat.module';

@NgModule({
  declarations: [
    SignupComponent, 
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    SignUpRoutingModule,
    MatModule
  ],
  providers: []
})
export class SignUpModule {}
