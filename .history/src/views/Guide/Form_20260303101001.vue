<template>
    <h1>Form</h1>
    <!-- .cont -> guide 한정 class -->
    <section>
      <div class="cont">
        <h2><em>Input</em></h2>
        <BaseInput v-model="searchVal" placeholder="검색어를 입력해주세요.">
        <template #suffix>
          <img src="/src/assets/images/icons/ico_serch.png" alt="">
        </template>
      </BaseInput>
      </div>

      <div class="cont">
        <h2><em>Select</em></h2>
          <BaseSelect
            v-model="regionVal"
            :placeholder="regionOptions[0]?.label"
            :options="regionOptions"
            :error="regionError"
          />        
      </div>

      <div class="cont">
        <h2><em>Select</em> footer</h2>
        <BaseSelectFooter />
      </div>
      
    </section>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue'
//   import BaseSelect from '@/components/form/BaseSelect.vue'
  
  const searchVal = ref('')
  const searchError = computed(() => { /* 검증 로직 */ })
  
  const regionVal = ref('')
  const regionError = computed(() => regionVal.value ? '' : '필수 선택')
  const regionOptions = [
    { value: 'title', label: '제목' },
    { value: 'content', label: '내용' },
  ]
  </script>

  <style lang="scss" scoped>
    section{
      > .cont{padding-bottom: 0; border: none;}
    }
  </style>