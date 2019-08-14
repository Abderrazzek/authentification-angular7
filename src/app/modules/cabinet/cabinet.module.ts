import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './pages/cabinet/cabinet.component';

@NgModule({
  declarations: [CabinetComponent],
  imports: [
    CommonModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }
