<template>
    <div class="sub-banner">
        <div class="sub-banner__img">
            <span class="sub-text">{{ props.bannerText }}</span>
            <img src="@/assets/images/sub_banner.png" alt="sub-banner">
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    bannerText: {
        type: String,
        default: ''
    }
})

</script>

<style scoped lang="scss">

</style>