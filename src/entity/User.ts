import bcrypt from "bcrypt";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { IsEmail } from "class-validator";
import { createHash } from "crypto";

const BCRYPT_ROUNDS = 10;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsEmail()
  email: string;

  @Column({
    type: "boolean",
    default: false,
  })
  verifiedEmail: boolean;

  @Column({ type: "text" })
  firstName: string;

  @Column({ type: "text" })
  lastName: string;

  @Column({ type: "int" }) age: number;

  @Column({ type: "text" }) password: string;

  @Column({ type: "text" }) phoneNumber: string;

  @Column({ type: "boolean", default: false }) verifiedPhoneNumber: boolean;

  @Column({ type: "text" }) profilePhoto: string;

  @Column({ type: "timestamp" }) createdAt: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;

  @Column({ type: "boolean", default: false }) isDriving: boolean;

  @Column({ type: "boolean", default: false }) isRiding: boolean;

  @Column({ type: "boolean", default: false }) isTaken: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLng: number;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
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
