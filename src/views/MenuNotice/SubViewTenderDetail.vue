<template>
  <div class="tab-page tab-page--tender">
    <div class="tab-page-inner inner--tender">
      <div class="content tender">
        <BoardDetail
          :post="post"
          :loading="loading"
          :error="error"
          @back="$emit('close')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRef } from 'vue'
import BoardDetail from '@/components/layout/BoardDetail.vue'
import { useBoardPostDetail } from '@/composables/useBoardPostDetail'

const props = defineProps({
  postId: { type: [String, Number], required: true },
})

defineEmits(['close'])

const { post, loading, error } = useBoardPostDetail('tender', toRef(props, 'postId'))
</script>

<style lang="scss" scoped></style>
