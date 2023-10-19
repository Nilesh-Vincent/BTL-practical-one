import {
  IsNotEmpty,
  IsString,
  IsNumber,
} from 'class-validator';

export class CreateDirectDebitDto {
  @IsNotEmpty()
  @IsString()
  loanId: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

}
