"use client"

import { useState, useEffect } from "react"
import { QrCode, Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function QRAccess() {
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    setCurrentUrl(window.location.href)
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      console.log("Failed to copy")
    }
  }

  // Generate QR code URL using a public API
  const qrCodeUrl = currentUrl 
    ? `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}&bgcolor=18181b&color=ffffff&margin=10`
    : ""

  return (
    <div className="glass-card p-6 flex flex-col items-center space-y-4">
      <div className="flex items-center gap-2 text-zinc-400">
        <QrCode className="w-5 h-5" />
        <span className="text-sm font-medium">Accede desde tu dispositivo</span>
      </div>
      
      {qrCodeUrl && (
        <div className="p-3 bg-white rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={qrCodeUrl} 
            alt="QR Code para acceder al simulador"
            width={160}
            height={160}
            className="rounded-lg"
          />
        </div>
      )}

      <div className="flex flex-col items-center gap-2 w-full max-w-xs">
        <p className="text-xs text-zinc-500 text-center">
          Escanea el codigo QR o copia el enlace para acceder desde cualquier dispositivo
        </p>
        
        <div className="flex gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="flex-1 gap-2 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar enlace</span>
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(currentUrl, "_blank")}
            className="gap-2 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-700"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
