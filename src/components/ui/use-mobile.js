import { ref, computed, onMounted, onUnmounted } from 'vue'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const isMobile = ref(undefined)

  // const checkMobile = () => {
  //   isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
  // }

  onMounted(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const onChange = () => {
      isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    }
    
    mql.addEventListener('change', onChange)
    isMobile.value = window.innerWidth < MOBILE_BREAKPOINT
    
    // Cleanup function
    onUnmounted(() => {
      mql.removeEventListener('change', onChange)
    })
  })

  return computed(() => !!isMobile.value)
}