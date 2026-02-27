<template>
    <div class="base-tabs">
        <!-- 탭 버튼 영역 -->
         <div class="base-tab__list" role="tablist"></div>
            <button
                v-for="(tab, index) in tabs"
                :key="index"
                type="button"
                role="tab"
                :aria-controls="`tab-panel-${index}`"
                :aria-selected="activeTab === index"
            >
                {{ tab.label }}
            </button>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@scss/components/_tab.scss";
</style>