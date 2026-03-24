<template>
  <div class="board-detail">
    <p v-if="loading" class="board-detail__state" role="status">불러오는 중…</p>
    <p v-else-if="error" class="board-detail__state board-detail__state--error">{{ error }}</p>

    <template v-else-if="post">
      <header class="board-detail__header">
        <div class="board-detail__title-row">
          <h2 class="board-detail__title">{{ post.title }}</h2>
          <span v-if="post.hasAttachment" class="board-detail__icon" aria-hidden="true">
            <img src="@/assets/images/icons/ico_file.svg" alt="">
          </span>
          <span
            v-if="post.isImportant"
            class="board-detail__badge"
            role="status"
            aria-label="중요 게시물"
            >HOT</span
          >
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

      <section class="board-detail__attachment" aria-label="첨부파일 목록">
        <div class="board-detail__attachment-head">
          <h3 class="board-detail__attachment-title">첨부파일 목록</h3>
          <button
            v-if="attachmentItems.length > 1"
            type="button"
            class="board-detail__btn-all"
            :disabled="bulkDownloading"
            :aria-busy="bulkDownloading"
            @click="onDownloadAll"
          >
            {{ bulkDownloading ? 'ZIP 만드는 중…' : '전체 다운로드 (ZIP)' }}
          </button>
        </div>

        <ul v-if="attachmentItems.length > 0" class="board-detail__attachment-list">
          <li v-for="(item, idx) in attachmentItems" :key="item.path + idx" class="board-detail__attachment-row">
            <span class="board-detail__attachment-filename">{{ item.name }}</span>
            <button
              type="button"
              class="board-detail__btn-one"
              :disabled="itemDownloading === idx"
              :aria-busy="itemDownloading === idx"
              :aria-label="`${item.name || '첨부파일'} 다운로드`"
              @click="onDownloadOne(item, idx)"
            >
              {{ itemDownloading === idx ? '받는 중…' : '다운로드' }}
            </button>
          </li>
        </ul>
        <p v-else class="board-detail__attachment-empty">첨부파일이 없습니다.</p>
      </section>

      <div class="board-detail__head">
        <button
          type="button"
          class="board-detail__back"
          aria-label="목록으로 돌아가기"
          @click="$emit('back')"
        >
          목록으로
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { downloadUrlAsFile, downloadAllAttachments } from '@/utils/attachmentDownload'
import { getBoardAttachmentPublicUrl } from '@/utils/boardStorage'

const props = defineProps({
  /** useBoardPostDetail mapRow 결과 또는 동일 shape */
  post: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
})

defineEmits(['back'])

const bulkDownloading = ref(false)
/** @type {import('vue').Ref<number | null>} */
const itemDownloading = ref(null)

const sanitizedContent = computed(() => {
  const t = props.post?.content
  if (!t) return ''
  return String(t)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br>')
})

const attachmentItems = computed(() => {
  const list = props.post?.attachments
  return Array.isArray(list) ? list : []
})

async function onDownloadOne(item, idx) {
  if (!item?.path) return
  itemDownloading.value = idx
  try {
    const url = getBoardAttachmentPublicUrl(item.path)
    await downloadUrlAsFile(url, item.name || '첨부파일')
  } catch (e) {
    ElMessage.error(e?.message || '다운로드에 실패했습니다.')
  } finally {
    itemDownloading.value = null
  }
}

async function onDownloadAll() {
  if (attachmentItems.value.length === 0) return
  bulkDownloading.value = true
  try {
    await downloadAllAttachments(
      attachmentItems.value,
      props.post?.title || '첨부파일'
    )
  } catch (e) {
    ElMessage.error(e?.message || '전체 다운로드에 실패했습니다.')
  } finally {
    bulkDownloading.value = false
  }
}
</script>

<style lang="scss" scoped>
@use "@scss/abstract/" as ab;

.board-detail {
  max-width: 960px;
  margin: 0 auto;
}

.board-detail__head {
  margin-bottom: 16px;
  float: right;
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
  line-height: 1.5;
}

.board-detail__title {
  margin: 0;
  flex: 1 1 auto;
  @include ab.clamp-size('font-size', 18px, 26px);
  font-weight: 500;
  color: ab.$color-txt-main;
}

.board-detail__icon img {
  width: 20px;
  height: 20px;
  display: block;
}

.board-detail__badge {
  font-size: 10px;
  font-weight: 500;
  padding: 4px 8px;
  border-radius: 999px;
  background: #ffa500;
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

.board-detail__attachment {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #eee;
  font-size: 14px;
}

.board-detail__attachment-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
}

.board-detail__attachment-title {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ab.$color-txt-main;
}

.board-detail__btn-all {
  padding: 8px 14px;
  border: 1px solid #1565c0;
  border-radius: 8px;
  background: #fff;
  color: #1565c0;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.board-detail__btn-all:hover:not(:disabled) {
  background: #e3f2fd;
}

.board-detail__btn-all:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.board-detail__attachment-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.board-detail__attachment-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px 16px;
  margin: 0;
  padding: 12px 14px;
  border-radius: 8px;
  background: #f7f7f7;
}

.board-detail__attachment-filename {
  flex: 1 1 auto;
  min-width: 0;
  word-break: break-all;
  color: #333;
}

.board-detail__btn-one {
  flex-shrink: 0;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background: #fff;
  font-size: 13px;
  cursor: pointer;
}

.board-detail__btn-one:hover:not(:disabled) {
  border-color: #1565c0;
  color: #1565c0;
}

.board-detail__btn-one:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.board-detail__attachment-empty {
  margin: 0;
  padding: 4px 0 0;
  font-size: 14px;
  color: #888;
  line-height: 1.6;
}
</style>
