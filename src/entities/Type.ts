import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("type")
export class TypeProject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;


}
