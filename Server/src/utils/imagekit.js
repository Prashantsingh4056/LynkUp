import ImageKit from "@imagekit/nodejs";

const client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const uploadFile = async (fileBuffer, userId) => {
  try {
    console.log("Starting upload...");

    const result = await client.files.upload({
      file: fileBuffer,
      fileName: `user-${userId}-${Date.now()}`,
      folder: "/profile-images",
    });

    console.log("Upload completed:", result.url);

    return result;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
};

const deleteFile = async (fileId) => {
  try {
    if (!fileId) return;

    await client.files.delete(fileId);
    console.log("Old image deleted");
  } catch (error) {
    console.error("ImageKit delete error:", error);
  }
};

export {uploadFile, deleteFile};