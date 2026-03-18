<template>
  <section class="page main-page">

    <div class="main-cont banner">
      <div
        class="banner-wrapper"
        @mouseenter="stopAutoPlay"
        @mouseleave="startAutoPlay"
      >
        <ul
          class="banner-list"
          :style="slideStyle"
          @transitionend="handleTransitionEnd"
        >
          <li
            class="banner-item"
            v-for="(item, idx) in renderBanners"
            :key="idx"
          >
            <img :src="$getImg(item.img)" :alt="item.alt" />
          </li>
        </ul>
        <div class="banner-indicator" role="tablist" aria-label="메인 배너 선택">
          <button
            v-for="(item, idx) in banners"
            :key="item.id"
            type="button"
            class="banner-indicator-item"
            :class="{ active: activeDotIndex === idx }"
            role="tab"
            :aria-selected="activeDotIndex === idx"
            @click="gotoSlide(idx)"
          >
            <span class="visually-hidden">{{ idx + 1 }}번 배너 보기</span>
          </button>
        </div>
      </div>
    </div>


    <div class="main-cont business">
      <h2 class="main-title">사업영역</h2>

      <CardHover />
    </div>

    <div class="main-cont job">
      <h2 class="main-title">채용공고</h2>

      <div class="job-img">
        <a href="https://career.mgdatasystem.co.kr/" target="_blank">
          <img src="/src/assets/images/main_banner_01.png" alt="채용공고 이미지">
        </a>
      </div>

    </div>

    <div class="main-cont notice">
      <h2 class="main-title">공지사항</h2>

      <CardSlider />

    </div>

    <!-- 메인 배너, 카드, 섹션 등 -->

    <!-- Top button -->
    <BaseTopButton/>
  </section>
</template>

<script setup>
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue';
const banners = ref([
  { id: 1, img: 'main_img_01.png', alt: '메인 배너 이미지1' },
  { id: 2, img: 'main_img_02.png', alt: '메인 배너 이미지2' },
]);
// A, B, A'(복제) — 무한 슬라이드용
const renderBanners = computed(() => {
  if (!banners.value.length) return [];
  return [...banners.value, banners.value[0]];
});
const currentIndex = ref(0);
const isTransitionOn = ref(true);
let bannerTimer = null;
const slideStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: isTransitionOn.value ? 'transform 0.5s ease-in-out' : 'none',
}));
const activeDotIndex = computed(() => {
  const realLength = banners.value.length;
  return realLength ? currentIndex.value % realLength : 0;
});
const gotoSlide = (idx) => {
  isTransitionOn.value = true;
  currentIndex.value = idx;
};
const nextSlide = () => {
  if (currentIndex.value < renderBanners.value.length - 1) {
    isTransitionOn.value = true;
    currentIndex.value += 1;
  }
};
const handleTransitionEnd = () => {
  const realLength = banners.value.length; // 2
  if (currentIndex.value === realLength) {
    isTransitionOn.value = false;
    currentIndex.value = 0;
    nextTick(() => {
      isTransitionOn.value = true;
    });
  }
};
const startAutoPlay = () => {
  if (bannerTimer) return;
  bannerTimer = setInterval(nextSlide, 2000);
};
const stopAutoPlay = () => {
  if (!bannerTimer) return;
  clearInterval(bannerTimer);
  bannerTimer = null;
};
onMounted(() => {
  startAutoPlay();
});
onUnmounted(() => {
  stopAutoPlay();
});
</script>
  
<style scoped>
@use '@scss/pages/_main.scss';
</style>