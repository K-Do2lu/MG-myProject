<template>
    <span class="badge" v-for="(item, idx) in badgeList" :key="idx" :class="item.color">{{ item.badge }}</span>

</template>

<script setup>
const props = defineProps({
    badgeList: {
        type: Array,
        default: () => [],
    },
});

const badgeList = [
    {badge: "지하철 9호선", color: 'nine'},
    {badge: "일반버스", color: 'normal'},
    {badge: "좌석버스", color: 'seat'},
    {badge: "직행", color: 'direct'},
    {badge: "공항", color: 'airport'},
]

</script>

<style lang="scss">
@use "@scss/abstract/" as ab;
</style>
