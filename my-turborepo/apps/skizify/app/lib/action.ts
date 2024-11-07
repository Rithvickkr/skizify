import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
// import './envConfig.ts'




type SignedURLResponse = Promise<
{ failure?: undefined; success: { url: string } }
| { failure: string; success?: undefined }
>

export async function getSignedURL({session, region , accessKey , secretAccessKey , bucketName} : {session: any, region: string, accessKey: string, secretAccessKey: string, bucketName: string}): SignedURLResponse {
  console.log("bucketName: ", bucketName);
  console.log("secretAccessKey: ", secretAccessKey);
  console.log("accessKey: ", accessKey);
  console.log("region: ", region);
  
  if (!session) {
    console.log({ failure: "not authenticated" });
    return { failure: "not authenticated" }
  }
  if (!region || !accessKey || !secretAccessKey || !bucketName) {
    console.log({ failure: "missing AWS configuration" });
    return { failure: "missing AWS configuration" }
  }
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: accessKey,
      secretAccessKey,
    },
  })
  
  const putObjectCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: "test-file",
  })
  console.log("putObjectCommand: ", putObjectCommand);
  console.log("s3Client: ", s3Client);
  
  try {
    const url = await getSignedUrl(
      s3Client,
      putObjectCommand,
      { expiresIn: 60 } // expires this URL in 60 seconds
    )
    return { success: { url } }
  } catch (error) {
    console.error("Error generating signed URL:", error)
    return { failure: "Error generating signed URL" }
  }

}
