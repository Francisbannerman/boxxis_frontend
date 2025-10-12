/**
 * Transform API product response to match frontend component structure
 * @param {Object} apiProduct - Raw product from API
 * @param {Array} categories - Array of category objects to match against
 */
export const mapProduct = (apiProduct, categories = []) => {
  const isOnSale = apiProduct.promoPrice !== null && apiProduct.promoPrice < apiProduct.sellingPrice
  const currentPrice = isOnSale ? apiProduct.promoPrice : apiProduct.sellingPrice

  // Find matching category name by categoryId
  const matchedCategory = categories.find(cat => cat.id === apiProduct.categoryId)
  const categoryName = matchedCategory ? matchedCategory.name : 'Uncategorized'

  return {
    id: apiProduct.productId,
    name: apiProduct.productName,
    description: apiProduct.productDescription,
    price: currentPrice,
    originalPrice: isOnSale ? apiProduct.sellingPrice : null,
    image: apiProduct.defaultImage || 'https://via.placeholder.com/400',
    images: [
      apiProduct.defaultImage,
      apiProduct.image1,
      apiProduct.image2,
      apiProduct.image3
    ].filter(img => img && img !== ''),
    
    category: categoryName, // Use matched category name
    categoryId: apiProduct.categoryId,
    
    isOnSale: isOnSale,
    isAvailable: apiProduct.isAvailable,
    isOnHomePage: apiProduct.isOnHomePage,
    
    weight: apiProduct.weight,
    size: apiProduct.size,
    manufacturer: apiProduct.manufacturer,
    brand: apiProduct.brand,
    
    hasVariants: apiProduct.hasVariants,
    variants: apiProduct.variantsList || [],
    
    rating: 4.5,
    reviewCount: 0
  }
}

/**
 * Transform array of API products
 */
export const mapProducts = (apiProducts, categories = []) => {
  if (!Array.isArray(apiProducts)) {
    console.warn('mapProducts received non-array:', apiProducts)
    return []
  }
  return apiProducts.map(product => mapProduct(product, categories))
}