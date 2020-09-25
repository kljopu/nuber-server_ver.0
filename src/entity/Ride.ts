import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { rideStatus } from "src/types/types";

//enum
const ACCEPTED = "ACCEPTED";
const FINISHED = "FINISHED";
const CANCLE = "CANCLE";
const REQUESTING = "REQUESTING";
const ONROUTE = "ONROUTE";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({
    type: "text",
    enum: [ACCEPTED, FINISHED, CANCLE, REQUESTING, ONROUTE],
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
}

export default Ride;
