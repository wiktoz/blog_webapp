import { formatDistanceToNow } from "date-fns"

export const timeAgo = (dateString:string) => {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      return "Invalid time"
    }

    const gmtPlusOneDate = new Date(date.getTime() - 1 * 60 * 60 * 1000);
  
    return (
      formatDistanceToNow(gmtPlusOneDate, { addSuffix: true })
    )
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the prefix (data:<mime-type>;base64,)
      const base64String = result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

export async function filesToBase64(files:File[]) {
  const promises = Array.from(files).map(file => fileToBase64(file));
  return Promise.all(promises);
}