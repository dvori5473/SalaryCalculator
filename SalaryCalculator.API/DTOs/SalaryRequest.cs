namespace DTOs;
using Enums;
public class SalaryRequest
{
    public PartTimePercentage PartTime { get; set; }
    public JobLevel JobLevel { get; set; }
    public ManagementLevel ManagementLevel { get; set; }
    public int SeniorityYears { get; set; }
    public bool IsLawWorkBonusEligible { get; set; }
    public WorkGroup? LawWorkGroup { get; set; } 
}
