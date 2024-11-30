import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Exhibit } from "../exhibits/exhibit.entity";
import { Comment } from "../comments/comment.entity";

@Entity()
export class User {
    @Expose()
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: "Unique user identifier" })
    id: number;

    @Expose()
    @Column({ unique: true })
    @ApiProperty({ example: 'username', description: 'Unique user name' })
    username: string;

    @Column()
    @ApiProperty({ example: 'hashedPassword', description: 'Hashed user password' })
    password: string;

    @OneToMany(() => Exhibit, (exhibit) => exhibit.user, {cascade: true})
    @ApiProperty({type: () => [Exhibit], description: "List of exhibits"})
    exhibits: Exhibit[];

    @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
    @ApiProperty({ type: () => [Comment], description: "List of comments" })
    comments: Comment[];

    @Column({ default: false })
    isAdmin: boolean;
}
