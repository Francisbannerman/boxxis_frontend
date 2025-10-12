<template>
  <footer class="boxxis-footer bg-white">
    <v-container>
      <v-row>
        <!-- Boxxis Brand Section -->
        <v-col cols="12" md="3">
          <div class="mb-4">
            <h3 class="text-h6 font-weight-bold mb-3">
              <span class="text-deep-purple">Box</span><span class="text-lime-accent-3">xis</span>
            </h3>
            <p class="text-body-2 text-grey-darken-1 mb-3">
              Premium international groceries at competitive prices. Quality imports, better deals than local Ghana markets.
            </p>
            <div class="social-links d-flex gap-2">
              <v-btn icon size="small" variant="text">
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon size="small" variant="text">
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon size="small" variant="text">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" md="3">
          <div class="mb-4">
            <h4 class="text-subtitle-1 font-weight-bold mb-3 text-deep-purple">Quick Links</h4>
            <v-list density="compact" class="footer-list">
              <v-list-item class="footer-link">About Us</v-list-item>
              <v-list-item class="footer-link">Contact</v-list-item>
              <v-list-item class="footer-link">FAQs</v-list-item>
              <v-list-item class="footer-link">Import Guide</v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- Customer Service -->
        <v-col cols="12" md="3">
          <div class="mb-4">
            <h4 class="text-subtitle-1 font-weight-bold mb-3 text-deep-purple">Customer Service</h4>
            <v-list density="compact" class="footer-list">
              <v-list-item class="footer-link">Delivery Info</v-list-item>
              <v-list-item class="footer-link">Quality Guarantee</v-list-item>
              <v-list-item class="footer-link">Privacy Policy</v-list-item>
              <v-list-item class="footer-link">Terms of Service</v-list-item>
            </v-list>
          </div>
        </v-col>

        <!-- Stay Updated -->
        <v-col cols="12" md="3">
          <div class="mb-4">
            <h4 class="text-subtitle-1 font-weight-bold mb-3 text-deep-purple">Stay Updated</h4>
            <p class="text-body-2 text-grey-darken-1 mb-3">
              Subscribe to get special offers and latest updates.
            </p>
            <div class="newsletter-form">
              <v-text-field
                placeholder="Enter your email"
                variant="outlined"
                density="compact"
                hide-details
                class="mb-2"
              >
                <template v-slot:append-inner>
                  <v-btn
                    icon
                    size="small"
                    color="lime-accent-3"
                    variant="flat"
                  >
                    <v-icon color="black">mdi-send</v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>

      <!-- Footer Bottom -->
      <v-divider class="my-4" />
      <div class="footer-bottom d-flex justify-space-between align-center flex-wrap">
        <div class="text-caption text-grey-darken-1">
          © 2024 Boxxis. All rights reserved.
        </div>
        <div class="footer-legal d-flex gap-4">
          <span class="text-caption text-grey-darken-1 footer-link">Privacy</span>
          <span class="text-caption text-grey-darken-1 footer-link">Terms</span>
          <span class="text-caption text-grey-darken-1 footer-link">Support</span>
        </div>
      </div>
    </v-container>
  </footer>
</template>

<style scoped>
.boxxis-footer {
  border-top: 1px solid #e0e0e0;
  margin-top: 64px;
  padding: 48px 0 24px;
}

.footer-list {
  background: transparent !important;
}

.footer-list .v-list-item {
  padding: 0 0 8px 0 !important;
  min-height: auto !important;
}

.footer-link {
  color: #666 !important;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

.footer-link:hover {
  color: rgb(var(--v-theme-deep-purple)) !important;
}

.newsletter-form {
  max-width: 250px;
}

.social-links .v-btn {
  color: #666;
}

.social-links .v-btn:hover {
  color: rgb(var(--v-theme-deep-purple));
}

.footer-bottom {
  padding-top: 16px;
}

@media (max-width: 600px) {
  .footer-bottom {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }
  
  .footer-legal {
    justify-content: center;
  }
}
</style>