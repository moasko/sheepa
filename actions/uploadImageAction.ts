"use server";

import path from "path";
import fs from "fs/promises"; 
import os from "os";
import { v4 as uuidv4 } from "uuid";

interface File {
  name: string;
  type: string;
  arrayBuffer(): Promise<ArrayBuffer>;
}

interface FormData {
  getAll(key: string): File[];
}

interface UploadedFile {
  filepath: string;
  filename: string;
}

async function saveImageToLocal(formData: FormData): Promise<UploadedFile[]> {
  const files = formData.getAll('files');

  const multipleBuffersPromise = await Promise.all(files.map(async (file: File) => {
    const buffer = await file.arrayBuffer();
    const name = uuidv4();
    const ext = file.type.split("/")[1];

    const tempDir = os.tmpdir();
    const uploadDir = path.join(tempDir, `/${name}.${ext}`);

    await fs.writeFile(uploadDir, Buffer.from(buffer)); 

    return { filepath: uploadDir, filename: file.name };
  }));

  return multipleBuffersPromise;
}

export async function uploadImage(formdata: FormData): Promise<void | { msg: any }> {
  try {
    const newFiles = await saveImageToLocal(formdata);
    console.log(newFiles);
  } catch (error) {
    return { msg: error };
  }
}
