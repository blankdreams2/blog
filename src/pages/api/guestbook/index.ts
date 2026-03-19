import type { APIRoute } from 'astro'
import { supabase } from '@/lib/supabase'

export const prerender = false

/** Fallback when POST gets converted to GET (e.g. redirect chain) */
export const GET: APIRoute = ({ redirect }) => {
  return redirect('/guestbook')
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData()
  const message = formData.get('message')?.toString()?.trim().slice(0, 500)
  const name = formData.get('name')?.toString()?.trim().slice(0, 100) || null
  const email = formData.get('email')?.toString()?.trim().slice(0, 255) || null

  if (!message) {
    return redirect('/guestbook?error=Message+required')
  }

  const { error } = await supabase
    .from('guestbook')
    .insert({ message, name, email })

  if (error) {
    return redirect('/guestbook?error=' + encodeURIComponent(error.message))
  }

  return redirect('/guestbook')
}
