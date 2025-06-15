const ORDER_NUMBER_KEY = '@acai-da-mary:last-order-number'
const ORDER_PREFIX = 'AM' // Açaí Mary
const YEAR = new Date().getFullYear().toString().slice(-2) // Últimos 2 dígitos do ano

export function generateOrderNumber(): string {
  let lastNumber = 0

  // Tenta recuperar o último número do localStorage
  try {
    const stored = localStorage.getItem(ORDER_NUMBER_KEY)
    if (stored) {
      const [storedYear, number] = stored.split('-')
      // Se o ano armazenado for diferente do atual, reinicia a contagem
      if (storedYear === YEAR) {
        lastNumber = parseInt(number, 10)
      }
    }
  } catch (error) {
    console.error('Erro ao acessar localStorage:', error)
  }

  // Incrementa o número
  const newNumber = lastNumber + 1

  // Salva o novo número no localStorage
  try {
    localStorage.setItem(ORDER_NUMBER_KEY, `${YEAR}-${newNumber}`)
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error)
  }

  // Formata o número do pedido: AM23001, AM23002, etc.
  const formattedNumber = newNumber.toString().padStart(3, '0')
  return `${ORDER_PREFIX}${YEAR}${formattedNumber}`
} 