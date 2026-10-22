/**
 * Compresor de imágenes en el cliente (Browser HTML5 Canvas)
 * Reduce fotos de alta resolución de celulares (5-15 MB) a un formato liviano
 * de ~30-80 KB ideal para evidencia operativa sin saturar memoria ni almacenamiento.
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0 (default 0.65)
  format?: 'image/jpeg' | 'image/webp';
}

export function compressImageFile(
  file: File,
  options: CompressionOptions = {}
): Promise<{ dataUrl: string; sizeKb: number }> {
  const {
    maxWidth = 800,
    maxHeight = 600,
    quality = 0.65,
    format = 'image/jpeg'
  } = options;

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = (err) => reject(err);
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = (err) => reject(err);
      img.onload = () => {
        let { width, height } = img;

        // Mantener proporción de aspecto
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('No se pudo obtener el contexto 2D del Canvas'));
          return;
        }

        // Fondo blanco para evitar transparencias oscuras al exportar a JPEG
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);

        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(format, quality);
        // Calcular tamaño aproximado en KB
        const head = `data:${format};base64,`;
        const base64Length = dataUrl.length - head.length;
        const sizeKb = Math.round((base64Length * 0.75) / 1024);

        resolve({ dataUrl, sizeKb });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}
