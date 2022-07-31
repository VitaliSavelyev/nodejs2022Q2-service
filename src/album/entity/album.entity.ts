import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entity/artist.entity';

@Entity({ name: 'albums' })
export class AlbumEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null = null;

  toResponse(): {
    id: string;
    name: string;
    year: number;
    artistId: string | null;
  } {
    const { id, name, year, artistId } = this;
    return { id, name, year, artistId };
  }
}
