import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  OneToMany,
  CreateDateColumn,
} from "typeorm";
import { Admin } from "./Admin";
import { Profile } from "./Profile";
import { Projects } from "./Projects";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({type: "text"})
  passwordResetToken: string;

  @CreateDateColumn({type: "text"})
  passwordResetExpires: Date;

  @Column({type: "text"})
  emailResetToken: string;

  @CreateDateColumn({type: "text"})
  emailResetExpires: Date;

  @Column()
  email_verificad: boolean;

  @Column()
  phone: string;

  @Column()
  phone_verificad: boolean;


  @OneToOne(() => Profile, { eager: true, cascade: true, onDelete: "CASCADE" })
  @JoinColumn()
  profile: Profile;

  // @OneToOne(() => Admin, { eager: true, cascade: true, onDelete: "CASCADE" })
  // @JoinColumn()
  // admin: Admin;


  @OneToMany(() => Projects, (project) => project.user)
  projects: Projects[];
}
