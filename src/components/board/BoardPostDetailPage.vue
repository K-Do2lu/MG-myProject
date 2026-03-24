<template>
  <div :class="['tab-page', `tab-page--${variant}`]">
    <div :class="['tab-page-inner', `inner--${variant}`]">
      <div :class="['content', variant]">
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
import { toRef, computed } from 'vue'
import BoardDetail from '@/components/layout/BoardDetail.vue'
import { useBoardPostDetail } from '@/composables/useBoardPostDetail'
import { getBoardUi, isBoardTableKey } from '@/constants/boardTables'

const props = defineProps({
  /** Supabase 테이블 키 */
  boardKey: {
    type: String,
    required: true,
    validator: (v) => isBoardTableKey(v),
  },
  postId: { type: [String, Number], required: true },
})

defineEmits(['close'])

const variant = computed(() => getBoardUi(props.boardKey).variant)

const { post, loading, error } = useBoardPostDetail(
  /** @type {'notice'|'tender'} */ (props.boardKey),
  toRef(props, 'postId')
)
</script>

<style lang="scss" scoped></style>
