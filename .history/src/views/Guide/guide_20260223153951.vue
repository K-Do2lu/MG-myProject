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

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter() // 이동 시 사용 (router.push)
const route = useRoute() // 정보 읽기 시 사용 (route.name)

// 1. 탭 데이터 배열 (이 부분을 수정하면 메뉴가 바뀜)
const tabList = ref([
  { label: 'Color', name: 'GuideColor' },
  { label: 'Typography', name: 'GuideTypography' },
  { label: 'Form', name: 'GuideForm' },
  { label: 'Layout', name: 'GuideLayout' },
  { label: 'Component', name: 'GuideComponent' },
])

// 현재 URL의 name과 일치하도록 초기값 설정
const activeTab = ref(route.name || 'GuideColor')

// Tab 클릭 시 이동
const onTabClick = (pane: any) => {
  // 탭의 name(예: GuideColor)을 사용하여 해당 라우트로 이동
  router.push({ name: pane.props.name })
}

// 브라우저 뒤로가기/앞으로가기 대응
watch(() => route.name, (newName) => {
  activeTab.value = newName as string
})
</script>

<style>
.demo-tabs {
  height: 400px;
  border: 1px solid #dcdfe6;
}
.custom-label {
  display: flex;
  align-items: center;
  gap: 10px;
}
.content-box {
  padding: 20px;
  color: #333;
}

.guide-content {
  padding: 40px;
  box-sizing: border-box;
   h1{
    font-size: 30px;
    font-weight: bold;
    color: #409EFF;
    &:has(+ section){margin-bottom: 40px;}
  }
  h2{
    font-size: 16px;
    color: #848484;
    &:has(+ div){margin-bottom: 20px;}
    em{font-size: 20px; color:#333;}
  }
  section{
    > .cont{
      margin-bottom: 60px;
      padding-bottom: 8px;
      border-bottom: 1px solid #333;
      &:has(.bx){display: flex; gap: 60px;}
    }
  }

}
</style>