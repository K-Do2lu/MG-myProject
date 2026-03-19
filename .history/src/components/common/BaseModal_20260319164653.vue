<template>
    <div
    class="base-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-banner-title"
    v-if="isShow"
    >
        <h3 id="modal-banner-title" class="visually-hidden">모달 배너</h3>
        
        <div class="base-modal-banner" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
            <!-- banner img -->
             <div class="base-modal-banner--wrap" :style="bannerSlideStyle">
                <div
                class="base-modal-banner__img"
                v-for="(banner, idx) in banners" :key="idx"
                >
                    <img :src="$getImg(banner.src)" :alt="banner.alt">
                </div>
            </div>
            <!-- /banner img -->

            <!-- indicator -->
            <nav class="base-modal-banner__indicator">
                <button type="button" class="indicator-btn indicator-btn--left" @click="gotoBanner(-1)" :disabled="disableIndicator.left">
                    <span class="visually-hidden">이전 배너</span>
                </button>
                <span class="indicator-item--count">{{ currentIndex + 1 }}/{{ banners.length }}</span>
                <button type="button" class="indicator-btn indicator-btn--right" @click="gotoBanner(1)" :disabled="disableIndicator.right">
                    <span class="visually-hidden">다음 배너</span>
                </button>
            </nav>
            <!-- /indicator -->
        </div>
        
        <div class="base-modal-control">
            <button type="button" class="base-modal__dont-today" @click="hideModalToday">오늘 그만보기</button>
            <button type="button" class="base-modal__close" @click="hideModal">닫기</button>
        
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
 
const isShow =ref(true);
// 닫기
const hideModal = () => {
    isShow.value = false;
}
// 오늘 그만보기
const STORAGE_KEY = 'modal-do-not-show-today';
onMounted(() => {
    const expiryDate = localStorage.getItem(STORAGE_KEY);
    const today = new Date();

    // 저장된 날짜가 없거나, 저장된 날짜가 현재 시감보다 과거라면? -> 팝업 보여줌
    if(!expiryDate || today.getTime() > parseInt(expiryDate)){
        isShow.value = true;
    } else {
        // false로 설정, 임시 true
        isShow.value = true;
    }

    // 자동 재생 시작
    startAutoPlay();
})

const hideModalToday = () => {
    const now = new Date();
    // 현재 시간 + 24시간의 타임스탬프 계싼
    const expiry = now.setHours(23, 59, 59, 999);

    localStorage.setItem(STORAGE_KEY, expiry.toString());
    isShow.value = false;
}

// 배너 이미지
const banners = ref([
    {src: 'main_banner_01.png', alt: '모달 배너 이미지1'},
    {src: 'main_banner_02.png', alt: '모달 배너 이미지2'},
])

const currentIndex = ref(0);
let bannerTimer = null;
const nextSlide = () => {
  const len = banners.value.length;
  // $$currentIndex.value = (조건) ? (참일 때 값) : (거짓일 때 값);$$
  currentIndex.value = currentIndex.value < len - 1 ? currentIndex.value + 1 : 0;
};
const startAutoPlay = () => {
      if (bannerTimer) return;
      if (banners.value.length < 2) return; // 1개면 굳이 안 돌림
      bannerTimer = setInterval(nextSlide, 3000);
    };

const stopAutoPlay = () => {
  if (!bannerTimer) return;
  clearInterval(bannerTimer);
  bannerTimer = null;
};

const bannerSlideStyle = computed(() => ({
    transform: `translateX(-${currentIndex.value * 50}%)`,
    transition: 'transform 0.5s ease-in-out'
}))
const gotoBanner = (dir) => {
    const len = banners.value.length;
    if(dir === 1){
        currentIndex.value = currentIndex.value < len - 1 ? currentIndex.value + 1 : 0;
    } else {
        currentIndex.value = currentIndex.value > 0 ? currentIndex.value - 1 : len - 1;
    }
}


const disableIndicator = computed(() => ({
    left: currentIndex.value === 0,
    right: currentIndex.value === banners.value.length - 1,
}))
</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.base-modal{
    position: fixed;
    bottom: 20px; left: 20px;
    @include ab.flex(flex, column, stretch, space-between);
    max-width: 360px;
    @include ab.clamp-size(height, 200px, 260px);
    border: 1px solid ab.$color-scale-10;
    @include ab.clamp-size(border-radius, 20px, 30px);
    box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    button {
        border: none; background: none; padding: 0; cursor: pointer;
    }
    

    .base-modal-banner{
        position: relative;
        flex: 0 1 80%;
        max-height: 80%;
        background: #eee;
        .base-modal-banner--wrap{
            display: flex;
            width: 200%;
            height: 100%;
            .base-modal-banner__img{
                max-height: 100%;
                img{
                    width: 100%;
                    height: 100%;
                    object-position: center;
                }
            }
        }
       
        &__indicator{
            @include ab.flex(flex, null, center, center, 5px);
            max-width: 60px;
            min-width: 60px;
            max-height: 32px;
            position: absolute;
            top: 20px;
            right: 20px;
            border-radius: 50px;
            background: rgba($color: #000000, $alpha: 0.4);
            color: ab.$color-scale-0;

            .indicator-btn{
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 16px;
                height: 16px;
                background: url('@/assets/images/icons/ico_modal_arrow.svg') no-repeat center center / 100% 100%;
                filter: invert(1);
                &:disabled{filter: invert(.4);}
                &--left{transform: rotate(90deg);}
                &--right{transform: rotate(-90deg);}
            }
            .indicator-item--count{
                font-size: 12px;
            }
        }
    }

    .base-modal-control{
        flex: 0 1 20%;
        max-height: 20%;
        padding: 4px 20px;
        @include ab.flex(flex, null, center, space-between, 10px);
        background: ab.$color-scale-0;
        button{
            font-size: 14px; color: ab.$color-scale-70;
            &.base-modal__close{color: ab.$color-txt-main;}
        }
        }

        @media (max-width: 400px) {
            width: calc(100% - 40px);
        }
}
</style>