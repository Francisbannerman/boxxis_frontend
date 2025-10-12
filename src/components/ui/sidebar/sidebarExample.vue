
<!-- Complete Usage Example -->
<template>
  <div class="min-h-screen">
    <!-- Sidebar Provider wraps everything -->
    <SidebarProvider 
      :default-open="true"
      class="flex"
    >
      <!-- Main Sidebar -->
      <Sidebar variant="sidebar" collapsible="offcanvas">
        <!-- Sidebar Header -->
        <SidebarHeader>
          <div class="flex items-center gap-2 px-2">
            <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold">A</span>
            </div>
            <span class="font-semibold">Acme Inc</span>
          </div>
        </SidebarHeader>

        <!-- Sidebar Content -->
        <SidebarContent>
          <!-- Navigation Group -->
          <SidebarGroup>
            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton :is-active="true">
                    <HomeIcon />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <UsersIcon />
                    <span>Users</span>
                  </SidebarMenuButton>
                  <SidebarMenuAction>
                    <PlusIcon />
                  </SidebarMenuAction>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <SettingsIcon />
                    <span>Settings</span>
                  </SidebarMenuButton>
                  
                  <!-- Submenu -->
                  <SidebarMenuSub>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton :is-active="false">
                        General
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                      <SidebarMenuSubButton :is-active="true">
                        Security
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  </SidebarMenuSub>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Projects Group -->
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderIcon />
                    <span>Project Alpha</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>3</SidebarMenuBadge>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <FolderIcon />
                    <span>Project Beta</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>12</SidebarMenuBadge>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <!-- Loading Skeleton Example -->
          <SidebarGroup>
            <SidebarGroupLabel>Loading...</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton :show-icon="true" />
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuSkeleton />
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <!-- Sidebar Footer -->
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <UserIcon />
                <span>John Doe</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <!-- Sidebar Rail (resize handle) -->
      <SidebarRail />

      <!-- Main Content Area -->
      <SidebarInset>
        <!-- Header with trigger -->
        <header class="flex h-16 items-center gap-2 px-4 border-b">
          <SidebarTrigger />
          <h1 class="text-lg font-semibold">Dashboard</h1>
        </header>

        <!-- Page Content -->
        <main class="flex-1 p-4">
          <div class="max-w-4xl">
            <h2 class="text-2xl font-bold mb-4">Welcome to Dashboard</h2>
            <p class="text-gray-600">
              This is the main content area. The sidebar can be toggled using the button
              in the header or by pressing Cmd/Ctrl + B.
            </p>
            
            <div class="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div class="p-6 bg-white rounded-lg border">
                <h3 class="font-semibold mb-2">Card 1</h3>
                <p class="text-sm text-gray-600">Some content here</p>
              </div>
              <div class="p-6 bg-white rounded-lg border">
                <h3 class="font-semibold mb-2">Card 2</h3>
                <p class="text-sm text-gray-600">Some content here</p>
              </div>
              <div class="p-6 bg-white rounded-lg border">
                <h3 class="font-semibold mb-2">Card 3</h3>
                <p class="text-sm text-gray-600">Some content here</p>
              </div>
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<script setup>
// You would import your icon components here
// import HomeIcon from './icons/HomeIcon.vue'
// import UsersIcon from './icons/UsersIcon.vue'
// etc.
</script>