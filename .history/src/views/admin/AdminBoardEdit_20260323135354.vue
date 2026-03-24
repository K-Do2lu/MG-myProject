<template>
     <el-tabs v-model="activeTab" tab-position="left"    @tab-click="onTabClick">
      <el-tab-pane v-for="(item, idx) in tabList"
      :key="item.name" :name="item.name" :label="item.label">
      </el-tab-pane>
      
      <div class="guide-content">
        <router-view />
      </div>
  </el-tabs>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>