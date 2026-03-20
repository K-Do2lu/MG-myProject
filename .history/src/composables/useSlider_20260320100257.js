import { ref, computed, onUnmounted } from 'vue';

export const useSlider = (itemRef, options) => {
    const {loop = true, autoplay = true, interval = 3000} = options;
    const currentIndex = ref(0);
}