import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column()
  version: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toResponse(): {
    id: string;
    login: string;
    createdAt: number;
    updatedAt: number;
    version: number;
  } {
    const { id, login, createdAt, version, updatedAt } = this;
    const chargeDateCreate = createdAt.getMilliseconds();
    const chargeDateUpdate = updatedAt.getMilliseconds();
    return {
      id,
      login,
      createdAt: chargeDateCreate,
      version,
      updatedAt: chargeDateUpdate,
    };
  }
}
