import { Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session } from './entities/session.schema';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('session') private readonly sessionModel: Model<Session>,
  ) {}
  async create(): Promise<Session> {
    const createSessionDto = new CreateSessionDto();
    createSessionDto.timestamp = Date.now();
    createSessionDto.duration = 1000 * 60 * 60; // 1 hour in milliseconds

    const newSession = new this.sessionModel(createSessionDto);
    await newSession.save();

    return newSession;
  }

  findAll() {
    return `This action returns all session`;
  }

  findOne(id: number) {
    return this.sessionModel.findById(id);
  }

  update(id: number, updateSessionDto: UpdateSessionDto) {
    return `This action updates a #${id} session`;
  }

  remove(id: number) {
    return `This action removes a #${id} session`;
  }
}
