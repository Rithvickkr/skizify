
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto"

type SignedURLResponse = Promise<
  | { failure?: undefined; success: { url: string } }
  | { failure: string; success?: undefined }
>;

interface GetSignedURLParams {
  session: any;
  region: string;
  accessKey: string;
  secretAccessKey: string;
  bucketName: string;
  fileType: string;
  fileSize: number;
  checksum: string;
}


const allowedFileTypes = [
  "image/jpeg",
  "image/png",
]

const maxFileSize = 1048576 * 5 // 5 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

export async function getSignedURL({
  session,
  region,
  accessKey,
  secretAccessKey,
  bucketName,
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams): SignedURLResponse {
  if (!session) {
    console.log({ failure: "not authenticated" });
    return { failure: "You are not Authenticated" };
  }
  if (!region || !accessKey || !secretAccessKey || !bucketName) {
    return { failure: "missing AWS configuration" };
  }

  if (!allowedFileTypes.includes(fileType)) {
    console.log("allowedFileTypes.includes(fileType: ", allowedFileTypes.includes(fileType));
    return { failure: "File type not allowed" }
  }

  console.log("maxFileSize: ", fileSize);
  if (fileSize > maxFileSize) {
    console.log("Max File size Allowed is 5MB");
    return { failure: "Max File size Allowed is 5MB" }
  }

  console.log("fileType: ", fileType);
  const fileName = generateFileName()
  console.log("fileName: ", fileName);


  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey,
    },
  });

  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });

  console.log("putObjectCommand: ", putObjectCommand);
  console.log("s3Client: ", s3Client);

  try {
    const url = await getSignedUrl(
      s3Client,
      putObjectCommand,
      { expiresIn: 60 }, // expires this URL in 60 seconds
    );
    return { success: { url } };
  } catch (error) {
    console.error("Error generating signed URL:", error);
    return { failure: "Error generating signed URL" };
  }
}


// export async function DeleteSignedURL({
//   session,
//   region,
//   bucketName,
// }:{
//   session: any;
//   region: string;
//   bucketName: string;
// } ) {
//   if (!session) {
//     console.log({ failure: "not authenticated" });
//     return { failure: "You are not Authenticated" };
//   if (!region || !bucketName) {
//     console.log({ failure: "missing AWS configuration" });
//     return { failure: "missing AWS configuration" };
//   }

//   console.log("region: ", region);
//   console.log("bucketName: ", bucketName);
//   //Delete the file from the S3 Bucket by Getting the URL from the DB
// }
// }
