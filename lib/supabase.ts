import {createClient} from '@supabase/supabase-js'
import type {SupabaseClient} from '@supabase/supabase-js'

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY as string

declare global {
  // eslint-disable-next-line no-var
  var supabase: SupabaseClient | undefined
}

const supabase = global.supabase || createClient(URL, KEY)

if (process.env.NODE_ENV !== 'production') {
  global.supabase = supabase
}

export default supabase
