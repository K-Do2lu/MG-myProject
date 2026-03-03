<template>
     <BaseSelect
    v-bind="$attrs"
    :label="label"
    :placeholder="placeholder"
    :options="options"
    variant="footer"
    v-on="listeners"
  />
</template>

<script setup></script>

<style lang="scss" scoped>
@use "@scss/components/_form.scss";
</style>