import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exhibit } from './exhibit.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import * as path from 'path';
import * as fs from 'fs';
import { v4 } from 'uuid';
import { NotificationsGateway } from 'src/notifications/notifications.gateway';


@Injectable()
export class ExhibitsService {
    constructor(
        @InjectRepository(Exhibit)
        private exhibitsRepository: Repository<Exhibit>,
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly notificationService: NotificationsGateway

    ) { }

    async createExhibit(file: Express.Multer.File, description: string, userId: number): Promise<Exhibit> {
        const uploadPath = this.ensureUploadDirectory();

        const uniqueFileName = `${v4()}${path.extname(file.originalname)}`;
        const filePath = path.join(uploadPath, uniqueFileName);
        const user = await this.usersRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found.`);
        }
    
        fs.writeFileSync(filePath, file.buffer);
        const exhibit = this.exhibitsRepository.create(
            {
                userId,
                description,
                imageUrl: `/static/${uniqueFileName}`,
            }
        );

        this.notificationService.handleNewPost({
            message: description,
            user: user.username
        })

        return this.exhibitsRepository.save(exhibit);
    }

    private ensureUploadDirectory(): string {
        const uploadPath = path.resolve(__dirname, '..', '..', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        return uploadPath;
    }

    private removeFile(filePath: string): void {
        const absolutePath = path.join(__dirname, '../../..', filePath);
        if (fs.existsSync(absolutePath)) {
            try {
                fs.unlinkSync(absolutePath);
            } catch (error) {
                console.error(`Failed to remove file: ${absolutePath}`, error);
            }
        }
    }


    async getAllExhibits(page: number, limit: number): Promise<any> {
        const [result, total] = await this.exhibitsRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' }
        });

        return {
            data: result,
            total,
            page,
            lastPage: Math.ceil(total / limit)
        };
    }

    async getExhibitById(id: number): Promise<Exhibit> {
        const exhibit = await this.exhibitsRepository.findOne({ where: { id } });

        if (!exhibit) {
            throw new NotFoundException(`Exhibit with ID ${id} not found`);
        }

        return exhibit;
    }


    async getUserExhibit(userId: number, page: number, limit: number): Promise<any> {

        const [result, total] = await this.exhibitsRepository.findAndCount({
            where: { userId },
            skip: (page - 1) * limit,
            take: limit,
            order: { createdAt: 'DESC' },
        });

        return {
            data: result,
            total,
            page,
            lastPage: Math.ceil(total / limit),
        };

    }

    async removeExhibit(id: number, userId: number): Promise<void> {
        const exhibit = await this.exhibitsRepository.findOne({ where: { id } });

        if (!exhibit) {
            throw new NotFoundException(`Exhibit with ID ${id} not found`);
        }

        const user = await this.usersRepository.findOne({ where: { id: userId } });

        if (user?.isAdmin) {
            await this.performExhibitRemoval(exhibit);
            return;
        }

        if (exhibit.userId !== userId) {
            throw new ForbiddenException("You do not have permission to delete this exhibit.");
        }

        await this.performExhibitRemoval(exhibit);
    }

    private async performExhibitRemoval(exhibit: Exhibit): Promise<void> {
        await this.exhibitsRepository.remove(exhibit);
        this.removeFile(exhibit.imageUrl);
    }

}


