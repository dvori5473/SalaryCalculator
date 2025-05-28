
using DTOs;
namespace Services;

public class SalaryCalculatorService
{
    private const decimal BeginnerHourlyRate = 100m;
    private const decimal ExperiencedHourlyRate = 120m;
    private const int HoursPerMonthFullTime = 170;
    private const decimal ManagementLevelHourlyBonus = 20m;

    public SalaryResult CalculateSalary(SalaryRequest request)
    {

        // חישוב שכר יסוד לשעה
        decimal hourlyBaseRate = request.JobLevel == JobLevel.Beginner ? BeginnerHourlyRate : ExperiencedHourlyRate;

        // הוספת תוספת ניהול לשעה
        hourlyBaseRate += (int)request.ManagementLevel * ManagementLevelHourlyBonus;

        // שכר יסוד לפי חלקיות משרה
        decimal baseSalary = hourlyBaseRate * HoursPerMonthFullTime * ((decimal)request.PartTime / 100m);

        // תוספת וותק באחוזים
        decimal seniorityBonusPercent = request.SeniorityYears * 1.25m;

        // סכום תוספת וותק
        decimal seniorityBonusAmount = baseSalary * (seniorityBonusPercent / 100m);

        // תוספת עבודה מתוקף חוק
        decimal lawWorkBonusAmount = 0m;
        if (request.IsLawWorkBonusEligible)
        {
            if (request.LawWorkGroup == WorkGroup.GroupA)
                lawWorkBonusAmount = baseSalary * 0.01m;
            else if (request.LawWorkGroup == WorkGroup.GroupB)
                lawWorkBonusAmount = baseSalary * 0.005m;
        }

        // שכר בסיס לפני העלאה
        decimal totalBaseSalary = baseSalary + seniorityBonusAmount + lawWorkBonusAmount;

        // שיעור העלאת שכר באחוזים לפי שכר בסיס
        decimal raisePercent = totalBaseSalary switch
        {
            <= 20000m => 1.5m,
            <= 30000m => 1.25m,
            _ => 1.0m
        };

        // תוספת של 0.1% לכל רמת ניהול
        raisePercent += (int)request.ManagementLevel * 0.1m;

        // סכום תוספת העלאה
        decimal raiseAmount = totalBaseSalary * (raisePercent / 100m);

        // שכר בסיס חדש לאחר העלאה
        decimal newBaseSalary = totalBaseSalary + raiseAmount;

        return new SalaryResult
        {
            BaseSalary = baseSalary,
            SeniorityBonusPercent = seniorityBonusPercent,
            SeniorityBonusAmount = seniorityBonusAmount,
            LawWorkBonusAmount = lawWorkBonusAmount,
            TotalBaseSalary = totalBaseSalary,
            RaisePercent = raisePercent,
            RaiseAmount = raiseAmount,
            NewBaseSalary = newBaseSalary
        };

    }
}
