import { Injectable, Request } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanRepository } from './loan.repository';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LoanService {
  constructor(
    private readonly loanRepository: LoanRepository,
    private readonly httpService: HttpService,
  ) {}

  async create(
    createLoanDto: CreateLoanDto,
    CurrentUserId: string,
    CurrentUserEmail: string,
  ) {
    const newLoan = await this.loanRepository.create({
      ...createLoanDto,
      customerId: CurrentUserId,
      customerEmail: CurrentUserEmail,
    });

    // try {
    //   const response = await this.httpService
    //     .post('http://localhost:3008/direct-debit', {
    //       loanId: 'newloan',
    //       amount: 6000,
    //       duration: 6,
    //     })
    //     .toPromise();
    //   console.log('loan worked res mate');
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
    return newLoan;
  }

  findAll() {
    // const cookies = Request();
    // console.log('Cookies');
    // console.log(cookies);
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
