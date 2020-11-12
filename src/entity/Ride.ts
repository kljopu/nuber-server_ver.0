import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate
} from "typeorm";
import { rideStatus } from "src/types/types";
import { User } from "./User";

//enum
const ACCEPTED = "ACCEPTED";
const FINISHED = "FINISHED";
const CANCLE = "CANCLE";
const REQUESTING = "REQUESTING";
const ONROUTE = "ONROUTE";
export enum RideStatus {
  ACCEPTED = "ACCEPTED",
  FINISHED = "FINISHED",
  CANCLE = "CANCLE",
  REQUESTING = "REQUESTING",
  ONROUTE = "ONROUTE",
}

@Entity()
export class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({
    type: "enum",
    enum: RideStatus,
  })
  status!: rideStatus;

  @Column({ type: "text" })
  pickUpAddress!: string;

  @Column({ type: "double precision", default: 0 })
  pickUpLat!: number;

  @Column({ type: "double precision", default: 0 })
  PickUpLng!: number;

  @Column({ type: "text" })
  dropOffAdress!: string;

  @Column({ type: "double precision", default: 0 })
  dropOffLat!: number;

  @Column({ type: "double precision", default: 0 })
  dropOffLng!: number;

  @Column({ type: "double precision", default: 0 })
  price!: number;

  @Column({ type: "text" })
  distance!: string;

  @Column({ type: "text" })
  duration!: string;

  @Column({ type: "timestamp" }) createdAt: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.ridesAsPassenger)
  passenger!: User;

  @ManyToOne((type) => User, (user) => user.ridesAsDriver)
  driver!: User;

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
