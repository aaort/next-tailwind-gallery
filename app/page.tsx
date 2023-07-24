import { createClient } from '@supabase/supabase-js'
import BlurImage from './components/BlurImage'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)
export type Image = {
  id: number
  href: string
  imageSrc: string
  name: string
  username: string
  created_at: Date
}

const Gallery = async () => {
  const images = (
    await supabaseAdmin.from<Image>('images').select('*').order('created_at')
  ).data

  if (!images) {
    return (
      <div className="flex h-[100svh] items-center justify-center">
        <h1 className="text-xl uppercase tracking-wider text-red-700">
          Something went wrong !!!
        </h1>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {images.map((image) => (
          <BlurImage key={image.id} image={image} />
        ))}
      </div>
    </div>
  )
}

export default Gallery
