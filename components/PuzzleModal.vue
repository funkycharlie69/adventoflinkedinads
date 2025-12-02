<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
    @click.self="closeModal"
  >
    <div class="bg-darkcard rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
      <!-- Header -->
      <div class="sticky top-0 bg-darkcard border-b border-gray-700 px-6 py-4 flex justify-between items-center">
        <h2 class="text-2xl font-montserrat font-bold text-white">
          Day {{ puzzle?.id }} - {{ puzzle?.title }}
        </h2>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-white text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      <!-- Content -->
      <div class="px-6 py-6">
        <!-- Question -->
        <div class="mb-6 text-lighttext text-lg" v-html="puzzle?.question"></div>

        <!-- Success Message with Pro Tip -->
        <div
          v-if="showSuccess"
          class="mb-6 p-4 bg-orange-500 bg-opacity-20 border border-orange-500 rounded-md"
        >
          <p class="text-white font-montserrat font-semibold mb-2">Correct! That's how a LinkedIn Ads pro thinks.</p>

          <!-- Pro Tip -->
          <div class="mt-4 p-3 bg-orange-500 bg-opacity-10 border-l-4 border-orange-500 rounded">
            <p class="text-sm font-montserrat font-semibold text-orange-500 mb-2">Pro Tip:</p>
            <p class="text-lighttext text-sm">{{ puzzle?.hint }}</p>
          </div>

          <p class="text-lighttext text-sm mt-4 mb-3">
            Check out our sponsors to learn more about tools that can help automate these insights.
          </p>

          <!-- Share Button -->
          <button
            @click="shareOnLinkedIn"
            class="w-full mt-2 px-4 py-2 bg-[#0A66C2] hover:bg-[#004182] text-white rounded-md font-montserrat font-semibold transition-colors flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            Share on LinkedIn
          </button>
        </div>

        <!-- Confirmation Card for Give Up -->
        <div
          v-if="showConfirmGiveUp"
          class="mb-6 p-6 bg-orange-900 bg-opacity-30 border-2 border-orange-500 rounded-lg"
        >
          <p class="text-orange-500 font-montserrat font-bold text-lg mb-3">⚠️ Hold on!</p>
          <p class="text-lighttext mb-4">
            If you give up, you won't be able to solve this puzzle anymore. But hey, you'll still get to see the answer and learn the Pro Tip!
          </p>
          <p class="text-sm text-gray-400 mb-5 italic">
            Sometimes it's better to learn than to struggle. Your choice!
          </p>
          <div class="flex gap-3">
            <button
              @click="confirmGiveUp"
              class="flex-1 bg-orange-500 text-darkbg px-4 py-3 rounded-md font-montserrat font-semibold hover:bg-orange-600 transition-colors"
            >
              Show me the answer
            </button>
            <button
              @click="cancelGiveUp"
              class="flex-1 bg-gray-700 text-lighttext px-4 py-3 rounded-md font-montserrat font-semibold hover:bg-gray-600 transition-colors border border-gray-600"
            >
              Let me try again
            </button>
          </div>
        </div>

        <!-- Failed Message with Pro Tip -->
        <div
          v-if="showGaveUp"
          class="mb-6 p-4 bg-gray-800 bg-opacity-50 border border-gray-600 rounded-md"
        >
          <p class="text-gray-400 font-montserrat font-semibold mb-2">🤷 Hey, we've all been there! Here's what you needed to know:</p>

          <!-- Pro Tip -->
          <div class="mt-4 p-3 bg-gray-700 bg-opacity-30 border-l-4 border-gray-500 rounded">
            <p class="text-sm font-montserrat font-semibold text-gray-400 mb-2">Pro Tip:</p>
            <p class="text-lighttext text-sm">{{ puzzle?.hint }}</p>
          </div>

          <p class="text-gray-500 text-sm mt-4 italic">
            Better to learn now than to spend budget learning later! 💸
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="showError"
          class="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 rounded-md"
        >
          <p class="text-red-300 font-montserrat">Not quite. Try again or give up to see the answer!</p>
        </div>

        <!-- Input Form -->
        <div v-if="!puzzle?.isSolved && !showGaveUp && !showConfirmGiveUp" class="mb-6">
          <label class="block text-sm font-montserrat font-medium text-lighttext mb-2">
            Your Answer
          </label>
          <input
            v-model="userAnswer"
            type="text"
            placeholder="Enter your answer..."
            class="w-full px-4 py-2 bg-darkbg border border-gray-700 text-white rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 placeholder-gray-500"
            @keyup.enter="submitAnswer"
          />
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button
            v-if="!puzzle?.isSolved && !showGaveUp && !showConfirmGiveUp"
            @click="submitAnswer"
            class="flex-1 bg-orange-500 text-darkbg px-6 py-3 rounded-md font-montserrat font-semibold hover:bg-orange-600 transition-colors"
          >
            Submit Answer
          </button>
          <button
            v-if="!puzzle?.isSolved && !showGaveUp && !showConfirmGiveUp"
            @click="giveUp"
            class="flex-1 bg-gray-700 text-lighttext px-6 py-3 rounded-md font-montserrat font-semibold hover:bg-gray-600 transition-colors border border-gray-600"
          >
            I give up
          </button>
          <button
            v-if="puzzle?.isSolved || showGaveUp"
            @click="closeModal"
            class="flex-1 bg-orange-500 text-darkbg px-6 py-3 rounded-md font-montserrat font-semibold hover:bg-orange-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Puzzle } from '~/composables/usePuzzles'
import confetti from 'canvas-confetti'

const props = defineProps<{
  isOpen: boolean
  puzzle: Puzzle | null
}>()

const emit = defineEmits<{
  close: []
  solved: [puzzleId: number]
}>()

const userAnswer = ref('')
const showGaveUp = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const showConfirmGiveUp = ref(false)

// Reset state and restore previous state when modal opens/closes
watch(() => props.isOpen, (newVal) => {
  if (newVal && props.puzzle) {
    userAnswer.value = ''
    showError.value = false

    // Check if puzzle was given up before
    const gaveUpPuzzles = getGaveUpPuzzles()
    const hasGivenUp = gaveUpPuzzles.includes(props.puzzle.id)

    if (hasGivenUp) {
      showGaveUp.value = true
      showSuccess.value = false
    } else if (props.puzzle.isSolved) {
      // If puzzle was already solved, show success message with Pro Tip and trigger confetti
      showGaveUp.value = false
      showSuccess.value = true
      // Trigger confetti for reopened solved puzzles
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      showGaveUp.value = false
      showSuccess.value = false
    }
  }
})

// Get gave up puzzles from localStorage
const getGaveUpPuzzles = (): number[] => {
  if (import.meta.client) {
    const saved = localStorage.getItem('advent-gaveup')
    if (saved) {
      try {
        const gaveUpIds = JSON.parse(saved)
        return Array.isArray(gaveUpIds) ? gaveUpIds : []
      } catch (e) {
        return []
      }
    }
  }
  return []
}

// Save gave up puzzle to localStorage
const saveGaveUp = (puzzleId: number) => {
  if (import.meta.client) {
    const gaveUpPuzzles = getGaveUpPuzzles()
    if (!gaveUpPuzzles.includes(puzzleId)) {
      gaveUpPuzzles.push(puzzleId)
      localStorage.setItem('advent-gaveup', JSON.stringify(gaveUpPuzzles))
    }
  }
}

const { checkAnswer } = usePuzzles()

const submitAnswer = () => {
  if (!props.puzzle || !userAnswer.value.trim()) return

  // Prevent solving if already gave up
  const gaveUpPuzzles = getGaveUpPuzzles()
  if (gaveUpPuzzles.includes(props.puzzle.id)) {
    return
  }

  const isCorrect = checkAnswer(props.puzzle.id, userAnswer.value)

  if (isCorrect) {
    showSuccess.value = true
    showError.value = false

    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    })

    emit('solved', props.puzzle.id)
  } else {
    showError.value = true
    showSuccess.value = false
  }
}

const closeModal = () => {
  emit('close')
}

// Give up function - shows confirmation first
const giveUp = () => {
  showConfirmGiveUp.value = true
}

// Confirm give up - marks puzzle as failed and shows Pro Tip
const confirmGiveUp = () => {
  if (!props.puzzle) return

  showConfirmGiveUp.value = false
  showGaveUp.value = true
  showError.value = false
  showSuccess.value = false

  // Save to localStorage so puzzle stays "gave up" permanently
  saveGaveUp(props.puzzle.id)
}

// Cancel give up
const cancelGiveUp = () => {
  showConfirmGiveUp.value = false
}

// Share on LinkedIn
const shareOnLinkedIn = () => {
  if (!props.puzzle) return

  const text = `Just solved Day ${props.puzzle.id} of Advent of LinkedIn Ads! 🎄

"${props.puzzle.title}"

Testing my LinkedIn Ads knowledge with 24 daily puzzles.

Try it yourself (100% private, runs in your browser): https://adventoflinkedinads.vercel.app

#LinkedInAds #B2BMarketing #DigitalMarketing`

  const url = 'https://adventoflinkedinads.vercel.app'

  if (import.meta.client) {
    // Use LinkedIn's intent URL with text parameter
    const linkedInShareUrl = `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(text)}`
    window.open(linkedInShareUrl, '_blank', 'width=600,height=600')
  }
}
</script>
