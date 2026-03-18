<template>
  <section class="page main-page">

    <div class="main-cont banner">


      <div class="banner-wrapper"
      >
        <ul
        class="banner-list"
        :style="bannerStyle"
        >
          <li
          class="banner-item"
          :class="{'active': currentIndex === idx}"
          v-for="(item, idx) in banners"
          :key="idx ?? item.id"
          :id="`banner-panel-${idx}`"
          >
            <img :src="$getImg(item.img)" :alt="item.alt">
          </li>
        </ul>

          <!-- indicator -->
          <div class="banner-indicator" role="tablist" aria-label="메인 배너 선택">
            <button
              type="button"
              class="banner-indicator-item"
              :class="{ 'active': currentIndex === idx }"
              :aria-selected="currentIndex === idx"
              :aria-controls="`banner-panel-${idx}`"
              v-for="(item, idx) in banners"
              :key="item.id"
              role="tab"
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
import { ref, computed, onMounted, onUnmounted } from 'vue';

const banners = ref([
  { id: 1, img: 'main_img_01.png', alt: '메인 배너 이미지1' },
  { id: 2, img: 'main_img_02.png', alt: '메인 배너 이미지2' },
]);

const currentIndex = ref(0);
const gotoSlide = (idx) => {
  currentIndex.value = idx;
}
const bannerStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 50}%)`
}));

// 타이머 변수
let bannerTimer = null;
// 다름 슬라이드로 넘기는 함수 추가
const nextSlide = () => {
  const lastIndex = banners.value.length - 1;
  currentIndex.value = currentIndex.value < lastIndex ? currentIndex.value + 1 : 0;
}
// 시작/정지 함수 추가
const startAutoplay = () => {
  if (bannerTimer) return;
  
}

</script>
  
<style lang="scss" scoped>
@use '@scss/pages/_main.scss';
</style>