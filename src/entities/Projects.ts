import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
  OneToOne,
  ManyToMany,
} from "typeorm";
import { Category } from "./Category";
import { Status } from "./Status";
import { TypeProject } from "./Type";
import { User } from "./User";

@Entity("projects")
export class Projects {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "text", array: true })
  projectColors: string[];

  @Column({ type: "text" })
  currentFile: string;

  @Column({ type: "text", array: true })
  projectModel: string[];

  @Column({ type: "int" })
  projectValueInNumeric: number;

  @Column({ type: "text" })
  projectPayment: string;

  @CreateDateColumn()
  projectTime: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: "text" })
  projectLink: string;

  @ManyToOne(() => Status, (status) => status, {
    cascade: true,
  })
  @JoinColumn()
  status: Status;

  @ManyToOne(() => Category, (category) => category, {
    cascade: true,
  })
  @JoinColumn()
  category: Category;

  //   vai ser de outro lugar
  @ManyToOne(() => TypeProject, (type) => type, {
    cascade: true,
  })
  @JoinColumn()
  type: TypeProject;

  @ManyToOne(() => User, (user) => user.projects, {
    cascade: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;
}
