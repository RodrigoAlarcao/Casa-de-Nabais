'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import { X, ArrowLeft, ArrowRight } from 'lucide-react'
import { useLang } from '@/lib/i18n'

interface Props {
  images: { src: string; alt: string }[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

export default function ImageLightbox({ images, index, onClose, onPrev, onNext }: Props) {
  const { t } = useLang()
  const [mounted, setMounted] = useState(false)
  const dragStartX = useRef(0)
  const img = images[index]
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
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(3,29,29,0.92)', animation: 'lbFadeIn 0.22s ease' }}
      onClick={onClose}
    >
      <style>{`@keyframes lbFadeIn { from { opacity:0 } to { opacity:1 } }`}</style>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label={t.common.close}
        className="absolute top-4 right-4 z-10 p-3 rounded-full transition-opacity duration-200"
        style={{ color: '#FAE6C1', opacity: 0.9, background: 'rgba(3,29,29,0.45)' }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = '0.9' }}
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      {/* Image box */}
      <div
        className="relative"
        style={{ width: 'min(80vw, 1200px)', height: '80vh' }}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={(e) => { dragStartX.current = e.clientX }}
        onPointerUp={(e) => {
          const diff = dragStartX.current - e.clientX
          if (Math.abs(diff) < 8) return
          if (diff > 50 && canNext) onNext()
          else if (diff < -50 && canPrev) onPrev()
        }}
      >
        <Image
          key={img.src}
          src={img.src}
          alt={img.alt}
          fill
          className="object-contain"
          sizes="80vw"
          priority
        />
      </div>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); if (canPrev) onPrev() }}
        disabled={!canPrev}
        aria-label={t.common.previous}
        className="absolute left-5 p-3 transition-opacity duration-200"
        style={{ top: '50%', transform: 'translateY(-50%)', color: '#FAE6C1', opacity: canPrev ? 0.75 : 0.18 }}
        onMouseEnter={(e) => { if (canPrev) (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = canPrev ? '0.75' : '0.18' }}
      >
        <ArrowLeft size={26} strokeWidth={1.5} />
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); if (canNext) onNext() }}
        disabled={!canNext}
        aria-label={t.common.next}
        className="absolute right-5 p-3 transition-opacity duration-200"
        style={{ top: '50%', transform: 'translateY(-50%)', color: '#FAE6C1', opacity: canNext ? 0.75 : 0.18 }}
        onMouseEnter={(e) => { if (canNext) (e.currentTarget as HTMLButtonElement).style.opacity = '1' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = canNext ? '0.75' : '0.18' }}
      >
        <ArrowRight size={26} strokeWidth={1.5} />
      </button>

      {/* Counter */}
      <p
        className="absolute bottom-6 left-1/2 font-display text-[11px] uppercase tracking-[0.16em]"
        style={{ transform: 'translateX(-50%)', color: 'rgba(250,230,193,0.55)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {index + 1} {t.common.of} {images.length}
      </p>
    </div>
  )

  return createPortal(content, document.body)
}
