<template>
    <div class="base-modal" role="dialog" aria-modal="true" aria-labelledby="modal-banner-title">
        <h3 id="modal-banner-title" class="visually-hidden">모달 배너</h3>
        
        <div class="base-modal-banner">
            <!-- banner img -->
            <div class="modal-banner__img">
                <img src="@/assets/images/main_banner_01.png" alt="모달 배너 이미지">
            </div>
            <!-- /banner img -->

            <!-- indicator -->
            <nav class="modal-banner-indicator">
                <button type="button" class="modal-banner-indicator-item">
                    <
                    <span class="visually-hidden">1번 배너 보기</span>
                </button>
                <span class="modal-banner-indicator-item-count">1/2</span>
                <button type="button" class="modal-banner-indicator-item">
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
.base-modal{
    max-width: 360px;
}
</style>