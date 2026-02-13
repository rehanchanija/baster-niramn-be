import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Block, BlockDocument } from './schemas/block.schema';
import { CreateBlockDto } from './dtos/create-block.dto';
import { UpdateBlockDto } from './dtos/update-block.dto';

@Injectable()
export class BlockService {
  constructor(
    @InjectModel(Block.name) private blockModel: Model<BlockDocument>,
  ) {}

  async create(createBlockDto: CreateBlockDto): Promise<Block> {
    const existingBlock = await this.blockModel.findOne({
      blockName: createBlockDto.blockName,
      stateId: createBlockDto.stateId,
    });

    if (existingBlock) {
      throw new ConflictException(
        'Block with this name already exists in this state',
      );
    }

    const block = await this.blockModel.create(createBlockDto);
    return block;
  }

  async findAll(stateId?: string): Promise<Block[]> {
    const filter = stateId ? { stateId } : {};
    return await this.blockModel
      .find(filter)
      .populate('state')
      .sort({ blockName: 1 })
      .exec();
  }

  async findOne(id: string): Promise<Block> {
    const block = await this.blockModel.findById(id).populate('state').exec();

    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }
    return block;
  }

  async update(id: string, updateBlockDto: UpdateBlockDto): Promise<Block> {
    const block = await this.blockModel
      .findByIdAndUpdate(id, updateBlockDto, { new: true })
      .populate('state')
      .exec();

    if (!block) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }

    return block;
  }

  async remove(id: string): Promise<void> {
    const result = await this.blockModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Block with ID ${id} not found`);
    }
  }
}
