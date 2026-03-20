import { ref, computed, onMounted, onUnmounted } from 'vue';

@param itemRef
@param options

export function useSlider(itemRef, options = {}) {
    const {loop = true, autoplay = true, interval = 3000} = options;

    const currentIndex = ref(0);

    const len = computed(() => itemRef.value?.length)


}