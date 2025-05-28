import { Component } from '@angular/core';
import { SalaryCalculatorComponent } from "./component/salary-calculator/salary-calculator.component";

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [ SalaryCalculatorComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'salaryCalculatorClient';
}
