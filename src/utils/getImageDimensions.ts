const handler = (image: string) => {
  return new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = (error) => {
      reject(error);
    };
    img.src = image;
  });
};

export const getImageDimensions = (
  image: string | File,
): Promise<{ width: number; height: number }> => {
  if (typeof image === "string") {
    return handler(image);
  }

  return handler(URL.createObjectURL(image));
};
