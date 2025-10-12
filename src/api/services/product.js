import apiClient from '../client'
import { endpoints } from '../config'
import { mapProducts, mapProduct } from '../mappers/productMapper'

export const productService = {

  async getRaw() {
    try {
      const response = await apiClient.get(endpoints.products.getAll)
      return response
    } catch (error) {
      throw error
    }
  },

  async getAll(categories = []) {
    try {
      const response = await apiClient.get(endpoints.products.getAll)
      console.log('Raw API response:', response)
      
      // Pass categories to mapper
      const mappedProducts = mapProducts(response, categories)
      console.log('Mapped products:', mappedProducts)
      
      return mappedProducts
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    }
  },

  async getById(id, categories = []) {
    try {
      const response = await apiClient.get(endpoints.products.byId(id))
      return mapProduct(response, categories)
    } catch (error) {
      console.error(`Error fetching product ${id}:`, error)
      throw error
    }
  }
}