using Microsoft.AspNetCore.Mvc;
using Enums;
using DTOs;
using Services;
using System.Text.Json;


[ApiController]
[Route("api/[controller]")]
public class SalaryController : ControllerBase
{
    private readonly SalaryCalculatorService _calculatorService;

    public SalaryController()
    {
        _calculatorService = new SalaryCalculatorService();
    }

    [HttpPost("calculate")]
    public ActionResult<SalaryRequest> Calculate([FromBody] SalaryRequest request)
    {
        if (request.IsLawWorkBonusEligible && request.LawWorkGroup == null)
        {
            return BadRequest("Must specify LawWorkGroup if eligible for law work bonus.");
        }

        var result = _calculatorService.CalculateSalary(request);
        return Ok(result);
    }
}

