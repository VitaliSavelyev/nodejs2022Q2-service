import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  UserReq,
} from 'src/interfaces/interfaces';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('user')
  @HttpCode(HttpStatus.OK)
  getUsers(): Promise<UserReq[]> {
    return this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getUser(@Param('id') id: string): Promise<UserReq> {
    return this.userService.getUserById(id);
  }

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserReq> {
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(
    @Body() upadteUserDto: UpdatePasswordDto,
    @Param('id') id: string,
  ): Promise<UserReq> {
    return this.userService.updateUser(upadteUserDto, id);
  }

  @Delete('id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
