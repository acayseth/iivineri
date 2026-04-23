import {
  S3Client,
  PutObjectCommand,
  HeadBucketCommand,
  CreateBucketCommand,
} from "@aws-sdk/client-s3";

const RUSTFS_URL = process.env.RUSTFS_URL!;
const RUSTFS_ACCESS_KEY = process.env.RUSTFS_ACCESS_KEY!;
const RUSTFS_SECRET_KEY = process.env.RUSTFS_SECRET_KEY!;
const RUSTFS_BUCKET = process.env.RUSTFS_BUCKET!;

const s3 = new S3Client({
  region: "us-east-1",
  endpoint: RUSTFS_URL,
  credentials: {
    accessKeyId: RUSTFS_ACCESS_KEY,
    secretAccessKey: RUSTFS_SECRET_KEY,
  },
  forcePathStyle: true,
});

let bucketReady: Promise<void> | null = null;

function ensureBucket(): Promise<void> {
  if (!bucketReady) {
    bucketReady = (async () => {
      try {
        await s3.send(new HeadBucketCommand({ Bucket: RUSTFS_BUCKET }));
      } catch {
        await s3.send(new CreateBucketCommand({ Bucket: RUSTFS_BUCKET }));
      }
    })().catch((err) => {
      bucketReady = null;
      throw err;
    });
  }
  return bucketReady;
}

export async function putImage(
  key: string,
  body: Buffer,
  contentType: string,
): Promise<void> {
  await ensureBucket();
  await s3.send(
    new PutObjectCommand({
      Bucket: RUSTFS_BUCKET,
      Key: key,
      Body: body,
      ContentType: contentType,
    }),
  );
}
