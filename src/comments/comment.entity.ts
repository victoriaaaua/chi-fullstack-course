import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { User } from "../users/user.entity";
import { Exhibit } from "../exhibits/exhibit.entity";

@Entity()
export class Comment {
    @Expose()
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: "Unique comment identifier" })
    id: number;

    @Expose()
    @Column()
    @ApiProperty({ example: 'description', description: 'Comment text' })
    text: string;

    @Expose()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Expose()
    @ManyToOne(() => User, (user) => user.comments, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Expose()
    @ManyToOne(() => Exhibit, (exhibit) => exhibit.comments, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'exhibitId' })
    exhibit: Exhibit;

}
