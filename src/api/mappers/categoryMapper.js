/**
 * Transform API category response to match frontend structure
 */
export const mapCategory = (apiCategory) => {
  return {
    id: apiCategory.categoryId,
    name: apiCategory.categoryName,
    image: apiCategory.categoryImage,
    displayOrder: apiCategory.displayOrder,
    isActive: apiCategory.isActive
  }
}

/**
 * Transform and filter categories
 * Only returns active categories, sorted by display order
 */
export const mapCategories = (apiCategories) => {
  if (!Array.isArray(apiCategories)) {
    console.warn('mapCategories received non-array:', apiCategories)
    return []
  }
  
  return apiCategories
    .filter(category => category.isActive === true) // Only active categories
    .map(mapCategory)
    .sort((a, b) => a.displayOrder - b.displayOrder) // Sort by display order
}