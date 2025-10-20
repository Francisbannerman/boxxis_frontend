/**
 * Map checkout API response to order format for UI
 */
export const mapCheckoutToOrder = (checkout) => {
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  // Calculate total from cart products
  const calculateTotal = () => {
    if (checkout.cart?.cartProducts) {
      return checkout.cart.cartProducts.reduce((sum, item) => sum + item.amount, 0)
    }
    return checkout.transaction?.amount || 0
  }

  return {
    // Keep original structure for order details page
    ...checkout,
    
    // Add computed/formatted fields for convenience
    id: checkout.checkoutId,
    checkoutId: checkout.checkoutId,
    cartId: checkout.cartId,
    items: checkout.cart?.cartProducts || [],
    total: calculateTotal(),
    status: checkout.status,
    statusText: getStatusText(checkout.status),
    date: formatDate(checkout.dateOfCheckout),
    deliveryDate: formatDate(checkout.deliveryDate),
    deliveryLocation: checkout.deliveryLocation,
    deliveryNote: checkout.deliveryNote,
    rawDateOfCheckout: checkout.dateOfCheckout,
    transactionStatus: checkout.transaction?.transactionStatus,
    orderAmount: checkout.transaction?.amount || 0,
    
    // Preserve nested objects
    cart: checkout.cart,
    transaction: checkout.transaction,
    customer: checkout.customer
  }
}

// Helper function for status text
const getStatusText = (statusCode) => {
  switch (statusCode) {
    case 1: return 'Order Received'
    case 2: return 'Order Processing'
    case 3: return 'Order Dispatched'
    case 4: return 'Order Delivered'
    case 5: return 'Order Cancelled'
    default: return 'Unknown'
  }
}

export const mapCheckouts = (checkouts) => {
  if (!Array.isArray(checkouts)) {
    return []
  }
  return checkouts.map(mapCheckoutToOrder)
}