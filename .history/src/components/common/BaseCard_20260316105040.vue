<template>
    <div class="base-card">
        <time :datetime="date">{{ date }}</time>
        <div>
            <p class="base-card__title">{{ title }}</p>
            <p class="base-card__content">{{ content }}</p>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.base-card{
    @include ab.flex(flex, column, null, space-between);
    height: ab.$card-height;
    padding: ab.$card-padding;
    border-radius: ab.$card-radius;
    background: ab.$color-scale-0;
    box-shadow: ab.$card-shadow;
    transition: all 0.3s ease-in-out;
    time{
        font-size: ab.$card-date-font;
        font-weight: 600;
        line-height: 1.5;
    }
    .base-card__title{
        margin-bottom: 16px;
        font-size: ab.$card-title-font;
        font-weight: 600;
        line-height: 1.5;

    }
    .base-card__content{
        @include ab.ellipsis(2);
        font-size: ab.$card-content-font;
        color: ab.$color-txt-sub;
        transition: all 0.3s ease-in-out;
        line-height: 1.5;
    }

    &:hover{
        background: ab.$card-bg-hover;
        color: ab.$card-color-hover;
        cursor: pointer;
        .base-card__content{color: ab.$color-scale-0;}
    }
}

</style>