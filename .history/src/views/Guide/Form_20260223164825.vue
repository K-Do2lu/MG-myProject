<template>
    <h1>Form</h1>
    <section>
        <div class="cont">
            <div class="bx">
                <h2><em>Input</em></h2>
                <div class="bx">


      


                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
    defineProps<{
        modelValue: string
        label?: string
        placeholder?: string
        error?: string
        }>()

    defineEmits<{
    'update:modelValue': [value: string]
    }>()
</script>

<style lang="scss" scoped></style>