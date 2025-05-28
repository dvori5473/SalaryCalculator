import { JobLevel } from "../enums/job-level.enum";
import { ManagementLevel } from "../enums/management-level.enum";
import { PartTimePercentage } from "../enums/part-time-percentage.enum";
import { WorkGroup } from "../enums/work-group.enum";




export interface SalaryRequest {
  PartTime: PartTimePercentage|null;
  JobLevel: JobLevel|null;
  ManagementLevel: ManagementLevel|null;
  SeniorityYears: number|null;
  IsLawWorkBonusEligible: boolean|null;
  LawWorkGroup?: WorkGroup|null;
}