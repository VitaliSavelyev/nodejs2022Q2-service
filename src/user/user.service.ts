import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserInt,
  UpdatePasswordInt,
  User,
  UserReq,
} from '../interfaces/interfaces';
import { v4 as uuidv4, validate } from 'uuid';

@Injectable()
export class UserService {
  public users = [];
  public async getUsers(): Promise<UserReq[]> {
    return this.users.map((user: User) => this.getUserReq(user));
  }

  public async getUserById(id: string): Promise<UserReq> {
    const idxUser = this.isUserAvailable(id);
    return this.getUserReq(this.users[idxUser]);
  }

  public async createUser(createUserDto: CreateUserInt): Promise<UserReq> {
    const createdUser: User = {
      id: uuidv4(),
      login: createUserDto.login,
      version: 1,
      createdAt: +Date.now(),
      updatedAt: +Date.now(),
      password: createUserDto.password,
    };
    this.users.push(createdUser);
    return this.getUserReq(createdUser);
  }

  public async updateUser(
    updateUserDto: UpdatePasswordInt,
    id: string,
  ): Promise<UserReq> {
    const idxUser = this.isUserAvailable(id);
    if (updateUserDto.oldPassword !== this.users[idxUser].password) {
      throw new HttpException('Старый пароль не верен', HttpStatus.FORBIDDEN);
    }
    const updatedUser: User = {
      ...this.users[idxUser],
      password: updateUserDto.newPassword,
      updatedAt: +Date.now(),
      version: this.users[idxUser].version + 1,
    };
    this.users[idxUser] = updatedUser;
    return this.getUserReq(updatedUser);
  }

  public async deleteUser(id: string): Promise<void> {
    const idxUser = this.isUserAvailable(id);
    this.users.splice(idxUser, 1);
  }

  private getUserReq(user: User): UserReq {
    const { login, id, version, createdAt, updatedAt } = user;
    return { login, id, version, createdAt, updatedAt };
  }

  private isUserAvailable(id: string): number {
    const idxUser = this.users.findIndex((user) => user.id === id);
    if (idxUser === -1) {
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    }
    return idxUser;
  }
}
