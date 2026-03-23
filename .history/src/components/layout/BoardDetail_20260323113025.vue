<template>
  <div class="board-detail">
    <div class="board-detail__head">
      <button type="button" class="board-detail__back" @click="$emit('back')">
        목록으로
      </button>
      <h2 class="sub-title">공지사항</h2>
    </div>

    <p v-if="loading" class="board-detail__state" role="status">불러오는 중…</p>
    <p v-else-if="error" class="board-detail__state board-detail__state--error">{{ error }}</p>

    <template v-else-if="post">
      <header class="board-detail__header">
        <div class="board-detail__title-row">
          <h2 class="board-detail__title">{{ post.title }}</h2>
          <span v-if="post.hasAttachment" class="board-detail__icon" aria-hidden="true">
            <img src="@/assets/images/icons/ico_file.svg" alt="">
          </span>
          <span v-if="post.isImportant" class="board-detail__badge" role="status">HOT</span>
        </div>
        <dl class="board-detail__meta">
          <div>
            <dt>등록일</dt>
            <dd>
              <time :datetime="post.dateIso">{{ post.date }}</time>
            </dd>
          </div>
          <div>
            <dt>조회수</dt>
            <dd>{{ post.views }}</dd>
          </div>
        </dl>
      </header>

      <div class="board-detail__body">
        <div v-if="post.content" class="board-detail__content" v-html="sanitizedContent" />
        <p v-else class="board-detail__empty">등록된 본문이 없습니다.</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /** useBoardPostDetail mapRow 결과 또는 동일 shape */
  post: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['back'])

/** 간단 이스케이프 — 추후 본문에 HTML 허용 시 DOMPurify 등으로 교체 */
const sanitizedContent = computed(() => {
  const t = props.post?.content
  if (!t) return ''
  return String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
})
</script>

<style lang="scss" scoped>
.board-detail {
  max-width: 960px;
  margin: 0 auto;
}

.board-detail__head {
  margin-bottom: 16px;
}

.board-detail__back {
  padding: 8px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 14px;
}

.board-detail__back:hover {
  background: #f5f5f5;
}

.board-detail__state {
  padding: 24px 0;
  color: #666;
}

.board-detail__state--error {
  color: #c00;
}

.board-detail__header {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}

.board-detail__title-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.board-detail__title {
  margin: 0;
  flex: 1 1 auto;
  
  background: red;
}

.board-detail__icon img {
  width: 20px;
  height: 20px;
  display: block;
}

.board-detail__badge {
  font-size: 10px;
  padding: 4px 8px;
  border-radius: 999px;
  background: #e53935;
  color: #fff;
}

.board-detail__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin: 16px 0 0;
  font-size: 14px;
  color: #666;
}

.board-detail__meta dt {
  display: inline;
  font-weight: 600;
  margin-right: 6px;
}

.board-detail__meta dd {
  display: inline;
  margin: 0;
}

.board-detail__body {
  padding-top: 24px;
}

.board-detail__content {
  line-height: 1.7;
  font-size: 15px;
  color: #222;
}

.board-detail__empty {
  color: #888;
}
</style>
