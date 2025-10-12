<!-- Usage Example -->
<template>
  <div class="p-6 max-w-2xl">
    <Tabs v-model="activeTab" class="w-full">
      <TabsList class="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="account" class="mt-4">
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Account Settings</h3>
          <p class="text-sm text-muted-foreground">
            Manage your account settings and set e-mail preferences.
          </p>
          <div class="space-y-2">
            <label class="text-sm font-medium">Username</label>
            <input 
              type="text" 
              placeholder="Enter username"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">Email</label>
            <input 
              type="email" 
              placeholder="Enter email"
              class="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="password" class="mt-4">
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Password Settings</h3>
          <p class="text-sm text-muted-foreground">
            Change your password here. After saving, you'll be logged out.
          </p>
          <div class="space-y-2">
            <label class="text-sm font-medium">Current Password</label>
            <input 
              type="password" 
              placeholder="Enter current password"
              class="w-full p-2 border rounded-md"
            />
          </div>
          <div class="space-y-2">
            <label class="text-sm font-medium">New Password</label>
            <input 
              type="password" 
              placeholder="Enter new password"
              class="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="notifications" class="mt-4">
        <div class="space-y-4">
          <h3 class="text-lg font-medium">Notification Settings</h3>
          <p class="text-sm text-muted-foreground">
            Configure how you receive notifications.
          </p>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">Email Notifications</div>
                <div class="text-sm text-muted-foreground">
                  Receive notifications via email
                </div>
              </div>
              <input type="checkbox" class="w-4 h-4" />
            </div>
            <div class="flex items-center justify-between">
              <div>
                <div class="font-medium">Push Notifications</div>
                <div class="text-sm text-muted-foreground">
                  Receive push notifications on your device
                </div>
              </div>
              <input type="checkbox" class="w-4 h-4" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const activeTab = ref('account')
</script>