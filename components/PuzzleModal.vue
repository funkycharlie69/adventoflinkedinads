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

        <!-- Success Message -->
        <div
          v-if="showSuccess"
          class="mb-6 p-4 bg-orange-500 bg-opacity-20 border border-orange-500 rounded-md"
        >
          <p class="text-white font-montserrat font-semibold mb-2">Correct! That's how a Senior Media Buyer thinks.</p>
          <p class="text-lighttext text-sm">
            Check out our sponsors to learn more about tools that can help automate these insights.
          </p>
        </div>

        <!-- Error Message -->
        <div
          v-if="showError"
          class="mb-6 p-4 bg-red-900 bg-opacity-30 border border-red-500 rounded-md"
        >
          <p class="text-red-300 font-montserrat">Not quite. Try again or get a hint!</p>
        </div>

        <!-- Input Form -->
        <div v-if="!puzzle?.isSolved" class="mb-6">
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

        <!-- Hint Section -->
        <div v-if="showHint" class="mb-6 p-4 bg-orange-500 bg-opacity-10 border border-orange-500 rounded-md">
          <p class="text-sm font-montserrat font-semibold text-orange-500 mb-2">Hint:</p>
          <p class="text-lighttext">{{ puzzle?.hint }}</p>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-4">
          <button
            v-if="!puzzle?.isSolved"
            @click="submitAnswer"
            class="flex-1 bg-orange-500 text-darkbg px-6 py-3 rounded-md font-montserrat font-semibold hover:bg-orange-600 transition-colors"
          >
            Submit Answer
          </button>
          <button
            v-if="!puzzle?.isSolved && !showHint"
            @click="showHint = true"
            class="flex-1 bg-gray-700 text-lighttext px-6 py-3 rounded-md font-montserrat font-semibold hover:bg-gray-600 transition-colors border border-gray-600"
          >
            Get Hint
          </button>
          <button
            v-if="puzzle?.isSolved"
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
const showHint = ref(false)
const showSuccess = ref(false)
const showError = ref(false)

// Reset state when modal opens/closes
watch(() => props.isOpen, (newVal) => {
  if (newVal) {
    userAnswer.value = ''
    showHint.value = false
    showSuccess.value = false
    showError.value = false
  }
})

const { checkAnswer } = usePuzzles()

const submitAnswer = () => {
  if (!props.puzzle || !userAnswer.value.trim()) return

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
</script>
