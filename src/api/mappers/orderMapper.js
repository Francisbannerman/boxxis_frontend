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

  return {
    id: checkout.checkoutId,
    cartId: checkout.cartId,
    items: [], // You'll need to fetch cart items separately or from cart object
    total: 0, // Calculate from cart items
    status: checkout.status, // Keep as number! Don't convert
    statusText: getStatusText(checkout.status), // Add this for display
    date: formatDate(checkout.dateOfCheckout),
    deliveryDate: formatDate(checkout.deliveryDate),
    deliveryLocation: checkout.deliveryLocation,
    deliveryNote: checkout.deliveryNote,
    orderType: checkout.orderType,
    rawDateOfCheckout: checkout.dateOfCheckout // Keep raw date for sorting
  }
}

// Helper function for status text
const getStatusText = (statusCode) => {
  switch (statusCode) {
    case 1: return 'Pending'
    case 2: return 'Processing'
    case 3: return 'Shipped'
    case 4: return 'Delivered'
    case 5: return 'Completed'
    default: return 'Unknown'
  }
}

export const mapCheckouts = (checkouts) => {
  if (!Array.isArray(checkouts)) {
    return []
  }
  return checkouts.map(mapCheckoutToOrder)
}