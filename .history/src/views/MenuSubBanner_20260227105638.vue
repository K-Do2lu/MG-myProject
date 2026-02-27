<template>
    <div class="sub-banner">
        <div class="sub-banner__img">
            <span>{{ bannerText[0] }}</span>
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

const bannerText = [ 'COMPANY','BUSINESS', 'NOTICE',
    'RECRUIT'
]
</script>

<style scoped lang="scss"></style>