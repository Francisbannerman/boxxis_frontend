<template>
  <v-container fluid class="pa-0">
    <!-- Feature Highlights - Only show on mobile -->
    <section v-if="$vuetify.display.mobile" class="features-section pa-4">
      <v-row>
        <v-col
          v-for="feature in productsStore.features"
          :key="feature.title"
          cols="6"
        >
          <v-card
            class="feature-card text-center pa-2"
            elevation="1"
            rounded="lg"
            height="100"
          >
            <v-icon
              :icon="feature.icon"
              :color="feature.color"
              size="24"
              class="mb-1"
            />
            <div class="text-caption font-weight-bold text-deep-purple">
              {{ feature.title }}
            </div>
            <div class="text-caption text-grey-darken-1" style="font-size: 10px;">
              {{ feature.subtitle }}
            </div>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Desktop Feature Pills -->
    <section v-if="!$vuetify.display.mobile" class="desktop-features pa-6 pb-4">
      <div class="d-flex justify-center flex-wrap gap-4">
        <v-chip
          v-for="feature in productsStore.features"
          :key="feature.title"
          :color="feature.color"
          size="small"
          variant="flat"
          class="feature-pill"
        >
          <v-icon start :icon="feature.icon" size="small" />
          {{ feature.title }}
        </v-chip>
      </div>
    </section>

    <!-- Search Bar - Mobile Only -->
    <section v-if="$vuetify.display.mobile" class="search-section px-4 pb-4">
      <v-text-field
        v-model="searchQuery"
        prepend-inner-icon="mdi-magnify"
        placeholder="Search anything"
        variant="outlined"
        rounded
        density="comfortable"
        hide-details
        class="search-input"
        @input="handleSearch"
      />
    </section>

    <!-- Categories Section -->
    <section class="category-section px-4 pb-4">
      <h3 v-if="!$vuetify.display.mobile" class="text-h6 font-weight-bold text-deep-purple mb-4">
        Categories
      </h3>
      
      <div class="category-pills d-flex flex-wrap gap-2">
        <v-btn
          v-for="(category, index) in productsStore.categories"
          :key="category"
          :variant="selectedCategoryIndex === index ? 'flat' : 'outlined'"
          :color="selectedCategoryIndex === index ? 'deep-purple' : 'grey'"
          size="small"
          class="category-pill"
          @click="handleCategoryChange(index)"
        >
          {{ category }}
        </v-btn>
      </div>
    </section>

    <!-- Products Grid -->
    <section class="products-section px-4">
      <v-row v-if="displayProducts.length > 0">
        <v-col
          v-for="product in displayProducts"
          :key="product.id"
          cols="6"
          sm="4"
          md="3"
          lg="2"
          xl="2"
        >
          <BoxxisProductCard :product="product" />
        </v-col>
      </v-row>
      
      <!-- Empty State -->
      <v-row v-else>
        <v-col cols="12">
          <v-card class="text-center pa-8" elevation="0">
            <v-icon icon="mdi-package-variant-closed" size="64" color="grey-lighten-1" class="mb-4" />
            <h3 class="text-h6 text-grey-darken-1 mb-2">No products found</h3>
            <p class="text-body-2 text-grey">Try adjusting your search or category filter</p>
            <v-btn
              color="deep-purple"
              variant="text"
              @click="clearFilters"
              class="mt-4"
            >
              Clear Filters
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </section>

    <!-- Footer Section - Desktop Only -->
    <section v-if="!$vuetify.display.mobile" class="footer-section mt-16">
      <BoxxisFooter />
    </section>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductsStore } from '../store/product'
import BoxxisProductCard from '../components/BoxxisProductCard.vue'
import BoxxisFooter from '../components/BoxxisFooter.vue'

const productsStore = useProductsStore()

onMounted(async () => {
  await productsStore.initialize()
})

const searchQuery = ref('')
const selectedCategoryIndex = ref(0)
const searchResults = ref([])

const displayProducts = computed(() => {
  if (searchQuery.value.trim()) {
    return searchResults.value
  }
  return productsStore.filteredProducts
})

const handleCategoryChange = (index) => {
  selectedCategoryIndex.value = index
  const category = productsStore.categories[index]
  productsStore.setSelectedCategory(category)
  searchQuery.value = ''
  searchResults.value = []
}

const handleSearch = (event) => {
  const query = event.target.value
  if (query.trim()) {
    searchResults.value = productsStore.searchProducts(query)
  } else {
    searchResults.value = []
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  searchResults.value = []
  selectedCategoryIndex.value = 0
  productsStore.setSelectedCategory('All')
}
</script>

<style scoped>
.features-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.desktop-features {
  border-bottom: 1px solid #e0e0e0;
}

.feature-pill {
  text-transform: none !important;
  font-weight: 500;
}

.category-pills {
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.category-pills::-webkit-scrollbar {
  display: none;
}

.category-pill {
  text-transform: none !important;
  font-weight: 500;
  white-space: nowrap;
}

.products-section {
  padding-bottom: 100px; /* Space for mobile nav */
}

.search-input :deep(.v-field) {
  background-color: white;
}

@media (min-width: 960px) {
  .products-section {
    padding-bottom: 0;
  }
}
</style>