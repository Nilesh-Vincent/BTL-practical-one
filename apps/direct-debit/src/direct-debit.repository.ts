import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'y/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DirectDebitDocument } from './model/direct-debit.model';

@Injectable()
export class DirectDebitRepository extends AbstractRepository<DirectDebitDocument> {
  protected readonly logger = new Logger(DirectDebitRepository.name);

  constructor(
    @InjectModel(DirectDebitDocument.name)
    DirectDebitModel: Model<DirectDebitDocument>,
  ) {
    super(DirectDebitModel);
  }
}
