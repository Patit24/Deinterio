import React, { useState, useRef } from 'react';
import { Camera, Image as ImageIcon, Trash2, RefreshCw, UploadCloud, CheckCircle2, AlertCircle } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  helperText?: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide' | 'auto';
  compact?: boolean;
}

/**
 * Compresses an image File using HTML5 Canvas to ensure fast performance and prevent localStorage quota issues.
 */
export const compressImageFile = (
  file: File,
  maxWidth = 1280,
  maxHeight = 1280,
  quality = 0.8
): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If not an image, reject
    if (!file.type.startsWith('image/')) {
      reject(new Error('Selected file is not an image'));
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(img.src);
          return;
        }

        // Draw and compress to JPEG
        ctx.drawImage(img, 0, 0, width, height);
        const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedBase64);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  label,
  value,
  onChange,
  required = false,
  helperText,
  className = '',
  aspectRatio = 'wide',
  compact = false,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleProcessFile = async (file: File) => {
    setError(null);
    setIsProcessing(true);
    try {
      const compressedDataUrl = await compressImageFile(file);
      onChange(compressedDataUrl);
    } catch (err: any) {
      console.error('Image compression error:', err);
      setError(err?.message || 'Failed to process image. Please try again.');
    } finally {
      setIsProcessing(false);
      // Reset input values so selecting the same file again triggers change
      if (galleryInputRef.current) galleryInputRef.current.value = '';
      if (cameraInputRef.current) cameraInputRef.current.value = '';
    }
  };

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleProcessFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const aspectClass =
    aspectRatio === 'video'
      ? 'aspect-video'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[16/9]'
      : 'min-h-[160px]';

  return (
    <div className={`space-y-1.5 ${className}`}>
      {/* Hidden file inputs: One for Gallery, One for Instant Camera */}
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        className="hidden"
        title="Choose image from gallery"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={onFileSelect}
        className="hidden"
        title="Take photo using camera"
      />

      {/* Label and Status */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5">
          <span>{label}</span>
          {required && <span className="text-red-500 font-bold">*</span>}
        </label>
        {value && (
          <span className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Photo Loaded
          </span>
        )}
      </div>

      {/* Error notification */}
      {error && (
        <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Upload Zone / Live Preview */}
      {value ? (
        /* Image Preview Box */
        <div className="relative rounded-2xl overflow-hidden border border-[#E2DDD6] bg-[#FAF8F4] group shadow-xs">
          <div className={`w-full ${aspectClass} max-h-[260px] bg-neutral-900 flex items-center justify-center overflow-hidden`}>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          </div>

          {/* Action overlay / bar */}
          <div className="p-3 bg-white border-t border-[#E2DDD6] flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => galleryInputRef.current?.click()}
                disabled={isProcessing}
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#F2ECE1] border border-[#E2DDD6] text-[#13362B] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#8C6D3B]" />
                <span>Gallery</span>
              </button>
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                disabled={isProcessing}
                className="px-3 py-1.5 rounded-xl bg-[#FAF8F4] hover:bg-[#F2ECE1] border border-[#E2DDD6] text-[#13362B] text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
              >
                <Camera className="w-3.5 h-3.5 text-[#8C6D3B]" />
                <span>Camera</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => onChange('')}
              className="px-2.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer transition-colors border border-red-200"
              title="Remove photo"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>
      ) : (
        /* Empty Upload Dropzone */
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative rounded-2xl border-2 border-dashed transition-all duration-200 p-4 text-center flex flex-col items-center justify-center gap-2.5 ${
            isDragOver
              ? 'border-[#8C6D3B] bg-[#F4EFE6]'
              : 'border-[#D6CEC3] bg-[#FAF8F4] hover:border-[#8C6D3B] hover:bg-[#F7F3EB]'
          }`}
        >
          {isProcessing ? (
            <div className="py-6 flex flex-col items-center gap-2 text-[#13362B]">
              <RefreshCw className="w-6 h-6 animate-spin text-[#8C6D3B]" />
              <span className="text-xs font-mono font-bold">Compressing & optimizing photo...</span>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-xl bg-white border border-[#E2DDD6] shadow-xs flex items-center justify-center text-[#8C6D3B]">
                <UploadCloud className="w-5 h-5" />
              </div>

              <div className="space-y-0.5">
                <p className="text-xs font-mono font-bold text-[#1A1917]">
                  Upload from gallery or snap an instant photo
                </p>
                <p className="text-[10px] font-mono text-[#6B6560]">
                  {helperText || 'Supports JPG, PNG, WEBP • Auto-compressed for rapid loading'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-0.5 flex-wrap justify-center">
                <button
                  type="button"
                  onClick={() => galleryInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-[#13362B] hover:bg-[#1b483a] text-[#C8AA7A] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm transition-colors"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Choose from Gallery</span>
                </button>

                <button
                  type="button"
                  onClick={() => cameraInputRef.current?.click()}
                  className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-50 border border-[#8C6D3B]/40 text-[#13362B] text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                >
                  <Camera className="w-3.5 h-3.5 text-[#8C6D3B]" />
                  <span>Take Instant Photo</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
