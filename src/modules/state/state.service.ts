import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { State, StateDocument } from './schemas/state.schema';
import { CreateStateDto } from './dtos/create-state.dto';
import { UpdateStateDto } from './dtos/update-state.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectModel(State.name) private stateModel: Model<StateDocument>,
  ) {}

  async create(createStateDto: CreateStateDto): Promise<State> {
    const existingState = await this.stateModel.findOne({
      stateName: createStateDto.stateName,
    });

    if (existingState) {
      throw new ConflictException('State with this name already exists');
    }

    const state = await this.stateModel.create(createStateDto);
    return state;
  }

  async findAll(): Promise<State[]> {
    return await this.stateModel.find().sort({ stateName: 1 }).exec();
  }

  async findOne(id: string): Promise<State> {
    const state = await this.stateModel.findById(id).exec();
    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
    return state;
  }

  async update(id: string, updateStateDto: UpdateStateDto): Promise<State> {
    const state = await this.stateModel
      .findByIdAndUpdate(id, updateStateDto, { new: true })
      .exec();

    if (!state) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }

    return state;
  }

  async remove(id: string): Promise<void> {
    const result = await this.stateModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`State with ID ${id} not found`);
    }
  }
}
