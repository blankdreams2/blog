import axios from 'axios'

import {
  GITHUB_ACCOUNTS,
  GITHUB_API_BASE_URL,
  GITHUB_USER_QUERY,
} from '@/consts'

export async function getGithubData() {
  if (!GITHUB_ACCOUNTS.token) {
    console.warn(
      '[github] GITHUB_TOKEN env var not set — contributions will be hidden',
    )
    return null
  }

  try {
    const now = new Date()
    const to = now.toISOString()
    const from = new Date(now)
    from.setFullYear(from.getFullYear() - 1)
    const fromStr = from.toISOString()

    const response = await axios.post(
      GITHUB_API_BASE_URL,
      {
        query: GITHUB_USER_QUERY,
        variables: {
          username: GITHUB_ACCOUNTS.username,
          from: fromStr,
          to,
        },
      },
      {
        headers: {
          Authorization: `bearer ${GITHUB_ACCOUNTS.token}`,
        },
      },
    )

    /*  */
    return (
      response.data?.data?.user?.contributionsCollection
        ?.contributionCalendar ?? null
    )
  } catch (err) {
    const status = axios.isAxiosError(err) ? err.response?.status : null
    const msg =
      status === 401
        ? 'Invalid or expired GITHUB_TOKEN'
        : 'GitHub API request failed'
    console.warn(`[github] ${msg} — contributions will be hidden`)
    return null
  }
}
