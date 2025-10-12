<template>
  <v-card class="profile-dropdown" elevation="8" rounded="lg">
    <!-- Profile Header -->
    <div class="profile-header d-flex align-center pa-4">
      <v-avatar color="deep-purple" size="40" class="mr-3">
        <span class="text-white font-weight-bold">{{ userStore.userInitials }}</span>
      </v-avatar>
      <div class="flex-grow-1">
        <div class="text-subtitle-2 font-weight-bold text-deep-purple">Profile</div>
      </div>
      <v-btn icon size="small" @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>
    
    <v-divider />

    <!-- Username Section -->
    <div class="pa-4">
      <div class="d-flex align-center justify-space-between mb-4">
        <span class="text-body-2 text-grey-darken-1">Username</span>
        <v-btn icon size="small" @click="editProfile">
          <v-icon size="small">mdi-pencil</v-icon>
        </v-btn>
      </div>
      <div class="text-body-1 font-weight-medium">{{ userStore.profile.username }}</div>
    </div>

    <v-divider />

    <!-- External Wallets Section -->
    <div class="pa-4">
      <div class="d-flex align-center justify-space-between mb-3">
        <div class="d-flex align-center">
          <v-icon icon="mdi-wallet" class="mr-2" size="small" />
          <span class="text-body-2 font-weight-medium">External Wallets</span>
        </div>
        <v-btn
          size="x-small"
          color="lime-accent-3"
          variant="flat"
          @click="addWallet"
        >
          Add
        </v-btn>
      </div>

      <!-- Wallet Items -->
      <div class="wallet-list">
        <div
          v-for="wallet in userStore.wallets"
          :key="wallet.id"
          class="wallet-item d-flex align-center mb-2 pa-2 rounded"
          @click="editWallet(wallet)"
        >
          <v-icon
            :icon="getWalletIcon(wallet.type)"
            size="20"
            class="mr-3"
          />
          <div class="flex-grow-1">
            <div class="text-body-2 font-weight-medium">{{ wallet.type }}</div>
            <div class="text-caption text-grey-darken-1">{{ wallet.accountNumber }}</div>
          </div>
          <v-btn icon size="x-small" variant="text">
            <v-icon size="small">mdi-open-in-new</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <v-divider />

    <!-- Commission Earnings Section -->
    <div class="pa-4">
      <div class="d-flex align-center mb-3">
        <v-icon icon="mdi-account-group" class="mr-2" size="small" />
        <span class="text-body-2 font-weight-medium">Commission Earnings</span>
      </div>

      <!-- Earnings Display -->
      <div class="earnings-grid mb-4">
        <div class="earning-item">
          <div class="text-h6 font-weight-bold text-deep-purple">
            {{ userStore.formattedEarnings.totalEarned }}
          </div>
          <div class="text-caption text-grey-darken-1">Total Earned</div>
        </div>

        <div class="earning-item">
          <div class="text-h6 font-weight-bold text-lime-accent-3">
            {{ userStore.formattedEarnings.thisMonth }}
          </div>
          <div class="text-caption text-grey-darken-1">This Month</div>
        </div>
      </div>

      <!-- Referrals and Pending -->
      <div class="d-flex justify-space-between mb-3">
        <div>
          <span class="text-body-2">Referrals:</span>
          <v-chip
            color="deep-purple"
            size="x-small"
            variant="flat"
            class="ml-2"
          >
            {{ userStore.earnings.referrals }}
          </v-chip>
        </div>
      </div>

      <div class="d-flex justify-space-between mb-3">
        <span class="text-body-2">Pending Payouts:</span>
        <span class="text-body-2 font-weight-bold text-lime-accent-3">
          {{ userStore.formattedEarnings.pendingPayouts }}
        </span>
      </div>

      <!-- Commission Note -->
      <div class="commission-note text-center text-caption text-grey-darken-1 pa-2 bg-grey-lighten-4 rounded">
        Earn {{ userStore.earnings.commissionRate }}% commission on every successful referral
      </div>
    </div>

    <!-- Footer Links -->
    <v-divider />
    <div class="pa-2">
      <v-list density="compact">
        <v-list-item
          prepend-icon="mdi-account-cog"
          title="Account Settings"
          class="text-body-2"
        />
        <v-list-item
          prepend-icon="mdi-help-circle"
          title="Help & Support"
          class="text-body-2"
        />
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sign Out"
          class="text-body-2 text-red"
        />
      </v-list>
    </div>
  </v-card>
</template>

<script setup>
import { useUserStore } from '@/store/user'

defineEmits(['close'])

const userStore = useUserStore()

const getWalletIcon = (type) => {
  const icons = {
    'MTN MoMo': 'mdi-cellphone',
    'GCB Bank': 'mdi-bank',
    'Ecobank': 'mdi-bank',
    'Standard Chartered': 'mdi-bank',
    'AirtelTigo Money': 'mdi-cellphone',
    'Vodafone Cash': 'mdi-cellphone'
  }
  return icons[type] || 'mdi-wallet'
}

const editProfile = () => {
  // Handle edit profile
  console.log('Edit profile')
}

const addWallet = () => {
  // Handle add wallet
  console.log('Add wallet')
}

const editWallet = (wallet) => {
  // Handle edit wallet
  console.log('Edit wallet:', wallet)
}
</script>

<style scoped>
.profile-dropdown {
  min-width: 320px;
  max-width: 360px;
}

.profile-header {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.wallet-list {
  max-height: 120px;
  overflow-y: auto;
}

.wallet-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.wallet-item:hover {
  background-color: #f5f5f5;
}

.earnings-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.earning-item {
  text-align: center;
  padding: 12px;
  background: rgba(103, 58, 183, 0.05);
  border-radius: 8px;
}

.commission-note {
  font-size: 11px;
  line-height: 1.4;
}

.text-red {
  color: #f44336 !important;
}
</style>