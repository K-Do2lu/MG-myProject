<template>
  <section class="page sub-page sub-page--overview">
    <MenuSubBanner banner-text="회사개요"/>

    <div class="sub-page__content">

      <!-- Tab -->
      <BaseTab v-model="activeTab">
        <BaseTabPanel label="회사개요" value="overview">
          <!-- 여기 안에 회사개요 내용 -->
        </BaseTabPanel>
        <BaseTabPanel label="CEO 인사말" value="ceo">
          <!-- 여기 안에 CEO 인사말 내용 (필요하면 SubViewCeoMessage 내용을 옮겨옴) -->
        </BaseTabPanel>
        ...
      </BaseTab>

      
   
    <!-- Top button -->
    <BaseTopButton/>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import MenuSubBanner from '@/views/MenuSubBanner.vue'
import 
const activeTab = ref('overview')  // 기본 선택 탭

</script>

<style scoped></style>