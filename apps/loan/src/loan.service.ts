import { Injectable } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanRepository } from './loan.repository';

@Injectable()
export class LoanService {
  constructor(private readonly loanRepository: LoanRepository) {}

  create(
    createLoanDto: CreateLoanDto,
    CurrentUserId: string,
    CurrentUserEmail: string,
  ) {
    return this.loanRepository.create({
      ...createLoanDto,
      timestamp: new Date(),
      customerId: CurrentUserId,
      customerEmail: CurrentUserEmail,
    });
  }

  findAll() {
    return this.loanRepository.find({});
  }

  findOne(_id: string) {
    return this.loanRepository.findOne({ _id });
  }

  update(_id: string, updateLoanDto: UpdateLoanDto) {
    return this.loanRepository.findOneAndUpdate(
      { _id },
      { $set: updateLoanDto },
    );
  }

  remove(_id: string) {
    return this.loanRepository.findOneAndDelete({ _id });
  }
}
