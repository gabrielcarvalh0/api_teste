import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity("admin")
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { eager: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  user: User;

  @Column()
  email: string;
}
