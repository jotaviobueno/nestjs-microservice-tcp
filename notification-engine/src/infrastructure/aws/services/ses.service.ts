import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { environment } from 'src/config';
import * as AWS from 'aws-sdk';
import Mail from 'nodemailer/lib/mailer';

@Injectable()
export class SESService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      SES: new AWS.SES({
        apiVersion: '2010-12-01',
        region: environment.AWS.SES.REGION,
        accessKeyId: environment.AWS.ACCESS_KEY_ID,
        secretAccessKey: environment.AWS.SECRET_ACCESS_KEY,
      }),
    });
  }

  sendMail(data: Mail.Options) {
    return this.transporter.sendMail({
      ...data,
      from: `"${environment.AWS.SES.FROM}" <${environment.AWS.SES.FROM_EMAIL}>`,
    });
  }
}
