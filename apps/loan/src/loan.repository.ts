import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'y/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoanDocument } from './model/loan.schema';

@Injectable()
export class LoanRepository extends AbstractRepository<LoanDocument> {
  protected readonly logger = new Logger(LoanRepository.name);

  constructor(
    @InjectModel(LoanDocument.name)
    loanModel: Model<LoanDocument>,
  ) {
    super(loanModel);
  }
}
