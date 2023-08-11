import { Injectable } from '@nestjs/common';
import { CreateSessionRequestDto } from './dto/create-session-request.dto';
import { UpdateSessionRequestDto } from './dto/update-session-request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ISession } from './entities/session.interface';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('session') private readonly sessionModel: Model<ISession>,
  ) {}
  async create(): Promise<ISession> {
    const createSessionDto = new CreateSessionRequestDto();
    createSessionDto.timestamp = Date.now();
    createSessionDto.duration = 1000 * 60 * 60; // 1 hour in milliseconds

    const newSession = new this.sessionModel(createSessionDto);
    await newSession.save();

    return newSession;
  }

  // findAll() {
  //   return `This action returns all session`;
  // }

  findOne(id: number) {
    return this.sessionModel.findById(id);
  }

  update(id: number, updateSessionDto: UpdateSessionRequestDto) {
    return this.sessionModel.findByIdAndUpdate(id, updateSessionDto, {
      new: true,
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} session`;
  // }
}
