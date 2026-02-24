<template>
    <h1>Form</h1>
    <!-- .cont -> guide 한정 class -->
    <section>
      <div class="cont">
        <BaseInput v-model="searchVal" label="검색" hint="최소 2자 이상" :error="searchError">
        <template #suffix>
          <img src="/src/assets/images/icons/ico_serch.png" alt="">
        </template>
      </BaseInput>
      </div>

      <div class="cont">
          <BaseSelect
            v-model="regionVal"
            label="지역"
            placeholder="선택"
            :options="regionOptions"
            :error="regionError"
          />        
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
    { value: 'content', label: 'ㄴ' },
  ]
  </script>

  <style lang="scss" scoped>
    section{
      > .cont{padding-bottom: 0; border: none;}
    }
  </style>