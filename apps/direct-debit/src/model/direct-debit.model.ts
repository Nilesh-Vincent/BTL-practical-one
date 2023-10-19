import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'y/common/database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class DirectDebitDocument extends AbstractDocument {
  @Prop()
  timestamp: Date;

  @Prop()
  loanId: string;

  @Prop()
  amount: number;

  @Prop()
  duraton: number;

  @Prop()
  remainingAmount:number

  @Prop()
  installmentSchedule: {
    transactionId: number;
    status: {
      type: string;
      enum: ['open', 'outstanding', 'closed'];
      default: 'open';
    };
    amount: number;
    dueDate: Date;
    remainingBalance:number
  }[];
  
}

export const DirectDebitSchema =
  SchemaFactory.createForClass(DirectDebitDocument);
