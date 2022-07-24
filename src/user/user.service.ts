import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserInt,
  UpdatePasswordInt,
  User,
  UserReq,
} from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public users = [];
  public async getUsers(): Promise<UserReq[]> {
    const users = await this.userRepository.find();
    return users.map((user) => this.getUserReq(user));
  }

  public async getUserById(id: string): Promise<UserReq> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      return user.toResponse();
    } else {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }

  public async createUser(createUserDto: CreateUserInt): Promise<UserReq> {
    const newUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      version: 1,
      password: createUserDto.password,
    };
    const createdUser = await this.userRepository.create(newUser);
    console.log(createdUser);
    return (await this.userRepository.save(createdUser)).toResponse();
  }

  public async updateUser(
    updateUserDto: UpdatePasswordInt,
    id: string,
  ): Promise<UserReq> {
    const updatedUser = await this.userRepository.findOne({ where: { id } });
    if (updatedUser) {
      if (updateUserDto.oldPassword !== updatedUser.password) {
        throw new HttpException('Старый пароль не верен', HttpStatus.FORBIDDEN);
      }
      updatedUser.password = updateUserDto.newPassword;
      updatedUser.version = updatedUser.version + 1;
      return (await this.userRepository.save(updatedUser)).toResponse();
    } else {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }

  public async deleteUser(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
  }

  private getUserReq(user: UserEntity): UserReq {
    const { login, id, version, createdAt, updatedAt } = user;
    const chargeDateCreate = createdAt.getDate();
    const chargeDateUpdate = updatedAt.getDate();
    return {
      login,
      id,
      version,
      createdAt: chargeDateCreate,
      updatedAt: chargeDateUpdate,
    };
  }
}
