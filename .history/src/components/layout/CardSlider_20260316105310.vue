<template>
    <div class="card-slider">
        <button type="button" class="card-slider__prev">이전</button>
        <div class="card-slider__track">
            <BaseCard
            v-for="card in cardList"
            :key="card.id"
            :date="card.date"
            :title="card.title"
            :content="card.content" />
            <button type="button" class="card-slider__next">다음</button>
        </div>
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
</style>