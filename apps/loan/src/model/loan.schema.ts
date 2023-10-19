import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument } from 'y/common/database/abstract.schema';

@Schema({ versionKey: false, timestamps: true })
export class LoanDocument extends AbstractDocument {
 

  @Prop()
  loanId: string;

  @Prop()
  customerId: string;

  @Prop()
  customerEmail: string;

  @Prop()
  amount: number;

  @Prop()
  duration: number;

  @Prop({ enum: ['open', 'outstanding', 'closed'], default: 'open' })
  status: string;
}

export const LoanSchema = SchemaFactory.createForClass(LoanDocument);
