<template>
  <div class="min-h-screen bg-darkbg lg:pr-72">
    <!-- Sponsor Panel (renders for both desktop and mobile) -->
    <SponsorPanel />

    <!-- Hero Section -->
    <header class="pt-16 pb-12 px-4 bg-darkbg">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-5xl md:text-7xl font-spartan font-bold text-white mb-6 leading-tight">
          Advent of <span class="text-orange-500">LinkedIn Ads</span>
        </h1>
        <p class="text-xl md:text-2xl font-montserrat text-muted">
          Master LinkedIn Ads with 24 daily puzzles
        </p>
      </div>
    </header>

    <!-- Main Content -->
    <main class="px-4 pb-12 bg-darkbg">
      <div class="max-w-6xl mx-auto">
        <!-- Instructions -->
        <div class="bg-darkcard rounded-xl shadow-lg p-6 mb-8 border border-gray-800">
          <h2 class="text-2xl font-montserrat font-bold text-white mb-4">How It Works</h2>
          <ul class="space-y-3 text-muted">
            <li class="flex items-start">
              <span class="text-orange-500 font-montserrat font-bold mr-3">1.</span>
              <span>Click on an unlocked day to reveal the puzzle</span>
            </li>
            <li class="flex items-start">
              <span class="text-orange-500 font-montserrat font-bold mr-3">2.</span>
              <span>Solve the puzzle to earn a star</span>
            </li>
            <li class="flex items-start">
              <span class="text-orange-500 font-montserrat font-bold mr-3">3.</span>
              <span>Learn how senior media buyers think</span>
            </li>
            <li class="flex items-start">
              <span class="text-orange-500 font-montserrat font-bold mr-3">4.</span>
              <span>Discover how CAPAC can automate these insights</span>
            </li>
          </ul>
        </div>

        <!-- Puzzle Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <div
            v-for="puzzle in puzzles"
            :key="puzzle.id"
            @click="openPuzzle(puzzle)"
            :class="[
              'aspect-square rounded-xl shadow-lg transition-all duration-200 flex flex-col items-center justify-center cursor-pointer font-montserrat border',
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
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="text-sm font-semibold">Day {{ puzzle.id }}</span>
            </template>

            <!-- Solved State -->
            <template v-else-if="puzzle.isSolved">
              <svg
                class="w-12 h-12 mb-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
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
              <p class="text-muted text-sm font-montserrat">Your Progress</p>
              <p class="text-3xl font-spartan font-bold text-white">
                {{ solvedCount }} / {{ unlockedCount }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-muted text-sm font-montserrat">Stars Earned</p>
              <p class="text-3xl font-spartan font-bold text-orange-500">
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
        <p class="mb-2 font-montserrat text-sm text-muted">
          Built by Charles Murillon & Quentin Van Der Perre | Sponsored by
          <span class="text-lighttext">CAPAC.pro</span>
        </p>

        <!-- Reset Button -->
        <button
          @click="resetProgress"
          class="mt-3 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-darkbg text-xs font-montserrat font-semibold rounded-md transition-colors"
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
import type { Puzzle } from '~/composables/usePuzzles'

const { puzzles, loadProgress, unlockByDate } = usePuzzles()

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
    puzzles.value.forEach(puzzle => {
      puzzle.isSolved = false
    })
  }
}
</script>
