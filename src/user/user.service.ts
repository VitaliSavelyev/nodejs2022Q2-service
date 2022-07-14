import { Injectable } from '@nestjs/common';
import {
  CreateUserDto,
  UpdatePasswordDto,
  User,
  UserReq,
} from '../interfaces/interfaces';

@Injectable()
export class UserService {
  public users = [];
  public async getUsers(): Promise<UserReq[]> {
    return this.users.map((user: User) => this.getUserReq(user));
  }

  public async getUserById(id: string): Promise<UserReq> {
    const user: User | undefined = this.users.find(
      (user: User) => user.id === id,
    );
    return this.getUserReq(user);
  }

  public async createUser(createUserDto: CreateUserDto): Promise<UserReq> {
    const createdUser: User = {
      id: '',
      login: createUserDto.login,
      version: 1,
      createdAt: new Date().getDate(),
      updatedAt: new Date().getDate(),
      password: createUserDto.password,
    };
    this.users.push(createdUser);
    return this.getUserReq(createdUser);
  }

  public async updateUser(
    updateUserDto: UpdatePasswordDto,
    id: string,
  ): Promise<UserReq> {
    if (!this.users.some((user: User) => user.id === id)) {
      return null;
    }
    const idxUser = this.users.findIndex((user) => user.id === id);
    const updatedUser: User = {
      ...this.users[idxUser],
      password: updateUserDto.newPassword,
      updatedAt: new Date().getDate(),
      version: this.users[idxUser].version++,
    };
    this.users.push(updatedUser);
    return this.getUserReq(updatedUser);
  }

  public async deleteUser(id: string): Promise<void> {
    let deletedUser: User | null = null;
    this.users = this.users.filter((user: User) => {
      if (user.id === id) {
        deletedUser = user;
      }
      return user.id !== id;
    });
  }

  private getUserReq(user: User): UserReq {
    const { login, id, version, createdAt, updatedAt } = user;
    return { login, id, version, createdAt, updatedAt };
  }
}
