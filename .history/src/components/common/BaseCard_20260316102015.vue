<template>
    <div class="base-card">
        <time datetime="2026-03-16">2026-03-16</time>
        <p class="base-card__title">[MG데이터시스템] 개인정보처리방침 제정 안내</p>
        <p class="base-card__content">안녕하십니까, MG데이터시스템입니다.</p>
    </div>
</template>

<script setup>
const props = defineProps({
    date: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
})

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.base-card{
    padding: ab.$card-padding;
    border-radius: ab.$card-radius;
    box-shadow: ab.$card-shadow;
}

</style>