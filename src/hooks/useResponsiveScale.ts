import { useEffect, useState } from 'react';

interface UseResponsiveScaleOptions {
  originalWidth: number; // 원본 디자인 너비 (예: 353px)
  containerPadding?: number; // 좌우 padding (기본값: 20px)
}

interface ScaleValues {
  scale: number;
  scaledWidth: number;
  scaledHeight: number;
  transformOrigin: string;
}

/**
 * 화면 너비에 맞게 비율을 유지하며 스케일하는 훅
 * @param originalWidth - 원본 디자인의 너비
 * @param containerPadding - 좌우 padding (기본값: 20px)
 * @returns scale, scaledWidth, scaledHeight, transformOrigin
 */
export const useResponsiveScale = ({
  originalWidth,
  containerPadding = 20,
}: UseResponsiveScaleOptions): ScaleValues => {
  const [scaleValues, setScaleValues] = useState<ScaleValues>(() => {
    if (typeof window === 'undefined') {
      return {
        scale: 1,
        scaledWidth: originalWidth,
        scaledHeight: Math.round(originalWidth * 2.23),
        transformOrigin: 'top center',
      };
    }

    const availableWidth = window.innerWidth - containerPadding * 2;
    const scale = availableWidth / originalWidth;
    const scaledHeight = Math.round(availableWidth * 2.23);

    return {
      scale,
      scaledWidth: availableWidth,
      scaledHeight,
      transformOrigin: 'top center',
    };
  });

  useEffect(() => {
    const updateScale = () => {
      if (typeof window === 'undefined') return;

      // 사용 가능한 너비 계산 (화면 너비 - 좌우 padding)
      const availableWidth = window.innerWidth - containerPadding * 2;
      
      // 스케일 비율 계산
      const scale = availableWidth / originalWidth;
      const scaledHeight = Math.round(availableWidth * 2.23);
      
      setScaleValues({
        scale,
        scaledWidth: availableWidth,
        scaledHeight,
        transformOrigin: 'top center',
      });
    };

    // 윈도우 리사이즈 이벤트 리스너
    window.addEventListener('resize', updateScale);
    
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [originalWidth, containerPadding]);

  return scaleValues;
};

export default useResponsiveScale;
