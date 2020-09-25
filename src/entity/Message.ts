import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import Chat from "./Chat";
import { User } from "./User";

@Entity()
class Message extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @ManyToOne((type) => Chat, (chat) => chat.messages)
  chat!: Chat;

  @Column({ type: "text" })
  text!: string;

  @ManyToOne((type) => User, (user) => user.messages)
  user!: User;

  @Column({ type: "timestamp" })
  createdAt!: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;
}

export default Message;
