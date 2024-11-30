import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { User } from "../users/user.entity";
import { Comment } from "../comments/comment.entity";

@Entity()
export class Exhibit {
    @Expose()
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: "Unique exhibit identifier" })
    id: number;

    @Expose()
    @Column()
    @ApiProperty({ example: 'filename', description: 'URL of the image' })
    imageUrl: string;

    @Expose()
    @Column()
    @ApiProperty({ example: 'description', description: 'Image description' })
    description: string;
    
    @Expose()
    @Column({ default: 0 })
    commentCount: number;

    @Expose()
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Expose()
    @ManyToOne(() => User, (user) => user.exhibits, { eager: true })
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column()
    userId: number;

    @Expose()
    @OneToMany(() => Comment, (comment) => comment.exhibit, { cascade: true })
    comments: Comment[];
    
}
