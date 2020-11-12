import * as bcrypt from "bcrypt";
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
import { Ride } from "./Ride";
import { Place } from "./Place"


const BCRYPT_ROUNDS = 10;

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({ type: "boolean", default: false, }) verifiedEmail!: boolean;

  @Column({ type: "boolean", default: false }) verifiedPhoneNumber!: boolean;

  @Column({ type: "text" })
  firstName!: string;

  @Column({ type: "text", nullable: true })
  lastName: string;

  @Column({ type: "int", nullable: true }) age: number;

  @Column({ type: "text", nullable: true }) password: string;

  @Column({ type: "text", nullable: true }) phoneNumber: string;

  @Column({ type: "text", nullable: true }) kakaoId: string;

  @Column({ type: "text", nullable: true }) profilePhoto: string;

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

  @Column({ type: "double", default: Math.floor(Math.random() * 1000000) })
  emailVerificationCode: number;

  @Column({ type: "double", default: Math.floor(Math.random() * 1000000) })
  phonelVerificationCode: number;

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

  @OneToMany((type) => Place, (place) => place.user)
  places: Place[];


  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  public comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
  public veriPass(password: string): boolean {
    return bcrypt.compare(password, this.password)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password) {
      const hashPassword = await this.hashPassword(this.password);
      this.password = hashPassword;
    }
  }
  get findByEmail(): string {
    return `${this.email} ${this.email}`;
  }

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
