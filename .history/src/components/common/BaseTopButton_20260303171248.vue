<template>
    <button
        type="button"
        class="btn-top"
        @click="scrollToTop"
        aria-label="위로 이동"
    >
        <img src="@/assets/images/icons/ico_arrow_top.svg" alt="위로 이동">
    </button>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@scss/abstract" as ab;

.btn-top {
    width: ab.$btn-top-size;
    height: ab.$btn-top-size;
    background-color: a$btn-top-bg;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    position: fixed;
    bottom: 20px;
    right: 20px;
}
</style>