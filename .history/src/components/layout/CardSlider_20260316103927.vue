<template>
    <div class=""></div>
</template>

<script setup>
const props = defineProps({
    cardList: {
        type: Array,
        required: true,
    },
})
</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.card-slider{
    @include ab.flex(flex, null, null, space-between);
    gap: 20px;
}
</style>