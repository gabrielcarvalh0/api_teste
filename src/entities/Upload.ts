import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("upload")
export class Upload {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;
  @Column("text")
  mimetype: string;
  @Column("text")
  size: string;
  @Column("text")
  key: string;
  @Column("text")
  path: string;
}
