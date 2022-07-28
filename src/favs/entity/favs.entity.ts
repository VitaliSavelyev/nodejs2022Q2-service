import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favs' })
export class FavsEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('simple-array')
  tracksIds: string[];

  @Column('simple-array')
  artistsIds: string[];

  @Column('simple-array')
  albumsIds: string[];
}
