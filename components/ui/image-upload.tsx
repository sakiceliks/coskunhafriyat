"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  label: string
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  multiple?: boolean
  values?: string[]
  onMultipleChange?: (urls: string[]) => void
}

export function ImageUpload({
  label,
  value,
  onChange,
  onRemove,
  multiple = false,
  values = [],
  onMultipleChange,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)

  const handleFileUpload = async (file: File) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Upload failed")
      }

      const data = await response.json()

      if (multiple && onMultipleChange) {
        onMultipleChange([...values, data.url])
      } else {
        onChange(data.url)
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const removeImage = (urlToRemove: string) => {
    if (multiple && onMultipleChange) {
      onMultipleChange(values.filter((url) => url !== urlToRemove))
    } else if (onRemove) {
      onRemove()
    }
  }

  return (
    <div className="space-y-4">
      <Label>{label}</Label>

      {/* Upload Button */}
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
          className="hidden"
          id={`file-upload-${label}`}
        />
        <Label htmlFor={`file-upload-${label}`} className="cursor-pointer">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="flex items-center gap-2 bg-transparent"
            asChild
          >
            <span>
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload Image
                </>
              )}
            </span>
          </Button>
        </Label>
      </div>

      {/* Single Image Display */}
      {!multiple && value && (
        <div className="relative inline-block">
          <Image
            src={value || "/placeholder.svg"}
            alt="Uploaded image"
            width={200}
            height={150}
            className="rounded-lg object-cover border"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
            onClick={() => removeImage(value)}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Multiple Images Display */}
      {multiple && values.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {values.map((url, index) => (
            <div key={index} className="relative">
              <Image
                src={url || "/placeholder.svg"}
                alt={`Gallery image ${index + 1}`}
                width={150}
                height={100}
                className="rounded-lg object-cover border w-full"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={() => removeImage(url)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!value && (!multiple || values.length === 0) && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">No image uploaded</p>
        </div>
      )}
    </div>
  )
}
