import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonCalcComponent } from './button-calc.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonCalcComponent],
  exports: [ButtonCalcComponent],
})
export class ButtonCalcModule {}
