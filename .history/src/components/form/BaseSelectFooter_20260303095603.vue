<template>
    <div class="font-field">
        <div class="form-select">
            <button
            type="button"
            >
                <span class="form-select__value">
                    <slot name="value"></slot>
                </span>
            </button>
        </div>
    </div>
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>