import { IsString, IsNumber, IsEnum } from 'class-validator';

export class CreateLoanDto {
  @IsString({ message: 'Loan ID must be a string' })
  loanId: string;

  @IsNumber({}, { message: 'Amount must be a number' })
  amount: number;

  @IsNumber({}, { message: 'Duration must be a number' })
  duration: number;

  @IsEnum(['open', 'outstanding', 'closed'], {
    message: 'Status must be one of: open, outstanding, closed',
  })
  status: string;
}
