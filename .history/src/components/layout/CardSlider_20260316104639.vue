<template>
    <div class="card-slider">
        <BaseCard v-for="card in cardList" :key="card.id" :card="card" />
    </div>
</template>

<script setup>
const cardList = [
    {}
        id: 1,
        title: 'Card 1',
        content: 'Card 1 content',
    },
    {
        id: 2,
        title: 'Card 2',
        content: 'Card 2 content',
    },
]


</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;
</style>