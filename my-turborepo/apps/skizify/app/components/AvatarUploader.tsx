// "use client";
// import { useState, useRef } from "react";
// import { Button } from "../../@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "../../@/components/ui/card";
// import { Upload, RotateCw, Save } from "lucide-react";
// import ReactCrop, { type Crop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../../@/components/ui/dialog";

// export default function AvatarUploader() {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);
//   const [crop, setCrop] = useState<Crop>({
//     unit: '%',
//     x: 25,
//     y: 25,
//     width: 50,
//     height: 50
//   });
//   const [rotation, setRotation] = useState(0);
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const imageRef = useRef<HTMLImageElement | null>(null);

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file && file.type.startsWith('image/')) {
//       setSelectedFile(file);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewUrl(reader.result as string);
//         setIsDialogOpen(true);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleRotate = () => {
//     setRotation((prev) => (prev + 90) % 360);
//   };

//   const handleSave = async () => {
//     if (!imageRef.current || !crop || !previewUrl) return;

//     const canvas = document.createElement('canvas');
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     const image = imageRef.current;
    
//     // Set canvas dimensions
//     canvas.width = (crop.width * image.naturalWidth) / 100;
//     canvas.height = (crop.height * image.naturalHeight) / 100;

//     // Handle rotation and cropping
//     ctx.save();
//     ctx.translate(canvas.width/2, canvas.height/2);
//     ctx.rotate((rotation * Math.PI) / 180);
//     ctx.translate(-canvas.width/2, -canvas.height/2);
    
//     const sourceX = (crop.x * image.naturalWidth) / 100;
//     const sourceY = (crop.y * image.naturalHeight) / 100;
    
//     ctx.drawImage(
//       image,
//       sourceX,
//       sourceY,
//       (crop.width * image.naturalWidth) / 100,
//       (crop.height * image.naturalHeight) / 100,
//       0,
//       0,
//       canvas.width,
//       canvas.height
//     );
    
//     ctx.restore();

//     // Convert to blob and prepare for upload
//     canvas.toBlob(async (blob) => {
//       if (!blob) return;

//       // Create FormData object
//       const formData = new FormData();
      
//       // Convert blob to File object with proper filename
//       const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
      
//       // Append file and metadata to FormData
//       formData.append('file', file);
//       formData.append('userId', 'user123');
//       formData.append('timestamp', new Date().toISOString());

//       // Log FormData entries to verify content
//       for (let [key, value] of formData.entries()) {
//         console.log(`${key}: ${value}`);
//       }

//       try {
//         const response = await fetch('/api/upload-avatar', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           console.log('Avatar uploaded successfully');
//           setIsDialogOpen(false);
//         } else {
//           console.error('Failed to upload avatar');
//         }
//       } catch (error) {
//         console.error('Error uploading avatar:', error);
//       }
//     }, 'image/jpeg', 0.9);
//   };

//   return (
//     <Card className="from-card/50 to-card bg-gradient-to-br p-4 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-2xl dark:border dark:border-white/20">
//       <CardHeader>
//         <CardTitle className="bg-gradient-to-r from-black to-black/60 bg-clip-text text-2xl font-semibold text-transparent dark:from-white dark:to-white/15">
//           Upload Avatar
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         <div className="flex flex-col items-center gap-4">
//           <input
//             type="file"
//             accept="image/*"
//             className="hidden"
//             id="avatar-upload"
//             onChange={handleFileSelect}
//           />
          
//           <label htmlFor="avatar-upload">
//             <div className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
//               <Upload className="h-8 w-8 text-gray-400" />
//             </div>
//           </label>

//           <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//             <DialogContent className="sm:max-w-[600px]">
//               <DialogHeader>
//                 <DialogTitle>Edit Avatar</DialogTitle>
//               </DialogHeader>
              
//               {previewUrl && (
//                 <div className="space-y-4">
//                   <div className="relative max-h-[400px] overflow-auto">
//                     <ReactCrop
//                       crop={crop}
//                       onChange={(c) => setCrop(c)}
//                       aspect={1}
//                     >
//                       <img
//                         ref={imageRef}
//                         src={previewUrl}
//                         alt="Preview"
//                         style={{ 
//                           maxWidth: '100%',
//                           transform: `rotate(${rotation}deg)`,
//                         }}
//                       />
//                     </ReactCrop>
//                   </div>

//                   <div className="flex justify-end gap-2">
//                     <Button
//                       onClick={handleRotate}
//                       variant="outline"
//                       size="icon"
//                     >
//                       <RotateCw className="h-4 w-4" />
//                     </Button>
//                     <Button
//                       onClick={handleSave}
//                       variant="default"
//                     >
//                       <Save className="mr-2 h-4 w-4" />
//                       Save
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </DialogContent>
//           </Dialog>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
