<template>
    <div class="sub-banner">
        <div class="sub-banner__img">
            <span></span>
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

const bannerText = [
    {txt: 'COMPANY'},
    {txt: 'BUSINESS'},
    {txt: 'NOTICE'},
    {txt: 'RECRUIT'}
]
</script>

<style scoped lang="scss"></style>