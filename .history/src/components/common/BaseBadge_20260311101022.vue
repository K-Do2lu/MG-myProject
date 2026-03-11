<template>
    <span class="badge" v-for="(item, idx) in badgeList" :kay="idx" :class="badgeList.color">{{ item.badge }}</span>

</template>

<script setup>
const props = defineProps({

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
