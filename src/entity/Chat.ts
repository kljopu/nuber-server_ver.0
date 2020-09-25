import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import Message from "./Message";
import { User } from "./User";

@Entity()
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn() id!: number;

  @OneToMany((type) => Message, (message) => message.chat)
  messages: Message[];

  @OneToMany((type) => User, (user) => user.chat)
  participants: User[];

  @Column({ type: "timestamp" }) createdAt!: Date;

  @Column({ type: "timestamp" }) updatedAt: Date;
}

export default Chat;
