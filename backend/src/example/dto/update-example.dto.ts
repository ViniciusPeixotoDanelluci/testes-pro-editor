import { PartialType } from '@nestjs/mapped-types';
import { CreateExampleDto } from './create-example.dto.js';

export class UpdateExampleDto extends PartialType(CreateExampleDto) {}
