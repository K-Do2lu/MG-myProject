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
                <button type="button" class="modal-banner__indicator-item">
                    <
                    <span class="visually-hidden">1번 배너 보기</span>
                </button>
                <span class="modal-banner__indicator-item-count">1/2</span>
                <button type="button" class="modal-banner__indicator-item">
                    >
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
    @include ab.flex(flex, column, stretch);
    max-width: 360px;
    max-height: 2;
    border: 1px solid ab.$color-scale-10;
    border-radius: 30px;
    box-shadow: 5px 5px 20px 0 rgba(0, 0, 0, 0.1);
    overflow: hidden;

    .base-modal-banner{
        position: relative;
        flex: 0 1 60%;
        background: #eee;
        &__img{
            background: red;
        }
        &__indicator{
            position: absolute;
            top: 20px;
            right: 20px;
        }
    }

    .base-modal-control{
        @include ab.flex(flex, null, center, space-between, 10px);
        button {border: none; background: none; padding: 0; cursor: pointer;}

    }
}
</style>