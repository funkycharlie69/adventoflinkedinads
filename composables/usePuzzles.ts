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
    // All 24 LinkedIn Ads puzzles - Brand New Content
    const initialPuzzles: Puzzle[] = [
      {
        id: 1,
        title: 'The "Candy Crush" Leak',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are reviewing your delivery report. You see clicks coming from mobile gaming apps and third-party websites, which are resulting in high bounce rates.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which specific placement setting must you turn OFF to stop this?</p>
          </div>
        `,
        answer: /^(linkedin)?audiencenetwork|lan|l\.?a\.?n\.?$/i,
        hint: 'Go ahead and turn LAN off. In my experience, it drives a lot of accidental clicks from mobile games rather than high-intent B2B traffic. You want your ads appearing right in the professional news feed.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 2,
        title: 'The Boolean Trap',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You want to target "Marketing Managers" who also know "Sales".</p>
            <p><strong>Setup A:</strong> Job Title "Marketing Manager" OR Skill "Sales".</p>
            <p><strong>Setup B:</strong> Job Title "Marketing Manager" AND Skill "Sales".</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which setup results in a smaller, more specific audience?</p>
          </div>
        `,
        answer: /^(setup)?b|and|b\(and\)$/i,
        hint: 'Think of it this way: "OR" makes the audience bigger (quantity), "AND" makes it smaller (quality). For this niche target, you definitely want "AND" to ensure they have both qualifications.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 3,
        title: 'The "Ghost" Visitor',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You want to retarget people who visited your website. You go to create the audience, but LinkedIn says it can't detect any website traffic.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>What piece of code is missing from your website?</p>
          </div>
        `,
        answer: /^insighttag|linkedintag$/i,
        hint: 'This is non-negotiable! You need to get the Insight Tag installed on your site today. Without it, you\'re flying blind—you can\'t track conversions or build retargeting pools.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 4,
        title: 'The Match Rate Discrepancy',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You have two CSV lists to upload.</p>
            <p><strong>List A:</strong> 1,000 Work Email Addresses.</p>
            <p><strong>List B:</strong> 1,000 Personal Email Addresses.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which list will likely have a higher match rate?</p>
          </div>
        `,
        answer: /^(list)?b|personalemail(s)?$/i,
        hint: 'If you have personal emails, upload them! Match rates on work emails are often low (30-50%) because people link their personal Gmail to their LinkedIn profile, not their corporate Outlook.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 5,
        title: 'The Bidding Trap',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You launch a new campaign using "Maximum Delivery" (Automated) bidding. By 10:00 AM, your entire daily budget is gone, and the CPC was very high.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>To control costs and pace the budget better, which bidding strategy should you switch to?</p>
          </div>
        `,
        answer: /^manual(cpc)?|manualbidding$/i,
        hint: 'Automated bidding is designed to spend your budget, not save it. I suggest switching to Manual CPC. It gives you control over exactly how much you\'re willing to pay per click, ensuring you don\'t blow the budget before lunch.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 6,
        title: 'The Personal Email',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You launch a Lead Gen Form campaign. The first 10 leads come in. 9 of them are @gmail.com or @yahoo.com addresses. The client is annoyed.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Why did the form capture personal emails instead of work emails?</p>
          </div>
        `,
        answer: /^profileautofill|autofill$/i,
        hint: 'Don\'t worry, this is normal. LinkedIn autofills the form with the email the user registered with—which is usually their personal one. The lead quality is often still great; you just need to map it correctly in your CRM.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 7,
        title: 'The "Expansion" Button',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are targeting a precise list of CFOs. You notice your ads are being shown to "Junior Accountants" and "Financial Students."</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>You likely left a specific checkbox enabled in the audience section. What is it?</p>
          </div>
        `,
        answer: /^audienceexpansion|expansion$/i,
        hint: 'I always recommend unchecking this box immediately. You built this audience carefully to reach decision-makers; enabling "Expansion" just dilutes your budget on people who can\'t buy your product. Stick to your quality targets.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 8,
        title: 'The Cost of Tech',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are targeting Tech CEOs in the US. Your CPC is $12.00. The client thinks something is broken because Facebook clicks are $2.00.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Is a $12 CPC normal for this audience on LinkedIn? (Yes/No).</p>
          </div>
        `,
        answer: /^yes$/i,
        hint: 'I know it looks high compared to Facebook, but yes, $12+ is normal for US Tech CEOs. You\'re paying a premium for verified professional data. The intent and quality here are much higher than a $2 generic click.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 9,
        title: 'The Competitor Block',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You notice your fiercest competitor is clicking your ads to drain your budget.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>You can't block specific people, but you can upload a list of [What?] to exclude them?</p>
          </div>
        `,
        answer: /^companyname(s)?|competitor(exclusion)?(list)?|companies$/i,
        hint: 'Save your budget for actual prospects. Create a "Competitor Exclusion List" with the company names of your top rivals so they stop seeing (and clicking) your ads.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 10,
        title: 'The "Spam" Cap',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>Your boss wants the same user to see your ad 10 times in one day to "ensure they remember us."</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Can you force LinkedIn to do this?</p>
          </div>
        `,
        answer: /^no|frequencycap$/i,
        hint: 'LinkedIn actually protects you from being "that annoying brand." They cap frequency (usually once every 24-48 hours) to keep the user experience premium. You\'re better off spreading those impressions out over a week.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 11,
        title: 'The Minimum Budget',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are trying to launch a brand new campaign. You set the daily budget to $8.00. The campaign saves, but shows an error and won't run.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>What is the hard minimum daily budget allowed by LinkedIn?</p>
          </div>
        `,
        answer: /^\$?10(\.00)?$/i,
        hint: 'LinkedIn has a strict floor of $10/day per campaign. Honestly, to get statistically significant data quickly, you should usually start a bit higher, but $10 is the absolute minimum to get the engine running.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 12,
        title: 'The "Lead Gen" Boost',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are running an A/B test. Campaign A sends traffic to a Landing Page. Campaign B uses a LinkedIn Lead Gen Form.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Based on benchmarks, Campaign B (Lead Gen Form) will convert at 10-20%. What is the typical conversion rate for Campaign A (Landing Page)?</p>
          </div>
        `,
        answer: /^2-5%?|2to5%?$/i,
        hint: 'Native Lead Gen Forms almost always win on conversion rate—often hitting 10-20%. Landing pages add friction (load times, mobile formatting), so you will usually see them sit closer to 2-5%.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 13,
        title: 'The Google Analytics Gap',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>Campaign Manager reports 100 Clicks. Google Analytics reports only 75 Sessions.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Is this a system error, or a normal discrepancy?</p>
          </div>
        `,
        answer: /^normal(discrepancy)?|10-30%?$/i,
        hint: 'Don\'t stress about this one. It\'s a standard discrepancy. LinkedIn charges for the click on the ad, but GA4 only counts when the page fully loads. You will always lose a few impatient users in that split second.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 14,
        title: 'The Expensive Title',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>Targeting "Job Title: Marketing Manager" is costing you $15 per click. You want to lower the cost while keeping the audience relevant.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Instead of "Job Title," what two targeting criteria should you combine to broaden reach and lower CPC?</p>
          </div>
        `,
        answer: /^(job)?function(\+|and)?seniority|seniority(\+|and)?function$/i,
        hint: 'Job Titles are finite and expensive. If you target the "Marketing" Function plus "Manager" Seniority, you reach the same people (plus some valid variations) at a much more efficient CPM.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 15,
        title: 'The PDF Play',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You have a whitepaper. You want users to read it without having to leave the LinkedIn Feed or visit your website.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which specific ad format should you build?</p>
          </div>
        `,
        answer: /^documentad(s)?$/i,
        hint: 'You should definitely test Document Ads here. They allow the user to read your whitepaper directly in the feed. It\'s a great user experience and builds authority before they even click to download.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 16,
        title: 'The 300 Barrier',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You have 250 visitors in your "Company Page Visitors" audience. You try to launch a retargeting campaign. It fails to deliver impressions.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>How many more visitors do you need before the campaign will run?</p>
          </div>
        `,
        answer: /^50|fifty$/i,
        hint: 'You\'re almost there. The system requires a minimum of 300 active members to protect user privacy. Keep driving top-of-funnel traffic, and once you cross 300, this campaign will automatically kick in.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 17,
        title: 'The Fatigue Warning',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>Your ads performed great for the first month. Now, in Week 5, the CTR has dropped below 0.35% and Frequency is above 4.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>What is the standard advice for how often you should refresh creative?</p>
          </div>
        `,
        answer: /^(every)?3to6week(s)?|3-6week(s)?$/i,
        hint: 'It looks like ad fatigue set in. LinkedIn audiences are smaller than Facebook\'s, so they get bored faster. You should refresh the creative—new images or headlines—every 3 to 6 weeks to keep performance high.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 18,
        title: 'The Offline Loop',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You generated 100 leads. 5 of them turned into paying customers in Salesforce.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>How do you tell the LinkedIn algorithm which specific ads drove those 5 sales?</p>
          </div>
        `,
        answer: /^offlineconversion(s)?(api)?$/i,
        hint: 'This is how you prove ROI. By connecting your CRM to the Offline Conversions API, you can feed those 5 "Closed Won" deals back into LinkedIn. This teaches the algorithm to find more buyers, not just lead-fillers.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 19,
        title: 'The Video Stopwatch',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>Your creative team sends you a 2-minute "Brand Story" video. You know LinkedIn users scroll fast.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>To maximize performance, you edit the video down. What is the recommended maximum length you should aim for?</p>
          </div>
        `,
        answer: /^(under)?15(second(s)?)?$/i,
        hint: 'Keep it snappy. Corporate attention spans are short! If you can deliver the value proposition in under 15 seconds, you typically see much higher completion rates and better engagement.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 20,
        title: 'The Audience Goldilocks Zone',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p><strong>Audience A:</strong> 10k members.</p>
            <p><strong>Audience B:</strong> 50k members.</p>
            <p><strong>Audience C:</strong> 500k members.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>According to general B2B best practices, which audience size is "Ideal"?</p>
          </div>
        `,
        answer: /^(audience)?b|20k?-80k?|20,?000-80,?000$/i,
        hint: 'You want to aim for the sweet spot: 20k to 80k. Anything smaller and the campaign struggles to deliver; anything larger (like Audience C) usually means you\'re being too broad and wasting money.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 21,
        title: 'The Forgotten Format',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You have a small budget and simply want to keep your logo in front of a target audience to build name recognition. You don't care about clicks, you just want cheap impressions.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which ad format should you choose? (Hint: It appears on the right rail).</p>
          </div>
        `,
        answer: /^textad(s)?$/i,
        hint: 'Don\'t underestimate these! Text Ads have a low click-through rate, but they are incredibly cheap to run. They\'re perfect for keeping your brand "always-on" in the desktop sidebar without draining your main budget.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 22,
        title: 'The Benchmark Check',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p><strong>Ad A CTR:</strong> 0.25%.</p>
            <p><strong>Ad B CTR:</strong> 0.45%.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which ad is performing "Good" according to standard benchmarks?</p>
          </div>
        `,
        answer: /^(ad)?b|0\.45%?|bisgood$/i,
        hint: 'Ad B is your winner. Generally, 0.40% is the benchmark for "Good" on LinkedIn. Ad A is dragging you down, so pause it and test a new variation.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 23,
        title: 'The Free Data',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You paused all your ads. You are spending $0. You still want to know the Job Titles of the people visiting your corporate website.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Where in Campaign Manager can you see this data for free?</p>
          </div>
        `,
        answer: /^websitedemographic(s)?$/i,
        hint: 'This is one of my favorite free features. Even with ads paused, the "Website Demographics" tab analyzes your organic traffic. It\'s a goldmine for market research.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 24,
        title: 'The Strategic Retargeting Flow',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are building a full funnel strategy.</p>
            <p><strong>Step 1:</strong> Show a Video Ad to a cold audience.</p>
            <p><strong>Step 2:</strong> Retarget users who showed interest with a Lead Gen Form.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>According to the "Common Strategy" experts use, what is the specific Video View % threshold you should use to define the retargeting audience?</p>
          </div>
        `,
        answer: /^50%?|fiftypercent$/i,
        hint: 'Here is the classic playbook: Run a video to a broad audience, then retarget anyone who watched at least 50%. If they stayed for half the video, they\'re interested. That\'s your warm audience for the Lead Gen Form.',
        isLocked: true,
        isSolved: false
      }
    ]

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

  // Unlock puzzles based on date (Advent calendar style)
  const unlockByDate = () => {
    // const today = new Date()
    // const december = today.getMonth() === 11 // December is month 11
    // const day = today.getDate()

    // if (!december || day < 1) {
    //   // Before December: unlock only Day 1
    //   puzzles.value.forEach(puzzle => {
    //     puzzle.isLocked = puzzle.id !== 1
    //   })
    // } else if (day >= 24) {
    //   // After Dec 24: unlock all
      puzzles.value.forEach(puzzle => {
        puzzle.isLocked = false
      })
    // } else {
    //   // During December: unlock days 1 through current day
    //   puzzles.value.forEach(puzzle => {
    //     puzzle.isLocked = puzzle.id > day
    //   })
    // }
  }

  return {
    puzzles,
    loadProgress,
    saveProgress,
    checkAnswer,
    unlockByDate
  }
}
