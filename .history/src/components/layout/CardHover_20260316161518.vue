<template>
    <div class="base-card-hover">


        <div class="hover-type">
            <div class="hover-type__title">
                <p class="hover-type__title-text">IT 시스템 구축(SI)</p>
                <p>서브텍스트</p>
            </div>
            <div class="hover-type__img">
                <img src="@/assets/images/main_hover_01.png" alt="">
            </div>
        </div>


    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.base-card-hover{
    .hover-type{
        @include ab.flex(flex, null, center, space-between);
        border: 1px solid ab.$color-scale-100;
        border-radius: ab.$cardHover-radius;
        overflow: hidden;

        
    }
}

</style>