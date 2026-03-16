<template>
    <div class="card-slider">
        <BaseCard v-for="card in cardList" :key="card.id" :card="card" />
    </div>
</template>

<script setup>
const cardList = [
    {
        id: 1,
        title: 'Card 1',
        content: 'Card 1 content',
    },
    {
        id: 2,
        title: 'Card 2',
        content: 'Card 2 content',
    },
    {
        id: 3,
        title: 'Card 3',
        content: 'Card 3 content',
    },
    {
        id: 4,
        title: 'Card 4',
        content: 'Card 4 content',
    },
    {
        id: 5,
        title: 'Card 5',
        content: 'Card 5 content',
    },
    {
        id: 6,
        title: 'Card 6',
        content: 'Card 6 content',
    },

]


</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;
</style>