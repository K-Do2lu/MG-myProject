import { ref, computed } from 'vue'

// useFormField는 폼 필드에서 접근성을 위한 ID와 설명 연결을 담당하는 composable

/**
 * 폼 필드 공통 로직 (fieldId, describedByIds)
 * @param {string} prefix - ID 접두사 (예: 'input', 'select')
 * @param {Object} props - 컴포넌트 props (hint, error 사용)
 * @returns {{ fieldId: Ref<string>, describedByIds: ComputedRef<string|undefined> }}
 */
export function useFormField(prefix = 'field', props) {
  const fieldId = ref(`${prefix}-${Math.random().toString(36).slice(2, 9)}`)

  const describedByIds = computed(() => {
    const ids = []
    if (props.hint) ids.push(`${fieldId.value}-hint`)
    if (props.error) ids.push(`${fieldId.value}-error`)
    return ids.length ? ids.join(' ') : undefined
  })

  return { fieldId, describedByIds }
}
l