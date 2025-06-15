"use client"

import { useState, useEffect } from "react"
import { Loader2, MapPin, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

interface AddressConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (address: string) => void
}

export function AddressConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
}: AddressConfirmationModalProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [address, setAddress] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editedAddress, setEditedAddress] = useState("")

  useEffect(() => {
    if (isOpen) {
      getCurrentLocation()
    }
  }, [isOpen])

  const getCurrentLocation = () => {
    setIsLoading(true)
    setError(null)

    if (!navigator.geolocation) {
      setError("Seu navegador não suporta geolocalização")
      setIsLoading(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1&accept-language=pt-BR`
          )
          const data = await response.json()
          
          // Formata o endereço de forma amigável
          const formattedAddress = formatAddress(data.address)
          setAddress(formattedAddress)
          setEditedAddress(formattedAddress)
          setIsLoading(false)
        } catch (error) {
          setError("Não foi possível obter seu endereço. Por favor, digite manualmente.")
          setIsLoading(false)
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError("Permissão de localização negada. Por favor, digite seu endereço manualmente.")
            break
          case error.POSITION_UNAVAILABLE:
            setError("Localização indisponível. Por favor, digite seu endereço manualmente.")
            break
          case error.TIMEOUT:
            setError("Tempo esgotado ao buscar localização. Por favor, digite seu endereço manualmente.")
            break
          default:
            setError("Erro ao obter localização. Por favor, digite seu endereço manualmente.")
        }
        setIsLoading(false)
      }
    )
  }

  const formatAddress = (addressDetails: any) => {
    const components = []
    
    if (addressDetails.road) components.push(addressDetails.road)
    if (addressDetails.house_number) components.push(addressDetails.house_number)
    if (addressDetails.suburb) components.push(addressDetails.suburb)
    if (addressDetails.city) components.push(addressDetails.city)
    if (addressDetails.state) components.push(addressDetails.state)
    
    return components.join(", ")
  }

  const handleConfirm = () => {
    const finalAddress = isEditing ? editedAddress : address
    onConfirm(finalAddress)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Confirme seu endereço
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
              <span className="ml-2">Obtendo sua localização...</span>
            </div>
          ) : error ? (
            <div className="space-y-4">
              <p className="text-sm text-red-500">{error}</p>
              <Input
                value={editedAddress}
                onChange={(e) => setEditedAddress(e.target.value)}
                placeholder="Digite seu endereço completo"
                className="w-full"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {!isEditing ? (
                <div className="flex items-start justify-between gap-2 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm flex-1">{address}</p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="shrink-0"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Input
                  value={editedAddress}
                  onChange={(e) => setEditedAddress(e.target.value)}
                  placeholder="Digite seu endereço completo"
                  className="w-full"
                />
              )}
            </div>
          )}
        </div>

        <DialogFooter className="flex gap-2 sm:gap-0">
          {!isLoading && (
            <>
              {!error && !isEditing && (
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(true)}
                  className="flex-1 sm:flex-none"
                >
                  Editar endereço
                </Button>
              )}
              <Button
                onClick={handleConfirm}
                className="bg-purple-600 hover:bg-purple-700 flex-1 sm:flex-none"
                disabled={isLoading || (!address && !editedAddress)}
              >
                Confirmar endereço
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 