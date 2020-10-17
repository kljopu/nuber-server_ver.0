import bcrypt from "bcrypt";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { IsEmail } from "class-validator";
import Chat from "./Chat";
import Message from "./Message";
import Verification from "./Verification";
import Ride from "./Ride";

const BCRYPT_ROUNDS = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    type: "boolean",
    default: false,
  })
  verifiedEmail!: boolean;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text" })
  lastName!: string;

  @Column({ type: "int" }) age: number;

  @Column({ type: "text", nullable: true }) password: string;

  @Column({ type: "text", nullable: true }) phoneNumber: string;

  @Column({ type: "boolean", default: false }) verifiedPhoneNumber!: boolean;

  @Column({ type: "text", nullable: true }) kakaoId: string;

  @Column({ type: "text" }) profilePhoto: string;

  @Column({ type: "timestamp" }) createdAt!: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;

  @Column({ type: "boolean", default: false }) isDriving!: boolean;

  @Column({ type: "boolean", default: false }) isRiding!: boolean;

  @Column({ type: "boolean", default: false }) isTaken!: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @Column({ type: "boolean", default: false }) isSocial: boolean

  @ManyToOne((type) => Chat, (chat) => chat.participants)
  chat: Chat;

  @OneToMany((type) => Message, (message) => message.user)
  messages: Message[];

  @OneToMany((type) => Verification, (verification) => verification.user)
  verifications: Verification[];

  @OneToMany((type) => Ride, (ride) => ride.passenger)
  ridesAsPassenger: Ride[];

  @OneToMany((type) => Ride, (ride) => ride.driver)
  ridesAsDriver: Ride[];

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashPassword = await this.hashPassword(this.password);
      this.password = hashPassword;
    }
  }
}
