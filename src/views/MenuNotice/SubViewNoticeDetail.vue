<template>
  <div class="tab-page tab-page--notice">
    <div class="tab-page-inner inner--notice">
      <div class="content notice">
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

const { post, loading, error } = useBoardPostDetail('notice', toRef(props, 'postId'))
</script>

<style lang="scss" scoped></style>
