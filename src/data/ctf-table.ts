export type TableEntryCategory = 'ctf' | 'project' | 'tools' | 'education'

export type CTFTableEntry = {
  name: string
  postId?: string
  category?: TableEntryCategory
  ranking: string
  openWriteups: string
  date: string
  comment?: string
}

/** Parse date string (M.D.YYYY or M.D-D.YYYY range) to timestamp for sorting. Unparseable = -Infinity (end). */
function parseDateForSort(dateStr: string): number {
  const match = dateStr.match(/(\d{1,2})\.(\d{1,2})(?:[-\s]\d{1,2})*\.(\d{4})/)
  if (!match) return -Infinity
  const [, m, d, y] = match
  const month = parseInt(m!, 10) - 1
  const day = parseInt(d!, 10)
  const year = parseInt(y!, 10)
  return new Date(year, month, day).getTime()
}

const CTF_TABLE_ENTRIES: CTFTableEntry[] = [
  {
    name: 'ncae overflow 3 2026',
    postId: 'ncae-overflow-3-2026',
    ranking: '1st',
    openWriteups: 'nein',
    date: '3.16.2026',
    comment: 'i was fighting for my life, yes.',
  },
  {
    name: 'utampa',
    postId: 'utampa-2026',
    ranking: '1st',
    openWriteups: 'nein',
    date: '2.7.2026',
    comment: 'was it close? nah i got it',
  },
  {
    name: 'dc207',
    postId: 'dc207-2025',
    ranking: '2nd',
    openWriteups: 'nein',
    date: '11.20.2025',
    comment: "my brain was legit fried...but 207 gang, you guys didn't send it :(",
  },
  {
    name: 'sans Veterans Day CTF 2025',
    postId: 'sans-veterans-day-ctf-2025',
    ranking: '5th',
    openWriteups: 'nein',
    date: '11.11.2025',
    comment: 'bootupctf but its quite bootlicker of a ctf',
  },
  {
    name: 'ncl fall 2025',
    postId: 'ncl-fall-2025',
    ranking: '18th (solo) / 18th (team)',
    openWriteups: 'nein',
    date: '11.10.2025',
    comment:
      'experimental challenges lead to experimental result (absolute mental)',
  },
  {
    name: 'Mission: Truist Possible',
    postId: 'mission-truist-possible-2025',
    ranking: '2nd',
    openWriteups: 'nein',
    date: '11.7.2025',
    comment: 'shibal',
  },
  {
    name: 'unr',
    postId: 'unr-2025',
    ranking: '1st',
    openWriteups: 'nein',
    date: '11.6.2025',
    comment: 'not even close',
  },
  {
    name: 'v1t',
    postId: 'v1t-2025',
    ranking: 'anon',
    openWriteups: 'ye',
    date: '10.31 - 11.2.2025',
    comment: 'competed with friends, really creative trivia challenges',
  },
  {
    name: 'und final',
    postId: 'und-final-2025',
    ranking: '13th',
    openWriteups: 'nein',
    date: '10.28.2025 (online)',
    comment: '📦 wrap it up gang, just open, just open it.',
  },
  {
    name: 'cyberweek @ unlv',
    postId: 'cyberweek-unlv-2025',
    ranking: '1st',
    openWriteups: 'nein',
    date: '10.3.2025',
    comment: 'MY REGION, MY SCHOOL muhehe.',
  },
  {
    name: 'infinite ctf qualifier',
    postId: 'infinite-qualifier',
    ranking: '5th',
    openWriteups: '🌹',
    date: '9.27.2025',
    comment:
      'attack/defense (2 boxes) — automation to cheese the bottom teams the strat;',
  },
  {
    name: 'amazon app sec ctf namer final',
    postId: 'amazon-appsec/final',
    ranking: '3rd',
    openWriteups: 'nein',
    date: '9.26.2025 (6 hours)',
    comment: '🐧 should not have gone to lunch.',
  },
  {
    name: 'holmes ctf',
    postId: 'holmes',
    ranking: 'dead (in game)',
    openWriteups: 'ye',
    date: '9.22-26.2025',
    comment:
      "forensics main players are having a blast with this. not me though.",
  },
  {
    name: 'und cyberhawks national ctf qualifiers 2025',
    postId: 'und-cyberhawksctf-qualifiers',
    ranking: '5th',
    openWriteups: 'nein',
    date: '9.16-20.2025',
    comment:
      'in such a short notice with no online-option for the final...while the flight ticket is 4 digits. BROTHERRRR 🤷🏽‍♀️.',
  },
  {
    name: 'owasp secure coding',
    postId: 'owasp-secure-coding',
    ranking: '1st. ($$$)',
    openWriteups: 'nein',
    date: '9.19-21.2025',
    comment: '💀.',
  },
  {
    name: 'fortidCTF',
    postId: 'fortidctf',
    ranking: '34',
    openWriteups: 'ye',
    date: '9.12-14.2025',
    comment: 'harder than i thought',
  },
  {
    name: 'amazon appsec ctf - namer quals',
    postId: 'amazon-appsec',
    ranking: '11th',
    openWriteups: 'nein',
    date: '9.11-13.2025',
    comment: 'great challenges from htb (no wus tho).',
  },
  {
    name: 'watCTF',
    postId: 'watctf-f25',
    ranking: '64th',
    openWriteups: 'ye',
    date: '9.9-11.2025',
    comment: 'classic waterloo.',
  },
  {
    name: 'imaginaryCTF',
    postId: 'imaginaryctf',
    ranking: '48th',
    openWriteups: 'ye',
    date: '9.5-7.2025',
    comment: 'a bunch of godlike ctf players.',
  },
  {
    name: 'corCTF',
    postId: 'corctf',
    ranking: '< 100th',
    openWriteups: 'ye',
    date: '9.4-5.2025',
    comment: 'will come back next year.',
  },
  {
    name: 'nullconCTF',
    postId: 'nullconctf',
    ranking: '39th',
    openWriteups: 'ye',
    date: '8.29-31.2025',
    comment: 'meh.',
  },
  {
    name: 'snakeCTF',
    postId: 'snakectf-quals',
    ranking: '41st',
    openWriteups: 'ye',
    date: '8.29-30.2025',
    comment: 'same as above.',
  },
  {
    name: 'ec council ctf (hackerverse)',
    ranking: '91 (atm)',
    openWriteups: 'nein?',
    date: 'dunno',
    comment: 'L ctf and L challenges. feels like a scam',
  },
  {
    name: 'scriptCTF',
    postId: 'scriptctf',
    ranking: '169st',
    openWriteups: 'ye',
    date: '8.15-17.2025',
    comment: 'disappointed in myself.',
  },
  {
    name: 'sekaiCTF',
    postId: 'sekaictf',
    ranking: 'aksjhdqawnbd Iciuqhgcqb',
    openWriteups: 'ye',
    date: 'we dont talk about this',
    comment: 'I was baffled, cooked, folded, and crumbled beyond belief.',
  },
  {
    name: 'diana initative',
    ranking: '2nd',
    openWriteups: 'no',
    date: '8.4.2025',
    comment: 'should have napped the first place.',
  },
  {
    name: 'init.g (google)',
    ranking: '1st',
    openWriteups: 'no',
    date: '8.8.2025',
    comment: 'how?',
  },
  {
    name: 'dod sentinel',
    postId: 'dod-sentinel',
    ranking: '29th',
    openWriteups: 'ye',
    date: '6.17.2025',
    comment: 'regret.',
  },
  {
    name: 'ncl (spring 2025)',
    ranking: '38th (solo) / 46th (team)',
    openWriteups: 'no',
    date: '1.27.2025 - 5.24.2025',
    comment: 'regret.',
  },
  {
    name: 'swampCTF',
    postId: 'swampctf',
    ranking: '42nd',
    openWriteups: 'ye',
    date: '3.28.2025',
    comment: 'second ctf.',
  },
  {
    name: 'metaCTF',
    postId: 'metactf',
    ranking: 'varies',
    openWriteups: 'ye',
    date: '3.30.2025',
    comment: 'best organizer / best support team.',
  },
  {
    name: 'ncae overflow 3',
    postId: 'ncae-overflow-3-2025',
    ranking: '1st',
    openWriteups: 'nein',
    date: '3.16.2025',
    comment: 'i was fighting for my life, yes.',
  },
  {
    name: 'ncae west overflow 2025',
    ranking: '2nd (regional)',
    openWriteups: 'nein',
    date: '3.16.2025',
    comment: 'first ctf. (L)',
  },
]

export const CTF_TABLE = CTF_TABLE_ENTRIES.sort(
  (a, b) => parseDateForSort(b.date) - parseDateForSort(a.date),
)
