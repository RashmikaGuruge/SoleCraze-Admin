import { imageDb } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const upload = async (file) => {
  try {
    if (file instanceof File) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);

      console.log('File uploaded successfully. Download URL:', downloadUrl);

      return downloadUrl;
    } else {
      console.warn('Invalid file type or file is null.');
      // You might want to return something here or handle it differently
    }
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error; // Re-throw the error to let the caller handle it
  }
};

export default upload;
