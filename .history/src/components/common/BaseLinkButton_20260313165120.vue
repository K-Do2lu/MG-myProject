<template>
    <a href="#" class="link-btn">
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
    color: ab.$color-scale-0;
    border-radius: 4px;
    background: ab.$color-secondary-30;
}



</style>