import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument, UserRole } from './schemas/user.schema';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';
import { JwtPayload } from './strategies/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.userModel.findOne({
      email: registerDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.userModel.create({
      ...registerDto,
      password: hashedPassword,
    });

    const tokens = await this.getTokens(
      user._id.toString(),
      user.email,
      user.role,
    );

    return {
      ...tokens,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async createUser(createUserDto: any) {
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      contactNumber: user.contactNumber,
      address: user.address,
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      email: loginDto.email,
    });

    if (!user || !(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const tokens = await this.getTokens(
      user._id.toString(),
      user.email,
      user.role,
    );

    return {
      ...tokens,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

  async validateUser(userId: string) {
    return await this.userModel.findById(userId).select('-password');
  }

  async findAllUsers() {
    return await this.userModel
      .find()
      .select('-password')
      .sort({ createdAt: -1 });
  }

  async getTokens(userId: string, email: string, role: UserRole) {
    const payload: JwtPayload = {
      sub: userId,
      email,
      role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '30d',
    });

    return {
      accessToken,
    };
  }
}
