import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NewUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: 'text', default: ''})
    user!: string;

    @Column({unique: true})
    email!: string;
}