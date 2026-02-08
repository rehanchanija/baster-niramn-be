import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';

@Injectable()
export class UploadService {
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.getOrThrow('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.getOrThrow('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.getOrThrow('AWS_SECRET_ACCESS_KEY'),
      },
    });
    this.bucketName = this.configService.getOrThrow('AWS_BUCKET_NAME');
  }

  async uploadFile(fileBuffer: Buffer, fileName: string, contentType: string) {
    const key = `${randomUUID()}-${fileName}`;

    await this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: fileBuffer,
        ContentType: contentType,
        // ACL: 'public-read', // Depends on bucket setting. If strict block public access is on, this fails.
      }),
    );

    return `https://${this.bucketName}.s3.${this.configService.getOrThrow('AWS_REGION')}.amazonaws.com/${key}`;
  }
}
