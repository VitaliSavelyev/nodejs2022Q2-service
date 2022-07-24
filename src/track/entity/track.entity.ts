import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ArtistEntity } from '../../artist/entity/artist.entity';
import { AlbumEntity } from '../../album/entity/album.entity';

@Entity({ name: 'tracks' })
export class TrackEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  duration: number;

  @ManyToOne(() => ArtistEntity, (artist) => artist.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artistId: string | null = null;

  @ManyToOne(() => AlbumEntity, (album) => album.id, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'albumId' })
  albumId: string | null = null;

  toResponse(): {
    id: string;
    name: string;
    duration: number;
    artistId: string | null;
    albumId: string | null;
  } {
    const { id, name, duration, artistId, albumId } = this;
    return { id, name, duration, artistId, albumId };
  }
}
