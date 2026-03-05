// 1. 모든 하위 폴더의 이미지를 즉시 가져오기
const rawImages = import.meta.glob('@/assets/images/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// 2. 파일명만 키값으로 가지는 맵 생성
const imageMap = {};

Object.keys(rawImages).forEach((path) => {
  // 경로에서 마지막 파일명만 추출 (예: 'icons/home.svg' -> 'home.svg')
  const fileName = path.split('/').pop(); 
  imageMap[fileName] = rawImages[path].default;
});

/**
 * 파일명만 전달하면 실제 빌드된 이미지 경로를 반환합니다.
 * @param {string} name - 확장자를 포함한 파일명 (예: 'sub_img_06.png')
 */
export const getImg = (name) => {
  if (!imageMap[name]) {
    console.warn(`[ImageLoader] 파일을 찾을 수 없습니다: ${name}`);
    return '';
  }
  return imageMap[name];
};