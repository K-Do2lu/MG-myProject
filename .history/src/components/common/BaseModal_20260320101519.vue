<template>
    <div
    class="base-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-banner-title"
    v-if="isShow"
    >
        <h3 id="modal-banner-title" class="visually-hidden">모달 배너</h3>
        
        <div class="base-modal-banner" @mouseenter="stop" @mouseleave="start">
            <!-- banner img: trackStyle = useSlider 가 주는 width / translateX -->
             <div class="base-modal-banner--wrap" :style="trackStyle" aria-live="off">
                <div
                class="base-modal-banner__img"
                v-for="(banner, idx) in banners"
                :key="idx"
                :style="{ flex: `0 0 ${100 / len}%` }"
                >
                    <a :href="banner.href" target="_blank">
                        <img :src="$getImg(banner.src)" :alt="banner.alt">
                    </a>
                </div>
            </div>
            <!-- /banner img -->

            <!-- indicator -->
            <nav class="base-modal-banner__indicator" v-if="showNav">
                <button type="button" class="indicator-btn indicator-btn--left" @click="gotoBanner(-1)" :disabled="disableIndicator.left">
                    <span class="visually-hidden">이전 배너</span>
                </button>
                <span class="indicator-item--count">{{ currentIndex + 1 }}/{{ len }}</span>
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
import { useSlider } from '@/composables/useSlider';

const isShow = ref(true);
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

    // 자동 재생 시작 (useSlider)
    start();
})

const hideModalToday = () => {
    const now = new Date();
    // 현재 시간 + 24시간의 타임스탬프 계싼
    const expiry = now.setHours(23, 59, 59, 999);

    localStorage.setItem(STORAGE_KEY, expiry.toString());
    isShow.value = false;
}

// 배너 이미지 (ref 로 두고 useSlider 에 넘김 → 개수 변경에도 반응)
const banners = ref([
    { src: 'main_banner_02.png', alt: '모달 배너 이미지2', href: 'https://mgdshop.co.kr/main/index.do' },
     { src: 'main_banner_02.png', alt: '모달 배너 이미지2', href: 'https://mgdshop.co.kr/main/index.do' },
]);

const {
    currentIndex,
    len,
    showNav,
    trackStyle,
    next,
    prev,
    start,
    stop,
} = useSlider(banners, {
    loop: true,
    autoplay: true,
    interval: 3000,
});

// 자동 재생은 루프(loop)지만, 버튼은 끝/처음에서 막기 (기존 UX 유지)
const gotoBanner = (dir) => {
    const n = len.value;
    if (dir === 1) {
        if (currentIndex.value < n - 1) currentIndex.value += 1;
    } else {
        if (currentIndex.value > 0) currentIndex.value -= 1;
    }
};

const disableIndicator = computed(() => ({
    left: currentIndex.value === 0,
    right: currentIndex.value === len.value - 1,
}));
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
    z-index: ab.$z-modal;

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
            /* width / transform 은 useSlider trackStyle 인라인으로 제어 */
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
            bottom: 10px;
            right: 10px;
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