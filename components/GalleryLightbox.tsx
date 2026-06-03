'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useLang } from '@/lib/i18n'

interface Props {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function GalleryLightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const { t } = useLang()
  const [mounted, setMounted] = useState(false)
  const canPrev = index > 0
  const canNext = index < images.length - 1

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && canPrev) onPrev()
      if (e.key === 'ArrowRight' && canNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [index, canPrev, canNext, onClose, onPrev, onNext])

  if (!mounted) return null

  const content = (
    <div
      className="fixed inset-0 z-[400] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(3,13,13,0.95)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative"
        style={{ width: 'min(80vw, 1200px)', height: '80vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          fill
          className="object-contain"
          sizes="80vw"
          priority
        />
      </div>

      <button
        onClick={onClose}
        aria-label={t.common.close}
        className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}
      >
        <X size={18} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
      </button>

      {canPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev() }}
          aria-label={t.common.previous}
          className="absolute left-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}
        >
          <ChevronLeft size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      )}

      {canNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext() }}
          aria-label={t.common.next}
          className="absolute right-5 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(255,249,237,0.12)', border: '1px solid rgba(250,230,193,0.20)' }}
        >
          <ChevronRight size={20} strokeWidth={1.5} style={{ color: '#FAE6C1' }} />
        </button>
      )}

      <div
        className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display uppercase tracking-[0.12em] text-[11px]"
        style={{ color: 'rgba(250,230,193,0.50)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} / {images.length}
      </div>
    </div>
  )

  return createPortal(content, document.body)
}
