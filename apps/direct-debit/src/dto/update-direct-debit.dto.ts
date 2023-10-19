import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectDebitDto } from './create-direct-debit.dto';
import { ArrayMinSize, ArrayNotEmpty, IsArray } from 'class-validator';

export class UpdateDirectDebitDto extends PartialType(CreateDirectDebitDto) {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  installmentSchedule: {
    transactionId: number;
    amount: number;
    dueDate: Date;
  }[];
}
