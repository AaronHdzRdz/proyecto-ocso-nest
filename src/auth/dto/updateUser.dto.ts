import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './createUser.dto';

export class UpdateUSerDto extends PartialType(CreateUserDto) {}
