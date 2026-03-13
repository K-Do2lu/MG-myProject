<template>
    <a :href="href" class="link-btn" target="_blank">
        <slot></slot>
    </a>

</template>

<script setup>
const props = defineProps({
    href: {
        type: String,
        required: true,
    },
});

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.link-btn{
    @include ab.clamp-size('height', 40px, 44px);
    padding: 12px 20px;
    font-weight: 600;
    color: ab.$btn-link-text;
    @include ab.clamp-size('font-size', ab.$btn-link-text-size-mo, ab.$btn-link-text-size);
    text-align: center;
    border-radius: 4px;
    background: ab.$btn-link-bg;
    line-height: 1.5;
    white-space: nowrap;
}

</style>