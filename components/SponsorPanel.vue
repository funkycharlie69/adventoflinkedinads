<template>
  <!-- Desktop: Full-height right sidebar -->
  <div class="hidden lg:block fixed right-0 top-0 w-72 h-screen bg-darkcard border-l border-gray-800 z-30">
    <div class="h-full flex flex-col p-6">
      <!-- Header -->
      <div class="mb-6">
        <p class="text-xs text-muted leading-relaxed">
          Our sponsors help make Advent of LinkedIn Ads possible:
        </p>
      </div>

      <!-- Sponsor Content with Transition -->
      <div class="flex-1 flex items-center">
        <Transition name="fade" mode="out-in">
          <div :key="currentSponsor.name" class="space-y-4 w-full">
            <!-- Sponsor Name -->
            <h3 class="text-xl font-montserrat font-bold text-orange-500">
              {{ currentSponsor.name }}
            </h3>

            <!-- Tagline -->
            <p class="text-base font-montserrat text-white leading-snug">
              {{ currentSponsor.tagline }}
            </p>

            <!-- Description -->
            <p class="text-sm text-muted leading-relaxed">
              {{ currentSponsor.description }}
            </p>

            <!-- CTA Link -->
            <a
              :href="currentSponsor.url"
              target="_blank"
              class="inline-block text-sm text-orange-500 hover:text-orange-400 font-montserrat font-semibold transition-colors"
            >
              {{ currentSponsor.cta }} →
            </a>
          </div>
        </Transition>
      </div>

      <!-- Rotation Indicator -->
      <div class="flex justify-center gap-2 mt-auto pt-6 border-t border-gray-800">
        <div
          v-for="(sponsor, index) in sponsors"
          :key="sponsor.name"
          :class="[
            'w-2 h-2 rounded-full transition-all duration-300',
            index === currentSponsorIndex ? 'bg-orange-500 w-6' : 'bg-gray-700'
          ]"
        />
      </div>
    </div>
  </div>

  <!-- Mobile/Tablet: Horizontal card below hero -->
  <div class="lg:hidden bg-darkcard rounded-xl shadow-lg p-4 mb-6 border border-gray-800">
    <!-- Header -->
    <p class="text-xs text-muted mb-3 leading-relaxed">
      Our sponsors help make Advent of LinkedIn Ads possible:
    </p>

    <!-- Sponsor Content with Transition -->
    <Transition name="fade" mode="out-in">
      <div :key="currentSponsor.name" class="space-y-2">
        <!-- Sponsor Name -->
        <h3 class="text-base font-montserrat font-bold text-orange-500">
          {{ currentSponsor.name }}
        </h3>

        <!-- Tagline -->
        <p class="text-sm font-montserrat text-white leading-snug">
          {{ currentSponsor.tagline }}
        </p>

        <!-- Description -->
        <p class="text-xs text-muted leading-relaxed">
          {{ currentSponsor.description }}
        </p>

        <!-- CTA Link -->
        <a
          :href="currentSponsor.url"
          target="_blank"
          class="inline-block text-xs text-orange-500 hover:text-orange-400 font-montserrat font-semibold transition-colors"
        >
          {{ currentSponsor.cta }} →
        </a>
      </div>
    </Transition>

    <!-- Rotation Indicator -->
    <div class="flex justify-center gap-1.5 mt-3 pt-3 border-t border-gray-800">
      <div
        v-for="(sponsor, index) in sponsors"
        :key="sponsor.name"
        :class="[
          'w-1.5 h-1.5 rounded-full transition-all duration-300',
          index === currentSponsorIndex ? 'bg-orange-500 w-4' : 'bg-gray-700'
        ]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Sponsor {
  name: string
  tagline: string
  description: string
  cta: string
  url: string
}

const sponsors: Sponsor[] = [
  {
    name: 'CAPAC',
    tagline: 'The fastest way to optimize LinkedIn Ads bidding.',
    description: 'Automate bid optimization. Save hours. Trusted by the top media buyers.',
    cta: 'Try CAPAC for Free',
    url: 'https://www.capac.pro'
  },
]

const currentSponsorIndex = ref(0)
let rotationInterval: ReturnType<typeof setInterval> | null = null

const currentSponsor = computed(() => sponsors[currentSponsorIndex.value])

onMounted(() => {
  // Rotate sponsors every 20 seconds
  rotationInterval = setInterval(() => {
    currentSponsorIndex.value = (currentSponsorIndex.value + 1) % sponsors.length
  }, 20000)
})

onUnmounted(() => {
  if (rotationInterval) {
    clearInterval(rotationInterval)
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
