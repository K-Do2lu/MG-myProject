<template>
    <div class="badge-cont" v-for="(item, idx) in badgeList" :key="idx">
        <span class="badge"  :class="item.color">
            {{ item.badge }}
        </span>

    </div>

</template>

<script setup>
const props = defineProps({
    badgeList: {
        type: Array,
        default: () => [],
    },
});

// 다른 파일에서 import 할 때 아래와 같이 데이터를 주세요
// const badgeList = [
//     {badge: "지하철 9호선", color: 'nine'},
//     {badge: "일반버스", color: 'normal'},
//     {badge: "좌석버스", color: 'seat'},
//     {badge: "직행", color: 'direct'},
//     {badge: "공항", color: 'airport'},
// ]

</script>

<style lang="scss">
@use "@scss/abstract/" as ab;
</style>
