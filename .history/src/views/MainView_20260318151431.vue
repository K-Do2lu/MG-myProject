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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';

const banners = ref([
  {id: 1, img: 'main_img_01.png', alt: '메인 배너 이미지1'},
  {id: 2, img: 'main_img_02.png', alt: '메인 배너 이미지2'},
])

const renderBanners = computed(() => {
  if(!banners.value.length) return [];
  return [...banners.value, banners.value[0]];
})

// currentIndex 랑 타이머 변수 만들기
const currentIndex = ref(0); //지금 몇번쨰 배너인지
const isTransitionOn = ref(true); // 순간 점프할 때만 false
let bannerTimer = null; //setInterval 저장할 변수

const gotoSlide = (idx) => {
  // 인디케이터 클릭 시: 실제 배너 인덱스로 이동
  isTransitionOn.value = true;
  currentIndex.value = idx; // 0 또는 1
}

const slideStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * 100}%)`,
  transition: isTransitionOn.value ? 'transform 0.5s ease-in-out' : 'none',
}));

// 인디케이터 버튼 클릭 시 이동
const nextSlide = () => {
  // 마지막 인덱스(복제 A)까지는 그냥 +1
  if (currentIndex.value < renderBanners.value.length - 1) {
    isTransitionOn.value = true;
    currentIndex.value += 1;
  }
  // 여기서는 굳이 else에서 0으로 돌리지 않음
  // 0으로 돌리는 건 transition 끝난 뒤에 처리 (handleTransitionEnd)
}
// 자동 슬라이드 시작/정지 함수
const startAutoPlay = () => {
  if(bannerTimer) return; //이미 돌고 있으면 중복 생성 방지
  bannerTimer = setInterval(nextSlide, 2000); //~초마다 다음 슬라이드로 이동
}

const stopAutoPlay = () => {
  if(!bannerTimer) return;
  clearInterval(bannerTimer);
  bannerTimer = null;
}

onMounted(() => {
  startAutoPlay();
})

onUnmounted(() => {
  stopAutoPlay();
})

const handleTransitionEnd = () => {
  const realLength = banners.value.length;
  // 복제 슬라이드(마지막 인덱스)에 도착했을 때만 처리
  if (currentIndex.value === realLength) {
    // 1) transition 끄고
    isTransitionOn.value = false;
    // 2) 인덱스를 진짜 첫 슬라이드(0)로 점프
    currentIndex.value = 0;
    // 3) DOM 갱신 후 다시 transition 켬
    nextTick(() => {
      isTransitionOn.value = true;
    });
  }
};


</script>
  
<style scoped>
@use '@scss/pages/_main.scss';
</style>