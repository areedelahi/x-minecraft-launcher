<template>
  <div class="absolute z-0 h-full w-full overflow-hidden">
    <transition
      name="fade-transition"
    >
      <video
        v-if="customBackgroundVideo"
        ref="videoRef"
        :key="`custom-video-${customBackgroundVideo}`"
        class="absolute z-0 h-full w-full object-cover"
        :style="{ filter: `blur(${blur}px)`, 'object-fit': backgroundImageFit }"
        :src="customBackgroundVideo"
        autoplay
        loop
        playsinline
        :muted="isMuted"
      />
      <Particles
        v-else-if="backgroundType === BackgroundType.PARTICLE"
        color="#dedede"
        class="absolute z-0 h-full w-full"
        :style="{ filter: `blur(${blur}px)` }"
        :click-mode="particleMode"
      />
      <Halo
        v-else-if="backgroundType === BackgroundType.HALO"
        class="absolute z-0 h-full w-full"
        :style="{ filter: `blur(${blur}px)` }"
      />
      <img
        v-else-if="backgroundImage?.type === 'image' && backgroundType === BackgroundType.IMAGE"
        :key="backgroundImage.url"
        :src="backgroundImage.url"
        class="absolute z-0 h-full w-full"
        :style="{ filter: `blur(${blur}px)`, 'object-fit': backgroundImageFit }"
      >
      <video
        v-else-if="backgroundImage?.type === 'video' && backgroundType === BackgroundType.VIDEO"
        ref="videoRef"
        :key="`video-${backgroundImage.url}`"
        class="absolute z-0 h-full w-full object-cover"
        :style="{ filter: `blur(${blur}px)`, 'object-fit': backgroundImageFit }"
        :src="backgroundImage.url"
        autoplay
        loop
        playsinline
        :muted="isMuted"
      />
      <img
        v-else-if="backgroundType === BackgroundType.NONE && latestUpdatePoster"
        :key="latestUpdatePoster"
        :src="latestUpdatePoster"
        class="absolute z-0 h-full w-full object-cover"
        :style="{ filter: 'blur(60px) brightness(0.6) saturate(1.3)', transform: 'scale(1.2)' }"
      >
    </transition>

    <transition
      name="fade-transition"
    >
      <div
<<<<<<< Updated upstream
        v-if="((backgroundColorOverlay && !isHome) || backgroundType === BackgroundType.NONE) && !customBackgroundVideo"
=======
        v-if="(backgroundColorOverlay && !isHome) || (backgroundType === BackgroundType.NONE && !latestUpdatePoster)"
>>>>>>> Stashed changes
        class="z-3 absolute h-full w-full"
        :style="{ 'background': backgroundColor }"
      />
    </transition>
  </div>
</template>
<script lang="ts" setup>
import Halo from '@/components/Halo.vue'
import Particles from '@/components/Particles.vue'
import { injection } from '@/util/inject'
import { kTheme, BackgroundType } from '@/composables/theme'
import { kInstanceLaunch } from '@/composables/instanceLaunch'
<<<<<<< Updated upstream
import { kCustomCss } from '@/composables/customCss'
import { inject } from 'vue'

const customCss = inject(kCustomCss)
const customBackgroundVideo = computed(() => customCss?.customBackgroundVideo.value || '')
=======
import { useMojangNews } from '@/composables/mojangNews'

const { news } = useMojangNews()
const latestUpdatePoster = computed(() => news.value?.[0]?.playPageImage?.url)
>>>>>>> Stashed changes

const { sideBarColor, backgroundColorOverlay, backgroundColor, blur, backgroundImage, backgroundType, particleMode, backgroundImageFit, volume } = injection(kTheme)
const videoRef = ref(null as null | HTMLVideoElement)
const isMuted = computed(() => volume.value <= 0)

const route = useRoute()
const isHome = computed(() => route.path === '/')

watch(volume, (newVolume) => {
  if (videoRef.value) {
    videoRef.value.volume = newVolume
  }
})

const { gameProcesses } = injection(kInstanceLaunch)

watch(computed(() => gameProcesses.value.length), (cur, last) => {
  if (cur > 0 && last === 0) {
    videoRef.value?.pause()
  } else if (cur === 0 && last > 0) {
    videoRef.value?.play()
  }
})

watch(videoRef, (v) => {
  if (v) {
    v.volume = volume.value
  }
})

onMounted(() => {
  if (videoRef.value) {
    videoRef.value.volume = volume.value
  }
})

watch(backgroundType, (t) => {
  console.log(t)
  console.log(backgroundImage.value)
})


</script>
<style scoped>
.img-container {
  background: radial-gradient(ellipse at top right, transparent, v-bind(sideBarColor) 72%);
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  z-index: 4;
}
</style>
