<template>
    <div class="card-slider">
        <button type="button" class="card-slider__prev">
            <span class="visually-hidden">이전</span>
            <img src="@/assets/images/icons/ico_slider_leftArrow.png" alt="">
        </button>
        <div class="card-slider__track">
            <BaseCard
            v-for="card in cardList"
            :key="card.id"
            :date="card.date"
            :title="card.title"
            :content="card.content" />
        </div>
        <button type="button" class="card-slider__next">
            <span class="visually-hidden">다음</span>
            <img src="@/assets/images/icons/ico_slider_rightArrow.png" alt="">
        </button>
    </div>
</template>

<script setup>
const cardList = [
    {
        id: 1,
        date: '2026-03-16',
        title: 'Card 1',
        content: 'Card 1 content',
    },
    {
        id: 2,
        date: '2026-03-16',
        title: 'Card 2',
        content: 'Card 2 content',
    },
    {
        id: 3,
        date: '2026-03-16',
        title: 'Card 3',
        content: 'Card 3 content',
    },
    {
        id: 4,
        date: '2026-03-16',
        title: 'Card 4',
        content: 'Card 4 content',
    },
    {
        id: 5,
        date: '2026-03-16',
        title: 'Card 5',
        content: 'Card 5 content',
    },
    {
        id: 6,
        date: '2026-03-16',
        title: 'Card 6',
        content: 'Card 6 content',
    },

]


</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.card-slider{
    @include ab.flex(flex, null, center, null, 20px);

    button{
        @include ab.clamp-size("width", ab.$card-btn-size-mo, ab.$card-btn-size);
        @include ab.clamp-size("height", ab.$card-btn-size-mo, ab.$card-btn-size);
        background: ab.$color-scale-0;
        border: 1px solid ab.$card-btn-border;
        border-radius: 50%;
        padding: 0;
        margin: 0;
        cursor: pointer;
    }
}
.card-slider__track{
    @include ab.flex(flex, null, null, null, 20px);
    flex: 1 1 calc(100% / 3 - 40px);
    max-width: 1200px;
    overflow: hidden;
}

</style>