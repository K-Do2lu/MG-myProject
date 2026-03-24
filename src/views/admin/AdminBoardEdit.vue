<template>
  <section class="admin-board">
    <el-card class="admin-board__card" shadow="never">
      <template #header>
        <span class="admin-board__title">{{ pageTitle }}</span>
      </template>

      <el-form
        ref="formRef"
        class="admin-board__form"
        :model="form"
        :rules="rules"
        label-position="top"
        @submit.prevent
      >
        <el-form-item label="등록일시" class="admin-board__readonly">
          <el-input :model-value="displayDateLabel" readonly disabled />
          <span class="admin-board__hint">
            {{ isEditMode ? '최초 등록일입니다. 수정 시에는 변경되지 않습니다.' : '저장 시 서버에서 자동 반영됩니다.' }}
          </span>
        </el-form-item>

        <el-form-item label="제목" prop="title">
          <el-input
            v-model="form.title"
            placeholder="제목을 입력하세요"
            maxlength="200"
            show-word-limit
            clearable
          />
        </el-form-item>

        <el-form-item label="내용" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="12"
            placeholder="내용을 입력하세요"
            maxlength="20000"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="HOT 표시">
          <el-switch
            v-model="form.is_hot"
            active-text="ON"
            inactive-text="OFF"
          />
        </el-form-item>

        <el-form-item v-if="keptExisting.length > 0" label="기존 첨부">
          <div class="admin-board__existing">
            <el-tag
              v-for="(a, i) in keptExisting"
              :key="a.path"
              class="admin-board__tag"
              closable
              @close="removeKept(i)"
            >
              {{ a.name }}
            </el-tag>
          </div>
          <span class="admin-board__hint">태그를 닫으면 해당 첨부는 저장 시 제거됩니다.</span>
        </el-form-item>

        <el-form-item label="새 첨부파일 추가">
          <el-upload
            ref="uploadRef"
            class="admin-board__upload"
            multiple
            :auto-upload="false"
            :limit="10"
            :on-change="onFileChange"
            :on-remove="onFileRemove"
            :on-exceed="onExceed"
          >
            <el-button type="default">파일 선택 (최대 10개, 기존+신규 합산)</el-button>
            <template #tip>
              <p class="admin-board__upload-tip">
                선택한 파일은 Supabase Storage 버킷
                <strong class="admin-board__bucket-name">{{ storageBucketName }}</strong>
                에 저장됩니다. 수정 시 새 파일을 고르면 아래에 더해지며, 합계 10개를 넘을 수 없습니다.
              </p>
            </template>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitting" @click="onSubmit">
            {{ isEditMode ? '저장' : '등록' }}
          </el-button>
          <el-button v-if="!isEditMode" @click="onResetCreate">초기화</el-button>
          <el-button v-if="isEditMode" @click="onCancelEdit">취소</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </section>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { supabase } from '@/supabase'
import { assertBoardTableKey } from '@/constants/boardTables'
import {
  getBoardStorageBucket,
  uploadBoardAttachment,
  formatStorageUploadError,
} from '@/utils/boardStorage'
import { normalizeAttachmentsFromRow } from '@/utils/boardAttachments'

const props = defineProps({
  /** 'notice' | 'tender' */
  boardType: {
    type: String,
    required: true,
    validator: (v) => ['notice', 'tender'].includes(v),
  },
  /** 수정 모드일 때 글 ID */
  postId: {
    type: [Number, String],
    default: null,
  },
})

const emit = defineEmits(['submitted', 'cancel-edit'])

const formRef = ref(null)
const uploadRef = ref(null)
const submitting = ref(false)
/** @type {import('vue').Ref<File[]>} */
const selectedFiles = ref([])
/** @type {import('vue').Ref<{ path: string, name: string }[]>} */
const keptExisting = ref([])
const loadedCreatedAtLabel = ref('')

const form = reactive({
  title: '',
  content: '',
  is_hot: false,
})

const rules = {
  title: [
    { required: true, message: '제목을 입력하세요', trigger: 'blur' },
    { min: 1, max: 200, message: '제목은 200자 이내', trigger: 'blur' },
  ],
  content: [{ required: true, message: '내용을 입력하세요', trigger: 'blur' }],
}

function normalizePostId(v) {
  if (v == null || v === '') return null
  const n = Number(v)
  return Number.isFinite(n) ? n : v
}

const resolvedPostId = computed(() => normalizePostId(props.postId))

const isEditMode = computed(() => resolvedPostId.value != null)

const pageTitle = computed(() => {
  if (props.boardType === 'notice') {
    return isEditMode.value ? '공지사항 수정' : '공지사항 등록'
  }
  return isEditMode.value ? '입찰공고 수정' : '입찰공고 등록'
})

const storageBucketName = computed(() => getBoardStorageBucket())

const displayDateLabel = computed(() => {
  if (isEditMode.value && loadedCreatedAtLabel.value) {
    return loadedCreatedAtLabel.value
  }
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
})

function formatRowDate(iso) {
  if (!iso) return ''
  const d = new Date(iso)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  const h = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${day} ${h}:${min}`
}

function syncNewFilesFromList(fileList) {
  selectedFiles.value = (fileList || [])
    .map((f) => f.raw)
    .filter((f) => f instanceof File)
}

function onFileChange(_uploadFile, fileList) {
  syncNewFilesFromList(fileList)
}

function onFileRemove(_uploadFile, fileList) {
  syncNewFilesFromList(fileList)
}

function onExceed() {
  ElMessage.warning('첨부는 기존+신규 합쳐 최대 10개까지 가능합니다.')
}

function removeKept(index) {
  keptExisting.value.splice(index, 1)
}

function resetFormCreate() {
  form.title = ''
  form.content = ''
  form.is_hot = false
  selectedFiles.value = []
  keptExisting.value = []
  loadedCreatedAtLabel.value = ''
  uploadRef.value?.clearFiles()
  formRef.value?.clearValidate()
}

async function loadPostForEdit() {
  const id = normalizePostId(props.postId)
  if (id == null) {
    resetFormCreate()
    return
  }

  let table
  try {
    table = assertBoardTableKey(props.boardType)
  } catch (e) {
    ElMessage.error(e.message || '잘못된 게시판입니다.')
    emit('cancel-edit')
    return
  }

  const { data, error } = await supabase.from(table).select('*').eq('id', id).maybeSingle()

  if (error) {
    ElMessage.error(error.message || '불러오기에 실패했습니다.')
    emit('cancel-edit')
    return
  }
  if (!data) {
    ElMessage.warning('게시글을 찾을 수 없습니다.')
    emit('cancel-edit')
    return
  }

  form.title = data.title ?? ''
  form.content = data.content ?? ''
  form.is_hot = Boolean(data.is_hot)
  keptExisting.value = normalizeAttachmentsFromRow(data)
  loadedCreatedAtLabel.value = formatRowDate(data.created_at)
  selectedFiles.value = []
  uploadRef.value?.clearFiles()
  formRef.value?.clearValidate()
}

watch(
  () => [props.boardType, props.postId],
  () => {
    const id = normalizePostId(props.postId)
    if (id != null) {
      loadPostForEdit()
    } else {
      resetFormCreate()
    }
  },
  { immediate: true }
)

function onResetCreate() {
  resetFormCreate()
  ElMessage.info('입력을 초기화했습니다.')
}

function onCancelEdit() {
  emit('cancel-edit')
}

async function onSubmit() {
  const formEl = formRef.value
  if (!formEl) return

  try {
    await formEl.validate()
  } catch {
    return
  }

  let table
  try {
    table = assertBoardTableKey(props.boardType)
  } catch (e) {
    ElMessage.error(e.message || '잘못된 게시판입니다.')
    return
  }

  submitting.value = true

  /** @type {{ path: string, name: string }[]} */
  const uploaded = []
  for (const file of selectedFiles.value) {
    const { path, error: upErr } = await uploadBoardAttachment(table, file)
    if (upErr) {
      submitting.value = false
      ElMessage.error(formatStorageUploadError(upErr, getBoardStorageBucket()))
      return
    }
    uploaded.push({ path, name: file.name })
  }

  const merged = [...keptExisting.value, ...uploaded]
  if (merged.length > 10) {
    submitting.value = false
    ElMessage.warning('첨부는 최대 10개까지입니다. 기존 첨부를 줄이거나 새 파일을 적게 선택하세요.')
    return
  }

  const first = merged[0]
  const basePayload = {
    title: form.title.trim(),
    content: form.content.trim() || null,
    is_hot: form.is_hot,
    has_file: merged.length > 0,
    attachments: merged.length > 0 ? merged : null,
    attachment_path: first?.path ?? null,
    attachment_name: first?.name ?? null,
  }

  const editId = resolvedPostId.value

  if (editId != null) {
    // .select() 를 붙이면 UPDATE는 됐는데 SELECT RLS에 막혀 실패로 보일 수 있어 update 만 사용
    const { error } = await supabase.from(table).update(basePayload).eq('id', editId)

    submitting.value = false

    if (error) {
      ElMessage.error(error.message || '저장에 실패했습니다.')
      return
    }

    ElMessage.success('저장되었습니다.')
    selectedFiles.value = []
    uploadRef.value?.clearFiles()
    keptExisting.value = [...merged]
    emit('submitted', { table, mode: 'update' })
    // 저장 직후 재조회가 RLS 등으로 실패하면 cancel-edit 되어 "안 된 것처럼" 보이므로 생략
  } else {
    const payload = { ...basePayload, view_count: 0 }
    const { error } = await supabase.from(table).insert(payload)
    submitting.value = false
    if (error) {
      ElMessage.error(error.message || '등록에 실패했습니다.')
      return
    }
    ElMessage.success('등록되었습니다.')
    resetFormCreate()
    emit('submitted', { table, mode: 'create' })
  }
}
</script>

<style lang="scss" scoped>
.admin-board {
  max-width: 720px;
  margin: 0 auto;
  padding: 0;
}

.admin-board__title {
  font-size: 18px;
  font-weight: 600;
}

.admin-board__form {
  padding-top: 8px;
}

.admin-board__readonly :deep(.el-input.is-disabled .el-input__wrapper) {
  background-color: var(--el-fill-color-light);
}

.admin-board__hint {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.admin-board__existing {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.admin-board__tag {
  max-width: 100%;
}

.admin-board__upload {
  width: 100%;
}

.admin-board__upload-tip {
  margin: 8px 0 0;
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1.6;
}

.admin-board__upload-tip code {
  font-size: 11px;
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--el-fill-color-light);
}

.admin-board__bucket-name {
  color: var(--el-color-primary);
}
</style>
