import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-calc',
  templateUrl: './button-calc.component.html',
  // styles: [':host{display:contents}'], // Makes component host as if it was not there, can offer less css headaches. Use @HostBinding class approach for easier overrides.
})
export class ButtonCalcComponent {
  @Input() option: any;
  @Output() selected = new EventEmitter<any>();

  onSelect() {
    this.selected.emit(this.option); // Emite a opção quando o botão é clicado
  }
}
