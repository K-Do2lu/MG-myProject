<template>
    <a class="link-btn" target="_blank">
        <slot></slot>
    </a>

</template>

<script setup>
const props = defineProps({
    href: {
        type: Strihref ng,
        required: true,
    },
});

</script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.link-btn{
    padding: 12px 20px;
    font-weight: 600;
    color: ab.$btn-link-text;
    @include ab.clamp-size('font-size', ab.$btn-link-text-size-mo, ab.$btn-link-text-size);
    border-radius: 4px;
    background: ab.$btn-link-bg;
}



</style>