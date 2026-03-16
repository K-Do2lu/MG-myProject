<template>
    <div class="card-slider">
        <BaseCard v-for="card in cardList" :key="card.id" :card="card" />
    </div>
</template>

<script setup>
const cardList = [
    {}
]


</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;
</style>