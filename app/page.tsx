"use client"

import { useState, useEffect } from "react"
import { Menu, X, Star, Instagram, Facebook, MapPin, Clock, Phone, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function AcaiDaMaryPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const products = [
    {
      name: "Açaí Tradicional",
      ingredients: "Açaí puro, granola, banana",
      price: "R$ 8,00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Açaí Especial",
      ingredients: "Açaí, granola, banana, morango, leite condensado",
      price: "R$ 12,00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Açaí Fitness",
      ingredients: "Açaí, granola, banana, mel, castanhas",
      price: "R$ 15,00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Açaí Tropical",
      ingredients: "Açaí, granola, manga, coco ralado, mel",
      price: "R$ 13,00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Açaí Completo",
      ingredients: "Açaí, granola, banana, morango, kiwi, leite ninho",
      price: "R$ 18,00",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Açaí Kids",
      ingredients: "Açaí, granola, banana, chocolate granulado",
      price: "R$ 10,00",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      text: "Melhor açaí da região! A Mary sempre capricha na qualidade. Já sou cliente há 2 anos!",
      date: "Janeiro 2025",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "João Santos",
      text: "Entrega rápida e produtos fresquinhos. O açaí especial é incrível!",
      date: "Dezembro 2024",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Ana Costa",
      text: "Variedade incrível de complementos. Meu favorito é o fitness da Mary!",
      date: "Fevereiro 2025",
      avatar: "/placeholder.svg?height=60&width=60",
    },
    {
      name: "Pedro Lima",
      text: "Atendimento excelente e preços justos. Super recomendo o Açaí da Mary!",
      date: "Janeiro 2025",
      avatar: "/placeholder.svg?height=60&width=60",
    },
  ]

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500)

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const generateWhatsAppLink = (message: string) => {
    const encodedMessage = encodeURIComponent(message)
    return `https://wa.me/5527988646488?text=${encodedMessage}`
  }

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-purple-600 flex items-center justify-center z-50">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold">AÇAÍ DA MARY E CIA</h2>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-purple-600 text-white z-40 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold text-sm">🍇</span>
            </div>
            <h1 className="text-xl font-bold">AÇAÍ DA MARY E CIA</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button onClick={() => scrollToSection("inicio")} className="hover:text-purple-200 transition-colors">
              Início
            </button>
            <button onClick={() => scrollToSection("produtos")} className="hover:text-purple-200 transition-colors">
              Produtos
            </button>
            <button onClick={() => scrollToSection("depoimentos")} className="hover:text-purple-200 transition-colors">
              Depoimentos
            </button>
            <button onClick={() => scrollToSection("contato")} className="hover:text-purple-200 transition-colors">
              Contato
            </button>
            <Button
              className="bg-white text-purple-600 hover:bg-purple-50"
              onClick={() =>
                window.open(
                  generateWhatsAppLink("Olá! Vim pelo site e gostaria de fazer um pedido no AÇAÍ DA MARY E CIA"),
                  "_blank",
                )
              }
            >
              Fazer Pedido
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-purple-700 border-t border-purple-500">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="block w-full text-left hover:text-purple-200"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("produtos")}
                className="block w-full text-left hover:text-purple-200"
              >
                Produtos
              </button>
              <button
                onClick={() => scrollToSection("depoimentos")}
                className="block w-full text-left hover:text-purple-200"
              >
                Depoimentos
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="block w-full text-left hover:text-purple-200"
              >
                Contato
              </button>
              <Button
                className="w-full bg-white text-purple-600 hover:bg-purple-50"
                onClick={() =>
                  window.open(
                    generateWhatsAppLink("Olá! Vim pelo site e gostaria de fazer um pedido no AÇAÍ DA MARY E CIA"),
                    "_blank",
                  )
                }
              >
                Fazer Pedido
              </Button>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-purple-800/80 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          }}
        ></div>
        <div className="relative z-20 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">AÇAÍ DA MARY E CIA</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Os melhores açaís de Nova Carapina com ingredientes selecionados
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all"
            onClick={() =>
              window.open(generateWhatsAppLink("Olá AÇAÍ DA MARY E CIA! Gostaria de fazer um pedido"), "_blank")
            }
          >
            Peça Já pelo WhatsApp
          </Button>
        </div>
      </section>

      {/* Products Section */}
      <section id="produtos" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">Nossos Açaís</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card
                key={index}
                className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.ingredients}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">{product.price}</span>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700"
                      onClick={() =>
                        window.open(
                          generateWhatsAppLink(
                            `Olá! Gostaria de pedir um ${product.name} (${product.price}) - AÇAÍ DA MARY E CIA`,
                          ),
                          "_blank",
                        )
                      }
                    >
                      Pedir
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            O que nossos clientes dizem
          </h2>
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-purple-50 rounded-lg p-8 shadow-lg">
              <div className="flex items-center mb-6">
                <Image
                  src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                  alt={testimonials[currentTestimonial].name}
                  width={60}
                  height={60}
                  className="rounded-full mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{testimonials[currentTestimonial].name}</h4>
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">{testimonials[currentTestimonial].date}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg italic">"{testimonials[currentTestimonial].text}"</p>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-purple-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siga o AÇAÍ DA MARY E CIA nas redes sociais</h2>
          <p className="text-xl mb-8">Acompanhe nossas novidades e promoções!</p>
          <div className="flex justify-center space-x-8">
            <a
              href="https://instagram.com/acaidamaryecia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-white p-4 rounded-full mb-2 group-hover:bg-pink-500 transition-colors">
                <Instagram size={32} className="text-purple-600 group-hover:text-white" />
              </div>
              <span className="font-semibold">Instagram</span>
            </a>
            <a
              href="https://facebook.com/acaidamaryecia"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group"
            >
              <div className="bg-white p-4 rounded-full mb-2 group-hover:bg-blue-600 transition-colors">
                <Facebook size={32} className="text-purple-600 group-hover:text-white" />
              </div>
              <span className="font-semibold">Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contato" className="bg-purple-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-4">AÇAÍ DA MARY E CIA</h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <MapPin size={20} className="mt-1 flex-shrink-0" />
                  <p>Rua Resplendor, 85 - Nova Carapina 1, Serra - ES</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={20} />
                  <p>(27) 98864-6488</p>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Clock size={20} className="mr-2" />
                Horário de Atendimento
              </h3>
              <div className="space-y-2">
                <p>
                  <strong>Segunda a Sexta:</strong> 15h às 00h
                </p>
                <p>
                  <strong>Sábado, Domingo e Feriados:</strong> 12h30 às 00h
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
              <div className="space-y-2">
                <button
                  onClick={() => scrollToSection("inicio")}
                  className="block hover:text-purple-200 transition-colors"
                >
                  Início
                </button>
                <button
                  onClick={() => scrollToSection("produtos")}
                  className="block hover:text-purple-200 transition-colors"
                >
                  Produtos
                </button>
                <button
                  onClick={() => scrollToSection("depoimentos")}
                  className="block hover:text-purple-200 transition-colors"
                >
                  Depoimentos
                </button>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="block hover:text-purple-200 transition-colors"
                >
                  Contato
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-purple-700 mt-8 pt-8 text-center">
            <p>&copy; 2025 AÇAÍ DA MARY E CIA. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-all z-30"
        >
          <ChevronLeft size={20} className="transform rotate-90" />
        </button>
      )}
    </div>
  )
}
