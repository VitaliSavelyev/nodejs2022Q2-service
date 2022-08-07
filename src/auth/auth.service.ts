import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { ConfigService } from '@nestjs/config';
import { UserReq } from '../interfaces/interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async signup(registerDto: AuthDto): Promise<UserReq> {
    return await this.userService.createUser({ ...registerDto });
  }

  async login(
    loginDto: AuthDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { login, password } = loginDto;

    const user = await this.userService.getUserByLogin(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    const payload = { login: user.login, userId: user.id };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });

    return { accessToken, refreshToken };
  }

  async refresh(
    gettingRefreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    if (!gettingRefreshToken) {
      throw new UnauthorizedException();
    }

    const tokenData = await this.jwtService.verifyAsync(gettingRefreshToken, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
    });

    const payload = { userId: tokenData.userId, login: tokenData.login };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      expiresIn: this.configService.get<string>('TOKEN_REFRESH_EXPIRE_TIME'),
    });
    return { accessToken, refreshToken };
  }
}
