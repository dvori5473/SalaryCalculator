import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, CurrencyPipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { SalaryRequest } from '../../models/salary-request.model';
import { WorkGroup } from '../../enums/work-group.enum';
import { ManagementLevel } from '../../enums/management-level.enum';
import { JobLevel } from '../../enums/job-level.enum';
import { PartTimePercentage } from '../../enums/part-time-percentage.enum';
import { SalaryResult } from '../../models/salary-result.model';
import { SalaryService } from '../../services/salary.service';

@Component({
  selector: 'app-salary-calculator',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    CurrencyPipe,
    CardModule,
    DropdownModule,
    InputNumberModule,
    RadioButtonModule,
    ButtonModule,
    SelectModule,
    TableModule
  ],
  templateUrl: './salary-calculator.component.html',
  styleUrls: ['./salary-calculator.component.css']
})
export class SalaryCalculatorComponent {
  request: SalaryRequest = {
    PartTime: null,
    JobLevel: null,
    ManagementLevel: null,
    SeniorityYears: 0,
    IsLawWorkBonusEligible: null
  };

  result?: SalaryResult;
  showResult = false;

  partTimeOptions = [
    { label: '100%', value: PartTimePercentage.Full },
    { label: '75%', value: PartTimePercentage.SeventyFive },
    { label: '50%', value: PartTimePercentage.Fifty }
  ];

  jobLevelOptions = [
    { label: 'מתחיל', value: JobLevel.Beginner },
    { label: 'מנוסה', value: JobLevel.Experienced }
  ];

  managementLevelOptions = [
    { label: 'ללא', value: ManagementLevel.None },
    { label: 'רמה 1', value: ManagementLevel.Level1 },
    { label: 'רמה 2', value: ManagementLevel.Level2 },
    { label: 'רמה 3', value: ManagementLevel.Level3 },
    { label: 'רמה 4', value: ManagementLevel.Level4 },
  ];

  lawWorkGroupOptions = [
    { label: 'קבוצה א׳', value: WorkGroup.GroupA },
    { label: 'קבוצה ב׳', value: WorkGroup.GroupB }
  ];

  constructor(private salaryService: SalaryService) {}

  calculateSalary(): void {
     this.salaryService.calculateSalary(this.request).subscribe(result => {
      this.result = result;
      this.showResult = true;
    });
  }

  edit(): void {
    this.showResult = false;
  }
}
