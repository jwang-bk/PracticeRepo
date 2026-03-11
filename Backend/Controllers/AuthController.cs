using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly UserManager<IdentityUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly TokenService _tokenService;

    public AuthController(
        UserManager<IdentityUser> userManager,
        RoleManager<IdentityRole> roleManager,
        TokenService tokenService)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _tokenService = tokenService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        var existingUser = await _userManager.FindByNameAsync(request.Username);
        if (existingUser != null)
            return BadRequest(new { message = "Username already exists." });

        var user = new IdentityUser
        {
            UserName = request.Username,
            Email = request.Email
        };

        var result = await _userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        var role = request.Role is "Admin" or "User" ? request.Role : "User";

        if (!await _roleManager.RoleExistsAsync(role))
            await _roleManager.CreateAsync(new IdentityRole(role));

        await _userManager.AddToRoleAsync(user, role);

        var roles = await _userManager.GetRolesAsync(user);
        var token = _tokenService.GenerateToken(user, roles);

        return Ok(new AuthResponse
        {
            Token = token,
            Username = user.UserName!,
            Email = user.Email ?? string.Empty,
            Roles = roles,
            Expiration = DateTime.UtcNow.AddHours(1)
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        var user = await _userManager.FindByNameAsync(request.Username);
        if (user == null || !await _userManager.CheckPasswordAsync(user, request.Password))
            return Unauthorized(new { message = "Invalid username or password." });

        var roles = await _userManager.GetRolesAsync(user);
        var token = _tokenService.GenerateToken(user, roles);

        return Ok(new AuthResponse
        {
            Token = token,
            Username = user.UserName!,
            Email = user.Email ?? string.Empty,
            Roles = roles,
            Expiration = DateTime.UtcNow.AddHours(1)
        });
    }
}
