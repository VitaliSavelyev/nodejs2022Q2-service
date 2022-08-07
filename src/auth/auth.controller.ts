import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { UserReq } from '../interfaces/interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  @HttpCode(201)
  async signup(@Body() registerDto: AuthDto): Promise<UserReq> {
    return await this.authService.signup(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() loginDto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  async refresh(
    @Body() { refreshToken }: { refreshToken: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.refresh(refreshToken);
  }
}
