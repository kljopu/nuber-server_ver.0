import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  ManyToMany,
  ManyToOne,
} from "typeorm";
import { verificationTarget } from "src/types/types";
import { User } from "./User";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target!: verificationTarget;

  @Column({ type: "text" })
  payload!: string;

  @Column({ type: "text" })
  key!: string;

  @Column({
    type: "boolean",
    default: false,
  })
  used: boolean;

  @Column({ type: "timestamp" }) createdAt!: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;

  @ManyToOne((type) => User, (user) => user.verifications)
  user!: User;

  @BeforeInsert()
  createKey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else {
      this.key = Math.random().toString(36).substr(2);
    }
  }
}

export default Verification;
