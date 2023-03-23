import {
    unstable_composeUploadHandlers,
    unstable_createMemoryUploadHandler,
    writeAsyncIterableToWritable
} from "@remix-run/node";

import * as dotenv from 'dotenv';
dotenv.config();

import cloudinary, {UploadApiResponse} from "cloudinary";

async function uploadImageToCloudinary(
    data: AsyncIterable<Uint8Array>, options
) {
    const uploadPromise = new Promise<UploadApiResponse>(
        async (resolve, reject) => {
            const uploadStream =
                cloudinary.v2.uploader.upload_stream(
                    options,
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result);
                    }
                );
            await writeAsyncIterableToWritable(
                data,
                uploadStream
            );
        }
    );

    return uploadPromise;
}

export const uploadHandler = unstable_composeUploadHandlers(
    // our custom upload handler
    async ({ name, contentType, data, filename }) => {

        if (!(name === "image_url" || name === "page_image_url")) {
            return undefined;
        }

        if (typeof filename === 'undefined' || filename.toString() === "") {
            return undefined;
        }
        let uploadedImage;
        if (name === "image_url") {
            uploadedImage = await uploadImageToCloudinary(
                data, {
                    folder: "tewebsite",
                    transformation: {
                        width: 560,
                        height: 400,
                        crop: "fill"
                    }
                }
            );
        } else if (name === "page_image_url") {
            uploadedImage = await uploadImageToCloudinary(
                data, {
                    folder: "tewebsite"
                }
            );
        }

        return uploadedImage.secure_url;
    },
    // fallback to memory for everything else
    unstable_createMemoryUploadHandler()
);