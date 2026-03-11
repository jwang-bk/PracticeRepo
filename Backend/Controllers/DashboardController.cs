using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    [HttpGet("summary")]
    public IActionResult GetSummary()
    {
        var username = User.Identity?.Name ?? "Unknown";
        var roles = User.Claims
            .Where(c => c.Type == System.Security.Claims.ClaimTypes.Role)
            .Select(c => c.Value)
            .ToList();

        return Ok(new
        {
            message = $"Welcome to the dashboard, {username}!",
            username,
            roles,
            serverTime = DateTime.UtcNow
        });
    }

    [HttpGet("admin-data")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetAdminData()
    {
        return Ok(new
        {
            message = "This is admin-only data.",
            secret = "Super secret admin information",
            users = new[]
            {
                new { id = 1, name = "Alice", role = "Admin" },
                new { id = 2, name = "Bob", role = "User" },
                new { id = 3, name = "Charlie", role = "User" }
            }
        });
    }

    [HttpGet("user-data")]
    [Authorize(Roles = "User,Admin")]
    public IActionResult GetUserData()
    {
        return Ok(new
        {
            message = "This is user data accessible by all authenticated users.",
            items = new[]
            {
                new { id = 1, title = "Task 1", completed = true },
                new { id = 2, title = "Task 2", completed = false },
                new { id = 3, title = "Task 3", completed = false }
            }
        });
    }
}
