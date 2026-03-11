<template>
    <div class="badge-grp"></div>
    <div class="badge-grp--item" v-for="(item, idx) in badgeList" :key="idx">
        <span class="badge" :class="item.color">
            {{ item.badge }}
        </span>
        {{ item.text }}
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
const badgeList = [
    {badge: "지하철 9호선", text: '가양역 8번 출구', color: 'nine'},
    {badge: "일반버스", text: '605, 654, 661, N26', color: 'normal'},
    {badge: "좌석버스", text: '60, 60-3, 88', color: 'seat'},
    {badge: "직행", text: '8000', color: 'direct'},
    {badge: "공항", text: '6003', color: 'airport'},
]

</script>

<style lang="scss">
@use "@scss/abstract/" as ab;

.badge-grp--item{
    @include ab.flex(inline-flex, null, center, null, 6px);
    @include ab.clamp-size('font-size', 15px, 18px);
    color: ab.$color-txt-sub;

    .badge{
        display: inline-block;
        padding: ab.$sub-location-badge-padding;
        border-radius: 30px;
        border: 1px solid transparent;
        @include ab.clamp-size('font-size', ab.$sub-badge-font-mo, ab.$sub-badge-font);
        @media (max-width: ab.$bp-tablet) {padding: ab.$sub-location-badge-padding-mo;}
        &.nine{border-color: ab.$sub-location-badge-nine; color: ab.$sub-location-badge-nine;}
        &.normal{border-color: ab.$sub-location-badge-normal; color: ab.$sub-location-badge-normal;}
        &.seat{border-color: ab.$sub-location-badge-seat; color: ab.$sub-location-badge-seat;}
        &.direct{border-color: ab.$sub-location-badge-direct; color: ab.$sub-location-badge-direct;}
        &.airport{border-color: ab.$sub-location-badge-airport; color: ab.$sub-location-badge-airport;}
    }
    & + .badge-grp{ margin-left: 20px;}
}
</style>
