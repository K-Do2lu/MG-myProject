<template>
    <div class="base-card-hover">

        <div class="hover-type" v-for="(item, idx) in hoverCards" :key="idx" :class="{active: isActive}" 
        @mouseenter="onEnter(idx)" @mouseleave="onLeave(idx)">
            <div class="hover-type__title">
                <p class="hover-type__title--text">
                    {{ item.title }}
                    <template v-if="item.title2 && !isActive">
                        <br>
                        {{ item.title2 }}
                    </template>
                    <template v-else-if="item.title2">
                        {{ ' ' + item.title2 }}
                    </template>
                </p>
                <p class="hover-type__title--desc">{{ item.desc }}</p>
            </div>
            <div class="hover-type__img">
                <img :src="$getImg(item.img)" alt="">
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
const isActive = ref(false);

const hoverCards = ref([
    {title: 'IT 시스템 구축', title2: '(SI)',
    desc: 'IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.',
    img: 'main_hover_01.png'},
    {title: 'IT 시스템', title2: '위탁운영',
    desc: 'IT 인프라 운영부터 전문가 상주지원까지 고객이 안심하고 핵심 업무에 집중 할 수 있도록, IT시스템 일상적 운영에 대한 통합 아웃소싱을 제공합니다.',
    img: 'main_hover_02.png'},
    {title: '금융 점포', title2: '통합 전산 서비스',
    desc: '새마을금고 본, 지점에서 사용하고 있는 IT장비의 납품부터 유지보수까지 새마을금고 창구에서 필요로 하는 모든 종류의 IT서비스를 제공합니다.',
    img: 'main_hover_03.png'},
    {title: '애플리케이션', title2: '개발',
    desc: '고객의 요구에 맞추어진 최적의 업무프로그램 이용환경을 제공하기 위하여, 업무프로 개발 및 유지보수를 함께 제공하고 있습니다.',
    img: 'main_hover_04.png'},
    {title: '인프라', title2: '통합유지보수',
    desc: 'IT센터에 위치하는 모든 종류의 IT인프라(H/W, S/W, N/W)에 대한 유지보수 및 기술지원을 제공하여 드립니다.',
    img: 'main_hover_05.png'},
])

const onEnter = (idx) => {
    activeIndex.value = idx
}
const onLeave = (idx) => {
  // 나갈 때 전부 비활성화
  if (activeIndex.value === idx) {
    activeIndex.value = null
  }
}


</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;



.base-card-hover{
    @include ab.flex(flex);

    .hover-type{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 165px;
        min-width: 165px;
        min-height: 280px;
        border-radius: ab.$cardHover-radius;
        border: 1px solid ab.$color-scale-100;
        overflow: hidden;
        cursor: pointer;
        transition: width .5s ease-in-out, min-width 0.5s ease-in-out;

        &::before{
            content: '';
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,.5);
            z-index: ab.$z-base + 1;
        }

        &__title{
            position: absolute;
            color: ab.$color-scale-0;
            z-index: ab.$z-base + 2;
            &--text{text-align: center;}
            &--desc{display: none;}
            p{
                line-height: 1.5;letter-spacing: -0.02em; line-height: 1.6; word-break: keep-all;
            }
        }

        &__img{
            position: absolute;
            
            height: 100%;
            img{height: 100%;}
        }

        &.active{
            position: inherit;
            width: 487px;
            height: 280px;
            min-height: 280px;
            max-height: 280px;
            &::before{display: none; pointer-events: none;}

            
            .hover-type__title{
            position: inherit;
            @include ab.clamp-size('padding-inline', ab.$cardHover-padding-inline-mo, ab.$cardHover-padding-inline);
            padding-block: 24px;
            color: ab.$color-scale-100;
            
            p{line-height: 1.5;letter-spacing: -0.02em; line-height: 1.6; word-break: keep-all;}
            &--text{ margin-bottom: 16px; font-size: ab.$cardHover-font; font-weight: 600; text-align: left;}
            &--desc{display: block; color: ab.$color-txt-sub;}
            }
            .hover-type__img{
                position: inherit !important;
            }
        }


    }
}

</style>