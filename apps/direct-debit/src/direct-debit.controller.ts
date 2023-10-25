import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DirectDebitService } from './direct-debit.service';
import { CreateDirectDebitDto } from './dto/create-direct-debit.dto';
import { UpdateDirectDebitDto } from './dto/update-direct-debit.dto';
import { CurrentUser, JwtAuthGuard } from 'y/common';

@Controller('direct-debit')
export class DirectDebitController {
  constructor(private readonly directDebitService: DirectDebitService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDirectDebitDto: CreateDirectDebitDto) {
    const { amount, duration } = createDirectDebitDto;
    const date = new Date();

    const installmentSchedule = [];

    for (let month = 1; month <= duration; month++) {
      const remainingBalance = amount - (amount / duration) * month;

      const installment = {
        transactionId: month,
        amount: parseFloat((amount / duration).toFixed(2)),
        dueDate: new Date(
          date.getFullYear(),
          date.getMonth() + month,
          date.getDate(),
        ),
        remainingBalance: parseFloat(remainingBalance.toFixed(2)),
        status: 'open',
      };

      installmentSchedule.push(installment);
    }


    return this.directDebitService.create(
      createDirectDebitDto,
      installmentSchedule,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: any) {
    return this.directDebitService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directDebitService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectDebitDto: UpdateDirectDebitDto,
  ) {
    return this.directDebitService.update(id, updateDirectDebitDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directDebitService.remove(id);
  }
}
