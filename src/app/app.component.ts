import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonCalcModule } from './components/button-calc/button-calc.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonCalcModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'calculator';
  screen ='';

  opts = [7,8,9,`del`,4,5,6,` + `,1,2,3,` - `,`.`,0,` / `,` x `,];

  handleSelection(selectedOption: any) {
    switch (selectedOption) {
      case 'del':
        this.screen = this.screen.slice(0, -1);
        break;
      
      case '+':
      case '-':
      case 'x':
      case '/':
        this.oprtVerify(selectedOption); 
        break;
      default:
        this.screen += selectedOption;
        break;


    }
  }

  oprtVerify(opt: any){
    if(this.verifySize(this.screen)){
      if(!this.isOperator(this.screen)) {
        this.screen += ` ${opt}`
      }          
    }
  }

  verifySize(string: string){
    if(string.length === 0) return false;
    else return true;
  }

  isOperator(screen:string) {
    const lastChar = screen.trim().slice(-1);
    return [`+`,`-`,`/`,`x`].includes(lastChar)
  }

  reset() {
    this.screen = '';
  }
  calculate() {
    const tokens = this.tokenize(this.screen)
    if(tokens.length > 0){
      try{
        const result = this.evaluate(tokens);
        this.screen = result.toString();
      } catch (er) {
        this.screen = 'Error';
      }
    }
  }

  tokenize(expression: string): Array<string>{
    return expression.split(' ').filter(token => token.length > 0);
  }

  evaluate(tokens: Array<string>) {
    const stack: number[] = [];
    let i = 0;

    while (i < tokens.length) {
        const token = tokens[i];

        // Verifica se o token é um operador
        if (token === '+' || token === '-' || token === '/' || token === '*') {
            // Pega os dois últimos operandos da pilha
            const operand2 = stack.pop()!; // O segundo operando
            const operand1 = stack.pop()!; // O primeiro operando

            let result: number;

            // Realiza a operação com os operandos
            switch (token) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '/':
                    result = operand1 / operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
            }

            // Coloca o resultado de volta na pilha
            stack.push(result);
        } else {
            // Se não for um operador, converte o token para número e empilha
            stack.push(parseFloat(token));
        }

        i++;
    }

    // Retorna o resultado final, que deve ser o único valor na pilha
    return stack.pop()!;
}

}
