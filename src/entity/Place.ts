import {
  BaseEntity, Column, Entity, PrimaryGeneratedColumn, ManyToOne, BeforeInsert, BeforeUpdate, RelationId
} from "typeorm";
import { User } from "./User"

@Entity()
export class Place extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: "text" })
  name!: string;

  @Column({ type: "double precision", default: 0 })
  lat!: number;

  @Column({ type: "double precision", default: 0 })
  lng!: number;

  @Column({ type: "text" })
  address!: string;

  @Column({ type: "boolean", default: false })
  isFavorite!: boolean;

  @ManyToOne((type) => User, (user) => user.places)
  user!: User;

  @RelationId((place: Place) => place.user)
  userId: number;

  @Column({ type: "timestamp" }) createdAt!: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;

  @BeforeInsert()
  dateCreation() {
    this.createdAt = new Date()
    this.updatedAt = new Date()
  }

  @BeforeUpdate()
  updateDateCreation() {
    this.updatedAt = new Date()
  }
}
