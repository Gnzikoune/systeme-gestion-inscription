"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  label?: string
  description?: string
}

export function ImageUpload({ value, onChange, label = "Image", description }: ImageUploadProps) {
  const [preview, setPreview] = useState(value)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Veuillez sélectionner une image valide")
      return
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("L'image ne doit pas dépasser 5 MB")
      return
    }

    // Convert to base64 for preview and storage
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result as string
      setPreview(base64String)
      onChange(base64String)
    }
    reader.readAsDataURL(file)
  }

  const handleRemove = () => {
    setPreview("")
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && <p className="text-xs text-muted-foreground">{description}</p>}

      <div className="space-y-4">
        {preview ? (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
            <Image src={preview || "/placeholder.svg"} alt="Preview" fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute right-2 top-2"
              onClick={handleRemove}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border transition-colors hover:border-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mb-2 h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Cliquez pour télécharger une image</p>
            <p className="text-xs text-muted-foreground">PNG, JPG, JPEG (max. 5MB)</p>
          </div>
        )}

        <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

        {preview && (
          <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
            <Upload className="mr-2 h-4 w-4" />
            Changer l'image
          </Button>
        )}
      </div>
    </div>
  )
}
