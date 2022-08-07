import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'artists' })
export class ArtistEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;

  toResponse(): { id: string; name: string; grammy: boolean } {
    const { id, name, grammy } = this;
    return { id, name, grammy };
  }
}
