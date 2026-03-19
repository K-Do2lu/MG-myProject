<template>
    <div class="base-modal" role="dialog" aria-modal="true" aria-labelledby="modal-banner-title">
        <h3 id="modal-banner-title" class="visually-hidden">모달 배너</h3>
        
        <div class="base-modal-banner">
            <!-- banner img -->
            <div class="base-modal-banner__img">
                <img src="@/assets/images/main_banner_01.png" alt="모달 배너 이미지">
            </div>
            <!-- /banner img -->

            <!-- indicator -->
            <nav class="base-modal-banner__indicator">
                <button type="button" class="indicator-btn indicator-item--left">
                    <span class="visually-hidden">1번 배너 보기</span>
                </button>
                <span class="indicator-item-count">1/2</span>
                <button type="button" class="indicator-btn indicator-item--right">
                    <span class="visually-hidden">2번 배너 보기</span>
                </button>
            </nav>
            <!-- /indicator -->
        </div>
        


        <div class="base-modal-control">
            <button type="button" class="base-modal__dont-today">오늘 그만보기</button>
            <button type="button" class="base-modal__close">닫기</button>
        
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.base-modal{
    @include ab.flex(flex, column, stretch, space-between);
    max-width: 360px;
    height: 260px;
    border: 1px solid ab.$color-scale-10;
    border-radius: 30px;
    box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    button {
        border: none; background: none; padding: 0; cursor: pointer;
    }
    

    .base-modal-banner{
        position: relative;
        flex: 0 1 80%;
        background: #eee;
        &__img{
            height: 100%;
            img{height: 100%;}
        }
        &__indicator{
            position: absolute;
            top: 20px;
            right: 20px;
            border-radius: 50px;
            background: rgba($color: #000000, $alpha: 0.5);
            color: ab.$color-scale-0;

            .indicator-btn{
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 20px;
                height: 20px;
                border-radius: 50%;
            }
        }
    }

    .base-modal-control{
        flex: 0 1 20%;
        padding: 4px 20px;
        @include ab.flex(flex, null, center, space-between, 10px);
        }
}

// width: 20p;
//                 height: 20px;
//                 background: url('@/assets/images/icons/ico_modal_arrow.svg') no-repeat center center / 100% 100%;
</style>