import apiClient from '../client'
import { endpoints } from '../config'
import { mapCategories, mapCategory } from '../mappers/categoryMapper'  // ← CHANGED THIS LINE

export const categoryService = {
    async getAll() {
        try{
            const response = await apiClient.get(endpoints.categories.getall)
            console.log('Raw categories from API:', response)
            const mappedCategories = mapCategories(response)
            console.log('Mapped categories:', mappedCategories)
            return mappedCategories
        } catch (error){
            console.error(`Error fetching categories`, error)
            throw error
        }
    },

    async getById(id){
        try{
            const response = await apiClient.get(endpoints.categories.byId(id))
            return mapCategory(response)
        } catch(error) {
            console.error(`Error fetching category ${id}:`, error)
            throw error
        }
    }
}