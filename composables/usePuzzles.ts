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
    // All 24 LinkedIn Ads puzzles
    const initialPuzzles: Puzzle[] = [
      // Week 1: The "Intern" (Basic Mechanics & Interface)
      {
        id: 1,
        title: 'The "Unspecified" Mystery',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You launch a campaign targeting "United Kingdom". You check the Demographics report after 3 days. You see 15% of your impressions come from a location called "Unspecified". The client is panicking, thinking these are bots.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>To fix this for the future, you must change the "Location" setting from "Recent or Permanent" to <strong>[BLANK]</strong>.</p>
          </div>
        `,
        answer: /^permanent(\s*location)?$/i,
        hint: '"Unspecified" in LinkedIn demographics often appears when a user\'s IP (Recent) doesn\'t match their Profile (Permanent). Forcing "Permanent" removes most transient/IP-based matches.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 2,
        title: 'The Truncation Trap (Mobile)',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are writing copy for a Single Image Ad. You used the full 200 characters allowed in the headline field.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>On the LinkedIn mobile app, at approximately how many characters will your headline get cut off (truncated) with "..."? (Pick the closest: 70, 100, 150)</p>
          </div>
        `,
        answer: /^70$/i,
        hint: 'While the field accepts 200 characters, mobile viewports strictly cut off headlines around ~70-75 characters.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 3,
        title: 'The Logic Gate',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are building an audience with these rules:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Include: Location: "United States"</li>
              <li>Exclude: Location: "California"</li>
              <li>Include: Company: "Google" (HQ in California)</li>
            </ul>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Does a Google employee living in San Francisco see your ad? (Yes or No)</p>
          </div>
        `,
        answer: /^no$/i,
        hint: 'Geographic Exclusions operate at the highest hierarchy. Even if the Company is "Included", the user is physically inside an "Excluded" geo, so they are blocked.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 4,
        title: 'The "Ready" but Dead Audience',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You upload a contact list of 290 VIP leads. The match rate is 100%. The status says "Ready". You launch the campaign.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>The campaign spends $0 after 48 hours. Why? (Hint: minimum size requirement)</p>
          </div>
        `,
        answer: /^(minimum\s*(audience\s*)?size|300|audience\s*size)$/i,
        hint: 'A Matched Audience must have at least 300 active members to serve ads. "Ready" status just means the processing is done, not that it\'s large enough to serve.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 5,
        title: 'The Test Lead Failure',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You set up a Lead Gen Form integration with HubSpot. You click the "Send Test Lead" button in Campaign Manager. HubSpot rejects it. You check the field mapping, it is perfect.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Why did HubSpot reject the test?</p>
          </div>
        `,
        answer: /^(invalid\s*email|validation\s*rules?|test.*email|email.*validation)$/i,
        hint: 'LinkedIn\'s test button sends a dummy email (often test@linkedin.com). Many CRM validation rules block this specific domain or format as spam.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 6,
        title: 'The Language Barrier',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>Your target audience is in Germany. You want to run ads in English because they are tech workers.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>To ensure the ads run, should you set the Campaign Language to German (Location) or English (Ad Copy)?</p>
          </div>
        `,
        answer: /^english$/i,
        hint: 'Campaign Language must always match the language of the creative/copy. You target the German Location but set the Profile Language to English to reach English-speaking Germans.',
        isLocked: true,
        isSolved: false
      },

      // Week 2: The "Manager" (Optimization & Cost)
      {
        id: 7,
        title: 'The Expensive Title',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You want to target Marketing Managers. You have two options:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Option A: Target Job Title: "Marketing Manager"</li>
              <li>Option B: Target Job Function: "Marketing" + Seniority: "Manager"</li>
            </ul>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Which option will typically have a lower CPM?</p>
          </div>
        `,
        answer: /^(option\s*)?b|(function.*seniority|seniority.*function)$/i,
        hint: 'Job Titles are finite and highly competitive (expensive). "Function" is a broader bucket that captures non-standard titles, increasing supply and lowering CPM.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 8,
        title: 'The Video View Myth',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are reporting on a video campaign. The client asks for the "Cost Per View" (CPV).</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>LinkedIn defines a "View" as a user watching for at least <strong>[Number]</strong> continuous seconds with 50% of pixels in view.</p>
          </div>
        `,
        answer: /^2(\s*seconds?)?$/i,
        hint: 'This is the industry standard "2-second continuous view" used by LinkedIn billing.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 9,
        title: 'The Boolean Order',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You type this into the Job Title field: <code>Manager OR Director AND Sales</code></p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>How does LinkedIn interpret this?</p>
            <ul class="list-disc pl-6 space-y-1 mt-2">
              <li>A: (Manager OR Director) AND Sales (Sales Managers and Sales Directors)</li>
              <li>B: Manager OR (Director AND Sales) (All Managers + Sales Directors)</li>
            </ul>
          </div>
        `,
        answer: /^(option\s*)?b$/i,
        hint: 'The AND operator has higher precedence than OR. You must use parentheses (Manager OR Director) AND Sales to get result A.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 10,
        title: 'The Message Ad "Floor"',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are running a "Sponsored Messaging" (Conversation Ad) campaign.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Unlike Sponsored Content which has a floor of ~$2.00+, the minimum "Cost Per Send" (CPS) bid floor is approximately <strong>[Amount]</strong>? (Range: $0.10 - $0.50)</p>
          </div>
        `,
        answer: /^(\$|€)?0?\.?[2-4]0?(\s*(cents?|¢))?$/i,
        hint: 'The CPS model is much cheaper per unit than CPC, often sitting around 20-40 cents per send.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 11,
        title: 'The Employee Exclusion',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You want to exclude your own employees from seeing your ads. You exclude "Company: [Your Company]".</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Your CEO still sees the ad. Why?</p>
          </div>
        `,
        answer: /^(ceo.*profile|profile.*not.*link|not.*linked|profile.*incorrect)$/i,
        hint: 'Company exclusion only works if the employee has selected the official company page from the dropdown in their experience section. If they typed it as plain text, they are not mapped to the ID.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 12,
        title: 'The Rolling Cap',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You set a Frequency Cap of "3 impressions per 7 days". A user sees your ad 3 times on Tuesday.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>When is the earliest they can see it again?</p>
          </div>
        `,
        answer: /^(next\s*)?tuesday$/i,
        hint: 'LinkedIn frequency caps use a rolling window, not a calendar week (Mon-Sun).',
        isLocked: true,
        isSolved: false
      },

      // Week 3: The "Tech Lead" (Tracking & Retargeting)
      {
        id: 13,
        title: 'The Organic Pool',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You create a Retargeting Audience for "Company Page Visitors (30 Days)".</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Does this audience include people who visited your page via Organic Search (Google SEO), or only those who clicked an Ad?</p>
          </div>
        `,
        answer: /^(both|organic.*paid|all)$/i,
        hint: 'Page Visitor audiences are built from any visit to the LinkedIn Page, making it a powerful way to monetize organic traffic.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 14,
        title: 'The Sender Request',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are setting up a Message Ad coming from an industry influencer (external to your company).</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>You cannot activate the campaign until the influencer does what specific action?</p>
          </div>
        `,
        answer: /^approv(e|es|ed|ing)(\s*the)?(\s*sender)?(\s*request)?$/i,
        hint: 'You must send a request via Campaign Manager. The influencer receives a notification in their personal LinkedIn "My Network" tab and must click "Approve".',
        isLocked: true,
        isSolved: false
      },
      {
        id: 15,
        title: 'The Missing Demographics',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You look at the "Demographics" tab to see which Job Titles are clicking. The report shows titles for 50 clicks, but your campaign has 70 total clicks.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Why are 20 clicks missing from the breakdown?</p>
          </div>
        `,
        answer: /^(privacy.*threshold|reporting.*minimum|threshold|anonymity)$/i,
        hint: 'LinkedIn does not report demographic data for segments with fewer than ~10 interactions to protect user anonymity.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 16,
        title: 'The Audience Network (LAN)',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You target "Skill: DevOps". You leave "LinkedIn Audience Network" ON. Your ad appears on a "Candy Crush" style mobile game.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Why did this happen?</p>
          </div>
        `,
        answer: /^user\s*targeting(\s*not\s*contextual)?$/i,
        hint: 'LAN targets the User (who has the DevOps skill), not the Content of the app they are playing.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 17,
        title: 'The Match Rate Disappointment',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You upload a list of 10,000 Work Emails (business domains) to Matched Audiences. Your match rate is only 15%.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Why so low?</p>
          </div>
        `,
        answer: /^personal\s*email(s)?(\s*on\s*profiles?)?$/i,
        hint: 'Most users register on LinkedIn with their personal (Gmail/Yahoo) emails, not their work emails. Uploading personal emails usually yields a 50%+ match rate.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 18,
        title: 'The Insight Tag',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You install the Insight Tag on your website. You want to retarget visitors to a specific blog post.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Do you need to set up the audience before you run the ads, or does the tag retroactive-fill the audience?</p>
          </div>
        `,
        answer: /^retroactive(ly)?(\s*fill)?$/i,
        hint: 'As long as the Tag was on the site, it has been collecting user data. When you create the "Audience" rule today, it will instantly populate with past visitors (up to 90/180 days).',
        isLocked: true,
        isSolved: false
      },

      // Week 4: The "CMO" (Strategy & Attribution)
      {
        id: 19,
        title: 'The "Ghost" Conversion',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>A user sees your ad on the LinkedIn Mobile App (View, no click). 2 days later, they visit your site on Desktop and convert. Your Attribution Window is "30-Day Click, 7-Day View". Campaign Manager counts the conversion.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Does Google Analytics 4 count it as "Paid Social"? (Yes or No)</p>
          </div>
        `,
        answer: /^no$/i,
        hint: 'GA4 relies on Click-IDs (UTMs). Since there was no click (only a view), GA4 sees this as "Direct" or "Organic", causing a discrepancy.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 20,
        title: 'The Expensive Pacing',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You have a small audience (20k). You set the bid to "Maximum Delivery" (Automated). Your CPM skyrockets to $150+ and your budget vanishes by 10 AM.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Why did this happen?</p>
          </div>
        `,
        answer: /^(aggressive.*bid|max.*delivery|automated.*bid)$/i,
        hint: '"Max Delivery" aims to spend the entire daily budget. If the audience is small, the algorithm bids astronomically high to force impressions, resulting in inefficient spend. Solution: Use Manual Bidding.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 21,
        title: 'The Expiration Date',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You created a "Website Visitors (90 Days)" audience. A user visits your site on Day 1. They never return.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>On what day are they automatically removed from the audience?</p>
          </div>
        `,
        answer: /^(day\s*)?91$/i,
        hint: 'It is a rolling window. If they don\'t refresh the cookie/visit, they drop out after the specified duration.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 22,
        title: 'The "li_fat_id"',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You want to upload Offline Conversions (Deals) to LinkedIn to prove ROI. You don't have the user's email.</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>What is the specific technical parameter you should have captured in a hidden field on your lead form to ensure a 100% match rate?</p>
          </div>
        `,
        answer: /^li_fat_id$/i,
        hint: 'This is the click-identifier cookie. Uploading this ID yields a 100% match, whereas name/company matching is fuzzy and often fails.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 23,
        title: 'The Holdout Test',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <p>You are running a "Brand Lift" study. LinkedIn creates a "Control Group".</p>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>Do users in the Control Group see no ads from you, or do they see Placebo ads?</p>
          </div>
        `,
        answer: /^(no\s*ads?|ghost.*bid)$/i,
        hint: 'LinkedIn uses a "Ghost Bid" system where it calculates if a user would have won the auction, but then suppresses the ad. They do not show placebo creative.',
        isLocked: true,
        isSolved: false
      },
      {
        id: 24,
        title: 'The Final Boss (ROAS)',
        question: `
          <div class="space-y-3">
            <p class="font-semibold text-orange-500">Scenario:</p>
            <ul class="list-disc pl-6 space-y-1">
              <li>Ad Spend: $10,000</li>
              <li>Views: 500,000</li>
              <li>Clicks: 2,000</li>
              <li>Leads: 200</li>
              <li>Closed Deals: 10</li>
              <li>Contract Value: $3,000 each</li>
            </ul>
            <p class="font-semibold text-orange-500 mt-4">The Puzzle:</p>
            <p>The CFO asks for the ROAS (Return on Ad Spend). What is it?</p>
          </div>
        `,
        answer: /^(3:1|3\.0?:1|3|300%|3\.0)$/i,
        hint: 'The ultimate "Pro" skill is ignoring vanity metrics (Views/Clicks) and reporting on Revenue. Calculation: Revenue ($30,000) / Cost ($10,000) = 3.',
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
    const today = new Date()
    const december = today.getMonth() === 11 // December is month 11
    const day = today.getDate()

    if (!december || day < 1) {
      // Before December: unlock only Day 1
      puzzles.value.forEach(puzzle => {
        puzzle.isLocked = puzzle.id !== 1
      })
    } else if (day >= 24) {
      // After Dec 24: unlock all
      puzzles.value.forEach(puzzle => {
        puzzle.isLocked = false
      })
    } else {
      // During December: unlock days 1 through current day
      puzzles.value.forEach(puzzle => {
        puzzle.isLocked = puzzle.id > day
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
