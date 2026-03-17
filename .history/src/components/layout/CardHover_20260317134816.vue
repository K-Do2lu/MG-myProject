<template>
    <div class="base-card-hover">

        <div class="hover-type active">
            <div class="hover-type__title">
                <p class="hover-type__title--text">IT 시스템 구축(SI)</p>
                <p class="hover-type__title--desc">IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.</p>
            </div>
            <div class="hover-type__img">
                <img src="@/assets/images/main_hover_01.png" alt="">
            </div>
        </div>

        <div class="hover-type" :class="{active: isActive}"
        @mouseenter="isActive = true" @mouseleave="isActive = false">
            <div class="hover-type__title">
                <p class="hover-type__title--text">IT 시스템 구축(SI)</p>
                <p class="hover-type__title--desc">IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.</p>
            </div>
            <div class="hover-type__img">
                <img src="@/assets/images/main_hover_01.png" alt="">
            </div>
        </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';


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
            &--desc{display: none;}
        }
        &__img{
            position: absolute;
            
            height: 100%;
            img{height: 100%;}
        }

        &.active{
            position: inherit;
            width: 487px;
            &::before{display: none;}

            
            .hover-type__title{
            position: inherit;
            @include ab.clamp-size('padding-inline', ab.$cardHover-padding-inline-mo, ab.$cardHover-padding-inline);
            padding-block: 24px;
            color: ab.$color-scale-100;
            
            p{line-height: 1.5;}
            &--text{ margin-bottom: 16px; font-size: ab.$cardHover-font; font-weight: 600;}
            &--desc{display: block; color: ab.$color-txt-sub;}
            }
            .hover-type__img{
                position: inherit !important;
            }
        }


    }
}

</style>