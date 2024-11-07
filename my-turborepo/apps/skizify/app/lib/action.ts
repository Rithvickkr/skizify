import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"



const s3Client = new S3Client({
  region: process.env.AWS_BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

console.log("process.env.AWS_ACCESS_KEY: ", process.env.AWS_ACCESS_KEY);
console.log("process.env.AWS_BUCKET_REGION: ", process.env.AWS_BUCKET_REGION);

type SignedURLResponse = Promise<
{ failure?: undefined; success: { url: string } }
| { failure: string; success?: undefined }
>

export async function getSignedURL({session} : {session : any}): SignedURLResponse {
  if (!session) {
    console.log({ failure: "not authenticated" });
    return { failure: "not authenticated" }
  }
  
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
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
