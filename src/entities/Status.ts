import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("status")
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;


}
