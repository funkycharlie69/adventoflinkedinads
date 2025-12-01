export interface Puzzle {
  id: number
  title: string
  question: string
  answer: string | RegExp
  hint: string
  isLocked: boolean
  isSolved: boolean
}

export const usePuzzles = () => {
  const puzzles = useState<Puzzle[]>('puzzles', () => {
    // Initialize with 24 puzzles
    const initialPuzzles: Puzzle[] = [
      {
        id: 1,
        title: 'Manual Bidding Math',
        question: `
          <p class="mb-4">Your campaign is underspending. Your daily budget is €100, but you only spent €35 yesterday.</p>
          <p class="mb-4">Your bid is €6.50 (Manual). To clear the budget with the same CTR, roughly what percentage should you increase your bid?</p>
        `,
        answer: /^(2[0-9]|30)%?$/i, // Accepts 20-30 with or without %
        hint: 'Think about the relationship between bid and spend. If you spent €35 instead of €100, you need to spend roughly 2.85x more. Your bid needs to increase proportionally. CAPAC automates these calculations in real-time.',
        isLocked: false,
        isSolved: false
      }
    ]

    // Add 23 more locked puzzles (to be populated later)
    for (let i = 2; i <= 24; i++) {
      initialPuzzles.push({
        id: i,
        title: `Day ${i} - Coming Soon`,
        question: '<p>This puzzle will unlock soon!</p>',
        answer: '',
        hint: '',
        isLocked: true,
        isSolved: false
      })
    }

    return initialPuzzles
  })

  // Load solved state from localStorage on client side
  const loadProgress = () => {
    if (import.meta.client) {
      const saved = localStorage.getItem('advent-progress')
      if (saved) {
        const solvedIds = JSON.parse(saved)
        puzzles.value.forEach(puzzle => {
          if (solvedIds.includes(puzzle.id)) {
            puzzle.isSolved = true
          }
        })
      }
    }
  }

  // Save solved state to localStorage
  const saveProgress = () => {
    if (import.meta.client) {
      const solvedIds = puzzles.value
        .filter(p => p.isSolved)
        .map(p => p.id)
      localStorage.setItem('advent-progress', JSON.stringify(solvedIds))
    }
  }

  // Check if answer is correct
  const checkAnswer = (puzzleId: number, userAnswer: string): boolean => {
    const puzzle = puzzles.value.find(p => p.id === puzzleId)
    if (!puzzle) return false

    // Normalize user answer: trim, lowercase, remove spaces
    const normalized = userAnswer.trim().toLowerCase().replace(/\s+/g, '')

    // Check against regex or string
    let isCorrect = false
    if (puzzle.answer instanceof RegExp) {
      isCorrect = puzzle.answer.test(normalized)
    } else {
      const normalizedAnswer = puzzle.answer.toLowerCase().replace(/\s+/g, '')
      isCorrect = normalized === normalizedAnswer
    }

    if (isCorrect) {
      puzzle.isSolved = true
      saveProgress()
    }

    return isCorrect
  }

  // Unlock puzzles based on date (optional - for post-MVP)
  const unlockByDate = () => {
    const today = new Date()
    const december = today.getMonth() === 11 // December is month 11
    const day = today.getDate()

    if (december && day <= 24) {
      puzzles.value.forEach(puzzle => {
        if (puzzle.id <= day) {
          puzzle.isLocked = false
        }
      })
    }
  }

  return {
    puzzles,
    loadProgress,
    saveProgress,
    checkAnswer,
    unlockByDate
  }
}
