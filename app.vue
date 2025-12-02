<template>
  <div class="min-h-screen bg-darkbg lg:pr-72">
    <Snowfall />
    <!-- Sponsor Panel (renders for both desktop and mobile) -->
    <SponsorPanel />

    <!-- Hero Section -->
    <header class="pt-16 pb-12 px-4 bg-darkbg">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-christmas font-bold text-white mb-6 leading-tight">
          Advent of <span class="text-orange-500">LinkedIn Ads</span>
        </h1>
        <p class="text-xl md:text-2xl font-serif text-muted">
          Master LinkedIn Ads with 24 daily puzzles
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="px-4 pb-12 bg-darkbg">
      <div class="max-w-6xl mx-auto">
        <!-- Instructions -->
        <div class="bg-darkcard rounded-xl shadow-lg p-6 mb-8 border border-gray-800">
          <h2 class="text-2xl font-serif font-bold text-white mb-4">How It Works</h2>
          <ul class="space-y-3 text-muted">
            <li class="flex items-start">
              <span class="text-orange-500 font-serif font-bold mr-3">1.</span>
              <span>Click on an unlocked day to reveal the puzzle</span>
            </li>
            <li class="flex items-start">
              <span class="text-orange-500 font-serif font-bold mr-3">2.</span>
              <span>Solve the puzzle to earn a star (or learn something new to apply today)</span>
            </li>
            <li class="flex items-start">
              <span class="text-orange-500 font-serif font-bold mr-3">3.</span>
              <span>Get linkedin ads specialists tips</span>
            </li>
          </ul>

          <!-- Privacy Notice -->
          <div class="mt-4 pt-4 border-t border-gray-800">
            <p class="text-xs text-muted flex items-center gap-2">
              <svg class="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
              <span><strong>100% Private:</strong> All data stays in your browser. No tracking, no servers, no data collection.</span>
            </p>
          </div>
        </div>

        <!-- Puzzle Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="puzzle in puzzles"
            :key="puzzle.id"
            @click="openPuzzle(puzzle)"
            :class="[
              'aspect-square rounded-xl shadow-lg transition-all duration-200 flex flex-col items-center justify-center cursor-pointer font-serif border',
              puzzle.isSolved
                ? 'bg-orange-500 hover:bg-orange-600 text-darkbg border-orange-500'
                : puzzle.isLocked
                ? 'bg-gray-800 text-gray-600 cursor-not-allowed border-gray-700'
                : 'bg-darkcard hover:bg-gray-800 text-white hover:shadow-xl hover:scale-105 border-gray-700 hover:border-orange-500'
            ]"
          >
            <!-- Locked State -->
            <template v-if="puzzle.isLocked">
              <svg
                class="w-8 h-8 mb-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 7.25a2.75 2.75 0 00-2.75-2.75H13.5V3.75a1.25 1.25 0 10-2.5 0v.75H7.25A2.75 2.75 0 004.5 7.25v3.5a.75.75 0 001.5 0v-3.5a1.25 1.25 0 011.25-1.25h3.75v.75a1.25 1.25 0 102.5 0v-.75h3.75a1.25 1.25 0 011.25 1.25v3.5a.75.75 0 001.5 0v-3.5zM4.5 12.25v6a2.75 2.75 0 002.75 2.75h10A2.75 2.75 0 0020 18.25v-6a.75.75 0 00-1.5 0v6a1.25 1.25 0 01-1.25 1.25h-10a1.25 1.25 0 01-1.25-1.25v-6a.75.75 0 00-1.5 0z" />
              </svg>
              <span class="text-sm font-semibold">Day {{ puzzle.id }}</span>
            </template>

            <!-- Solved State -->
            <template v-else-if="puzzle.isSolved">
              <svg
                class="w-12 h-12 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM12 15a.75.75 0 01.75.75v5.25a.75.75 0 01-1.5 0v-5.25a.75.75 0 01.75-.75zM9.75 6.75a.75.75 0 01.75-.75h3a.75.75 0 010 1.5h-3a.75.75 0 01-.75-.75zM8.25 11.25a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zM6.75 15.75a.75.75 0 01.75-.75h9a.75.75 0 010 1.5h-9a.75.75 0 01-.75-.75z" />
              </svg>
              <span class="text-sm font-semibold">Day {{ puzzle.id }}</span>
            </template>

            <!-- Unlocked State -->
            <template v-else>
              <span class="text-4xl font-bold mb-1">{{ puzzle.id }}</span>
              <span class="text-xs">Click to solve</span>
            </template>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-8 bg-darkcard rounded-xl shadow-lg p-6 border border-gray-800">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-muted text-sm font-serif">Your Progress</p>
              <p class="text-3xl font-christmas font-bold text-white">
                {{ solvedCount }} / {{ unlockedCount }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-muted text-sm font-serif">Stars Earned</p>
              <p class="text-3xl font-christmas font-bold text-orange-500">
                {{ solvedCount }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-darkcard border-t border-gray-800 text-lighttext py-8 px-4 mt-12">
      <div class="max-w-6xl mx-auto text-center relative">
        <p class="mb-2 font-serif text-sm text-muted">
          Built by Charles Murillon & Quentin Van Der Perre | Sponsored by
          <span class="text-lighttext">CAPAC.pro</span>
        </p>

        <!-- Reset Button -->
        <button
          @click="resetProgress"
          class="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-darkbg text-xs font-serif font-semibold rounded-md transition-colors"
        >
          Reset Progress
        </button>
      </div>
    </footer>

    <!-- Puzzle Modal -->
    <PuzzleModal
      :is-open="isModalOpen"
      :puzzle="selectedPuzzle"
      @close="closeModal"
      @solved="handleSolved"
    />
  </div>
</template>

<script setup lang="ts">
import Snowfall from '~/components/Snowfall.vue'
import type { Puzzle } from '~/composables/usePuzzles'

const { puzzles, loadProgress, unlockByDate } = usePuzzles()

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Mountains+of+Christmas:wght@700&family=Merriweather:wght@400;700&display=swap',
      crossorigin: '',
    },
    {
      rel: 'icon',
      href: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🎄</text></svg>',
    },
  ],
});


const isModalOpen = ref(false)
const selectedPuzzle = ref<Puzzle | null>(null)

// Load progress from localStorage on mount
onMounted(() => {
  loadProgress()
  unlockByDate()
})

// Computed stats
const solvedCount = computed(() => {
  return puzzles.value.filter(p => p.isSolved).length
})

const unlockedCount = computed(() => {
  return puzzles.value.filter(p => !p.isLocked).length
})

// Open puzzle modal
const openPuzzle = (puzzle: Puzzle) => {
  if (puzzle.isLocked) return
  selectedPuzzle.value = puzzle
  isModalOpen.value = true
}

// Close modal
const closeModal = () => {
  isModalOpen.value = false
  selectedPuzzle.value = null
}

// Handle solved puzzle
const handleSolved = (puzzleId: number) => {
  // Refresh the puzzles to show updated state
  const puzzle = puzzles.value.find(p => p.id === puzzleId)
  if (puzzle) {
    puzzle.isSolved = true
  }
}

// Reset progress for testing
const resetProgress = () => {
  if (import.meta.client) {
    localStorage.removeItem('advent-progress')
    localStorage.removeItem('advent-gaveup')
    puzzles.value.forEach(puzzle => {
      puzzle.isSolved = false
    })
    // Force reload to clear all states
    window.location.reload()
  }
}
</script>
