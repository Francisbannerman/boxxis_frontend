<template>
  <v-app>
    <!-- Desktop Header -->
    <v-app-bar
      v-if="!$vuetify.display.mobile"
      color="white"
      elevation="1"
      height="80"
      class="desktop-header px-4"
    >
      <v-container fluid class="d-flex align-center">
        <!-- Logo -->
        <div class="d-flex align-center mr-8">
          <v-toolbar-title class="text-h5 font-weight-bold">
            <span class="text-deep-purple">Box</span><span class="text-lime-accent-3">xis</span>
          </v-toolbar-title>
        </div>

        <!-- Navigation -->
        <div class="nav-items d-flex mr-8">
          <v-btn
            variant="text"
            :color="$route.path === '/shop' ? 'deep-purple' : 'grey-darken-1'"
            @click="$router.push('/shop')"
            class="mx-2"
          >
            Home
          </v-btn>
          
          <!-- Orders with badge and dropdown -->
          <v-menu offset-y>
            <template v-slot:activator="{ props }">
              <v-btn
                variant="text"
                :color="$route.path === '/orders' ? 'deep-purple' : 'grey-darken-1'"
                v-bind="props"
                class="mx-2"
              >
                Orders
                <v-badge
                  v-if="ordersStore.orders.length > 0"
                  :content="ordersStore.orders.length"
                  color="lime-accent-3"
                  class="ml-2"
                />
              </v-btn>
            </template>
            
            <v-card class="orders-dropdown" min-width="350" max-height="400">
              <v-card-title class="text-subtitle-1 font-weight-bold pa-4">
                <v-icon icon="mdi-package-variant" class="mr-2" />
                Your Orders
              </v-card-title>
              <v-divider />
              <v-list density="compact">
                <v-list-item
                  v-for="order in ordersStore.orders.slice(0, 3)"
                  :key="order.id"
                  @click="$router.push('/orders')"
                  class="order-item"
                >
                  <template v-slot:prepend>
                    <v-icon 
                      :icon="getOrderStatusIcon(order.status)"
                      :color="getStatusColor(order.status)"
                    />
                  </template>
                  
                  <v-list-item-title class="text-body-2 font-weight-medium">
                    {{ order.orderNumber }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ order.items[0].name }}{{ order.items.length > 1 ? ` +${order.items.length - 1} more` : '' }}
                  </v-list-item-subtitle>
                  
                  <template v-slot:append>
                    <div class="text-right">
                      <v-chip
                        :color="getStatusColor(order.status)"
                        size="x-small"
                        variant="flat"
                        class="mb-1"
                      >
                        {{ order.status }}
                      </v-chip>
                      <div class="text-caption text-grey">
                        ₵{{ order.total.toFixed(2) }}
                      </div>
                    </div>
                  </template>
                </v-list-item>
              </v-list>
              <v-divider />
              <v-card-actions class="pa-4">
                <v-btn
                  variant="text"
                  color="deep-purple"
                  size="small"
                  @click="$router.push('/orders')"
                  block
                >
                  View All Orders
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </div>

        <!-- Search Bar -->
        <v-text-field
          placeholder="Search anything"
          variant="outlined"
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          class="search-field mx-8"
          style="max-width: 400px;"
        />

        <v-spacer />

        <!-- Right Side Icons -->
        <div class="d-flex align-center">
          <!-- Balance -->
          <v-chip
            color="lime-accent-3"
            variant="flat"
            class="mr-4"
            prepend-icon="mdi-cash"
          >
            ₵127.50
          </v-chip>

          <!-- Boxxis Chip -->
          <v-chip
            color="deep-purple"
            variant="flat"
            class="mr-4"
          >
            Boxxis
          </v-chip>

          <!-- Wishlist -->
          <v-btn icon size="small" class="mr-2">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>

          <!-- Account -->
          <v-btn icon size="small" class="mr-4">
            <v-icon>mdi-account-outline</v-icon>
          </v-btn>

          <!-- Cart -->
          <v-btn
            icon
            @click="$router.push('/cart')"
            class="mr-2"
          >
            <v-badge
              :content="cartStore.totalItems"
              :model-value="cartStore.totalItems > 0"
              color="lime-accent-3"
            >
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>

          <!-- Profile -->
          <v-menu offset-y min-width="320">
            <template v-slot:activator="{ props }">
              <v-btn
                icon
                v-bind="props"
                class="profile-btn"
              >
                <v-avatar color="deep-purple" size="32">
                  <span class="text-white text-caption font-weight-bold">JD</span>
                </v-avatar>
              </v-btn>
            </template>

            <ProfileDropdown @close="$event" />
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <!-- Mobile App Bar -->
    <v-app-bar
      v-if="$vuetify.display.mobile"
      color="white"
      elevation="1"
      height="56"
    >
      <div class="d-flex align-center justify-space-between w-100 px-4">
        <v-toolbar-title class="text-h6 font-weight-bold">
          <span class="text-deep-purple">Box</span><span class="text-lime-accent-3">xis</span>
        </v-toolbar-title>
        
        <div class="d-flex align-center">
          <v-btn icon size="small" class="mr-2">
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
          
          <v-btn
            icon
            @click="$router.push('/cart')"
            size="small"
          >
            <v-badge
              :content="cartStore.totalItems"
              :model-value="cartStore.totalItems > 0"
              color="lime-accent-3"
            >
              <v-icon>mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>
        </div>
      </div>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-grey-lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { useOrdersStore } from '@/store/orders'
import ProfileDropdown from '@/components/ProfileDropdown.vue'

const route = useRoute()
const cartStore = useCartStore()
const ordersStore = useOrdersStore()

const getStatusColor = (status) => {
  const colors = {
    processing: 'blue',
    shipped: 'orange', 
    delivered: 'green'
  }
  return colors[status] || 'grey'
}

const getOrderStatusIcon = (status) => {
  const icons = {
    processing: 'mdi-clock-outline',
    shipped: 'mdi-truck',
    delivered: 'mdi-check-circle'
  }
  return icons[status] || 'mdi-package-variant'
}
</script>

<style scoped>
.desktop-header {
  border-bottom: 1px solid #e0e0e0;
}

.search-field :deep(.v-input__control) {
  min-height: 40px !important;
}

.search-field :deep(.v-field) {
  font-size: 14px;
}

.nav-items .v-btn {
  font-weight: 500;
  text-transform: none;
}

.orders-dropdown {
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.order-item:hover {
  background-color: #f5f5f5;
}

.profile-btn {
  border: 2px solid #f0f0f0;
  border-radius: 50%;
}
</style>