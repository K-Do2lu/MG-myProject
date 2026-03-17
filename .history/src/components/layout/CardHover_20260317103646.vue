<template>
    <div class="base-card-hover">


        <!-- Type: basic -->
        <div class="card-list">
            <div class="card-list--item">
                <div class="item-text">
                    <p class="item-text--title">IT 시스템 구축(SI)</p>
                    <p class="item-text--content">IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.</p>
                </div>
            </div>
        </div>

        <!-- <div class="hover-type active">
            <div class="hover-type__title">
                <p class="hover-type__title-text">IT 시스템 구축(SI)</p>
                <p>IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.</p>
            </div>
            <div class="hover-type__img">
                <img src="@/assets/images/main_hover_01.png" alt="">
            </div>
        </div>

        <div class="hover-type">
            <div class="hover-type__title">
                <p class="hover-type__title-text">IT 시스템 구축(SI)</p>
                <p v-if="test">IT시스템 인프라(H/W, S/W, N/W) 납품, 업무시스템 분석·설계 및 개발, 데이터 설계 및 이관사업까지 고객이 필요한 환경에 맞추어 IT시스템을 구축하여 드립니다.</p>
            </div>
            <div class="hover-type__img">
                <img src="@/assets/images/main_hover_01.png" alt="">
            </div>
        </div> -->


    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.card-list{
    @include ab.flex(flex);
    &--item{
        @include ab.flex(flex, null, center);
        // min-width: calc(1200px / 5 - 32px);
        min-width: 487px;
        min-height: 280px;
        position: relative;
        border-radius: ab.$cardHover-radius;
        border: 1px solid ab.$color-scale-100;
        background: transparent;
        overflow: hidden;

        .item-text{
            position: absolute;
            background: #eee;
            flex: 1 0 70%;
            @include ab.clamp-size('padding-inline', ab.$cardHover-padding-inline-mo, ab.$cardHover-padding-inline);
            padding-block: ab.$cardHover-padding-block;
            p{line-height: 1.5;}
            &--title{margin-bottom: 16px; font-size: 18px; font-weight: 600;}
            &--content{font-size: 16px;}
        }

        
    }
}

.base-card-hover{
    @include ab.flex(flex);

    // .hover-type {
    //     @include ab.flex(flex, null, stretch, space-between);
    //     flex-wrap: wrap;
    //     max-width: 487px;
    //     min-width: 487px;
    //     height: 280px;
    //     border: 1px solid ab.$color-scale-100;
    //     border-radius: ab.$cardHover-radius;
    //     overflow: hidden;

    //     &__title{
    //         @include ab.flex(flex, column, null, center);
    //         flex: 1 0 50%;
    //         padding: ab.$cardHover-padding-block;
    //         @include ab.clamp-size('padding-inline', ab.$cardHover-padding-inline-mo, ab.$cardHover-padding-inline);
    //         line-height: 1.5;
    //     }
    //     &__title-text{
    //         margin-bottom: 16px;
    //         font-weight: 600;
    //         font-size: ab.$cardHover-font;
    //         line-height: 1.5;
    //         }
    //     &__img{
    //         flex: 1 0 20%;
    //         background: #eee;
    //         img{
    //             width: 100%;
    //             height: 100%;
    //         }
    //     }
    // }
}

</style>