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
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserReq } from 'src/interfaces/interfaces';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatedUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getUsers(): Promise<UserReq[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserReq> {
    return await this.userService.getUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserReq> {
    return await this.userService.createUser(createUserDto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Body() updatedUserDto: UpdatedUserDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<UserReq> {
    return await this.userService.updateUser(updatedUserDto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<void> {
    return await this.userService.deleteUser(id);
  }
}
