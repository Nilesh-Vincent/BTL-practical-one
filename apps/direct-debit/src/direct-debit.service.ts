import { Injectable } from '@nestjs/common';
import { CreateDirectDebitDto } from './dto/create-direct-debit.dto';
import { UpdateDirectDebitDto } from './dto/update-direct-debit.dto';
import { DirectDebitRepository } from './direct-debit.repository';

@Injectable()
export class DirectDebitService {
  constructor(private readonly directDebitRepository: DirectDebitRepository) {}

  create(createDirectDebitDto: CreateDirectDebitDto, installmentSchedule: any) {
    //@ts-ignore
    return this.directDebitRepository.create({
      ...createDirectDebitDto,
      installmentSchedule,
    });
  }

  findAll() {
    return this.directDebitRepository.find({});
  }

  findOne(id: string) {
    return this.directDebitRepository.findOne({ _id: id });
  }

  update(id: string, updateDirectDebitDto: UpdateDirectDebitDto) {
    return this.directDebitRepository.findOneAndUpdate(
      { _id: id },
      { $set: updateDirectDebitDto },
    );
  }

  remove(id: string) {
    return this.directDebitRepository.findOneAndDelete({ _id: id });
  }
}
