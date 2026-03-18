<template>
  <section class="page main-page">

    <div class="main-cont banner">


      <div class="banner-wrapper">
        <ul class="banner-list">
          <li
          class="banner-item"
          v-for="(item, idx) in banners"
          :key="idx"
          :id="item.id"
          role="tabpanel"
          >
            <img :src="$getImg(item.img)" :alt="item.alt">
          </li>
        </ul>

        <!-- indicator -->
        <div class="banner-indicator" role="tablist" aria-label="메인 배너 선택">
        <button
        type="button"
        class="banner-indicator-item"
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
import { ref } from 'vue';

const banners = ref([
  {id: 1, img: 'main_img_01.png', alt: '메인 배너 이미지1'},
  {id: 2, img: 'main_img_02.png', alt: '메인 배너 이미지2'},
])

// currentIndex 랑 타이머 변수 만들기
const currentIndex = ref(0); //지금 몇번쨰 배너인지
let bannerTimer = null; //setInterval 저장할 변수

const gotoSlide = (idx) => {
  currentIndex.value = idx;
}

// 인디케이터 버튼 클릭 시 이동
const nextSlide = () => {
  const lastIndex = banners.value.length -1;

  if(currentIndex.value < lastIndex){
    currentIndex.value += 1;
  } else {
    currentIndex.value = 0;
  }
}
// 자동 슬라이드 시작/정지 함수
const startAutoPlay = () => {
  if(bannerTimer) return; //이미 돌고 있으면 중복 생성 방지

}


</script>
  
<style scoped>
@use '@scss/pages/_main.scss';
</style>