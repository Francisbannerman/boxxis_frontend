<template>
  <Dialog v-model:open="isOpen">
    <DialogContent class="sm:max-w-md">
      <DialogHeader>
        <DialogTitle class="text-center">
          <span class="bg-gradient-to-r from-[#8E44AD] to-[#A3E635] bg-clip-text text-transparent text-2xl">
            {{ currentStep === 'register' ? 'Create Account' : 'Welcome Back' }}
          </span>
        </DialogTitle>
        <DialogDescription class="text-center">
          {{ getStepDescription }}
        </DialogDescription>
      </DialogHeader>

      <!-- Contact Number Step -->
      <div v-if="currentStep === 'contact'" class="space-y-4 py-4">
        <div class="space-y-2">
          <Label for="contact">Contact Number</Label>
          <Input
            id="contact"
            v-model="contactNumber"
            type="tel"
            placeholder="Enter your contact number (10-12 digits)"
            :disabled="loading"
            @keyup.enter="handleContactSubmit"
            class="border-[#8E44AD]/30 focus:border-[#8E44AD]"
          />
          <p class="text-xs text-muted-foreground">
            {{ contactNumber.trim().length }} / 10-12 characters
          </p>
        </div>

        <Button 
          @click="handleContactSubmit" 
          :disabled="loading || contactNumber.trim().length < 10 || contactNumber.trim().length > 12"
          class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
        >
          {{ loading ? 'Checking...' : 'Continue' }}
        </Button>
      </div>

      <!-- Registration Step -->
      <div v-else-if="currentStep === 'register'" class="space-y-4 py-4">
        <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
          <p class="text-sm text-blue-800">
            🎉 <strong>New number detected!</strong> Complete registration to unlock full benefits.
          </p>
        </div>

        <div class="space-y-2">
          <Label for="username">
            Username <span class="text-red-500">*</span>
          </Label>
          <Input
            id="username"
            v-model="username"
            type="text"
            placeholder="Choose a username"
            :disabled="loading"
            class="border-[#8E44AD]/30 focus:border-[#8E44AD]"
          />
        </div>

        <div class="space-y-2">
          <Label for="referralCode">
            Referral Code <span class="text-red-500">*</span>
          </Label>
          <Input
            id="referralCode"
            v-model="referralCode"
            type="text"
            placeholder="Enter referral code"
            :disabled="loading"
            class="border-[#8E44AD]/30 focus:border-[#8E44AD]"
          />
          <p class="text-xs text-muted-foreground">
            💡 Referral code is required to create an account
          </p>
        </div>

        <div class="space-y-2">
          <Button 
            @click="handleRegistrationContinue" 
            :disabled="loading || username.trim().length === 0 || referralCode.trim().length === 0"
            class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
          >
            {{ loading ? 'Sending OTP...' : 'Continue' }}
          </Button>

          <Button 
            @click="goBackToContact" 
            variant="outline"
            :disabled="loading"
            class="w-full border-[#8E44AD]/30"
          >
            Back
          </Button>
        </div>
      </div>

      <!-- OTP Verification Step -->
      <div v-else-if="currentStep === 'otp'" class="space-y-4 py-4">
        <div class="space-y-2">
          <Label for="otp">One-Time Password</Label>
          <Input
            id="otp"
            v-model="otp"
            type="text"
            inputmode="numeric"
            maxlength="6"
            placeholder="Enter 6-digit OTP"
            :disabled="loading"
            @keyup.enter="handleOtpSubmit"
            class="border-[#8E44AD]/30 focus:border-[#8E44AD] text-center text-2xl tracking-widest"
          />
          <p class="text-xs text-muted-foreground text-center">
            OTP sent to {{ contactNumber }}
          </p>
        </div>

        <div class="space-y-2">
          <Button 
            @click="handleOtpSubmit" 
            :disabled="loading || otp.length !== 6"
            class="w-full bg-[#8E44AD] hover:bg-[#8E44AD]/80"
          >
            {{ loading ? 'Verifying...' : isNewUser ? 'Verify & Create Account' : 'Verify & Login' }}
          </Button>

          <Button 
            @click="handleResendOtp" 
            variant="ghost"
            :disabled="loading || resendCooldown > 0"
            class="w-full text-[#8E44AD]"
          >
            {{ resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP' }}
          </Button>

          <Button 
            @click="goBackToContact" 
            variant="outline"
            :disabled="loading"
            class="w-full border-[#8E44AD]/30"
          >
            Back to Start
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script>
import { ref, computed, watch } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import Button from './ui/button.vue'
import Input from './ui/input.vue'
import Label from './ui/label.vue'
import { authService } from '../api/services/auth'
import { useAuthStore } from '../store/auth'
import { toast } from 'vue-sonner'

export default {
  name: 'LoginModal',
  components: {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    Button,
    Input,
    Label
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:open', 'success'],
  setup(props, { emit }) {
    const authStore = useAuthStore()
    
    const isOpen = ref(props.open)
    const currentStep = ref('contact')  // 'contact' | 'register' | 'otp'
    const contactNumber = ref('')
    const username = ref('')
    const referralCode = ref('')
    const otp = ref('')
    const loading = ref(false)
    const resendCooldown = ref(0)
    const isNewUser = ref(false)  // Track if this is a new user registration
    let resendTimer = null

    const getStepDescription = computed(() => {
      if (currentStep.value === 'contact') {
        return 'Enter your contact number to continue'
      } else if (currentStep.value === 'register') {
        return 'Complete your registration details'
      } else if (currentStep.value === 'otp') {
        return isNewUser.value 
          ? 'Verify your number to complete registration'
          : 'Enter the OTP sent to your phone'
      }
      return ''
    })

    watch(() => props.open, (newVal) => {
      isOpen.value = newVal
      if (newVal) {
        resetForm()
      }
    })

    watch(isOpen, (newVal) => {
      emit('update:open', newVal)
    })

    const resetForm = () => {
      currentStep.value = 'contact'
      contactNumber.value = ''
      username.value = ''
      referralCode.value = ''
      otp.value = ''
      loading.value = false
      isNewUser.value = false
      clearResendTimer()
    }

    const clearResendTimer = () => {
      if (resendTimer) {
        clearInterval(resendTimer)
        resendTimer = null
      }
      resendCooldown.value = 0
    }

    const startResendTimer = () => {
      clearResendTimer()
      resendCooldown.value = 60
      resendTimer = setInterval(() => {
        resendCooldown.value--
        if (resendCooldown.value <= 0) {
          clearResendTimer()
        }
      }, 1000)
    }

    const handleContactSubmit = async () => {
      console.log('🔵 handleContactSubmit called!')
      
      if (loading.value) {
        console.log('⚠️ Already loading, skipping...')
        return
      }
      
      const trimmedContact = contactNumber.value.trim()
      
      if (!trimmedContact) {
        toast.error('Please enter your contact number')
        return
      }

      if (trimmedContact.length < 10 || trimmedContact.length > 12) {
        toast.error('Contact number must be between 10 and 12 digits')
        return
      }

      loading.value = true
      try {
        console.log('🌐 Checking if user exists...')
        const userResponse = await authService.getUserByContact(trimmedContact)
        console.log('📥 User response:', userResponse)
        
        // Check if user exists
        if (!userResponse || !userResponse.userId) {
          console.log('👤 New user - showing registration form')
          isNewUser.value = true
          toast.info('New number! Please complete registration.')
          currentStep.value = 'register'
          return
        }

        // Existing user - send OTP directly
        console.log('✅ Existing user found! Sending OTP...')
        isNewUser.value = false
        await authService.sendOtp(trimmedContact)
        console.log('✅ OTP sent!')
        
        toast.success('OTP sent to your phone!')
        currentStep.value = 'otp'
        startResendTimer()
        
      } catch (error) {
        console.error('❌ Error:', error)
        const errorMessage = error.response?.data?.message || 'Something went wrong. Please try again.'
        toast.error(errorMessage)
      } finally {
        loading.value = false
      }
    }

    const handleRegistrationContinue = async () => {
      console.log('🟡 handleRegistrationContinue called!')
      
      if (loading.value) return
      
      const trimmedUsername = username.value.trim()
      const trimmedReferral = referralCode.value.trim()
      
      if (!trimmedUsername) {
        toast.error('Username is required')
        return
      }

      if (!trimmedReferral) {
        toast.error('Referral code is required')
        return
      }

      loading.value = true
      try {
        console.log('🌐 Sending OTP for verification...')
        await authService.sendOtp(contactNumber.value.trim())
        console.log('✅ OTP sent!')
        
        toast.success('OTP sent! Verify your number to complete registration.')
        currentStep.value = 'otp'
        startResendTimer()
        
      } catch (error) {
        console.error('❌ Error sending OTP:', error)
        const errorMessage = error.response?.data?.message || 'Failed to send OTP. Please try again.'
        toast.error(errorMessage)
      } finally {
        loading.value = false
      }
    }

    const handleOtpSubmit = async () => {
      if (otp.value.length !== 6) {
        toast.error('Please enter a valid 6-digit OTP')
        return
      }

      loading.value = true
      try {
        if (isNewUser.value) {
          // NEW USER: Create account (backend verifies OTP + creates user + returns tokens)
          console.log('👤 Creating new user account with OTP verification...')
          
          const createResponse = await authService.createUser(
            username.value.trim(),
            contactNumber.value.trim(),
            referralCode.value.trim(),
            otp.value  // ← Pass OTP to backend for verification
          )
          console.log('📥 Create user response:', createResponse)
          
          // createResponse should contain tokens + user data
          if (createResponse && createResponse.accessToken) {
            await authStore.login(createResponse)
            toast.success('Registration complete! Welcome!')
            isOpen.value = false
            emit('success')
          } else {
            toast.error('Registration successful but login failed. Please try logging in.')
          }
          
        } else {
          // EXISTING USER: Just verify OTP and login
          console.log('🔐 Verifying OTP for existing user...')
          
          const verifyResponse = await authService.verifyAndLogin(
            contactNumber.value.trim(), 
            otp.value
          )
          console.log('📥 Verify response:', verifyResponse)

          if (verifyResponse.isSuccess && verifyResponse.data) {
            await authStore.login(verifyResponse.data)
            toast.success('Login successful!')
            isOpen.value = false
            emit('success')
          } else {
            toast.error(verifyResponse.message || 'Invalid OTP. Please try again.')
          }
        }
        
      } catch (error) {
        console.error('❌ Error:', error)
        console.error('❌ Error response:', error.response?.data)
        
        const errorMessage = error.response?.data?.message || 
                            error.response?.data?.errors || 
                            (isNewUser.value ? 'Failed to create account. Please check your details.' : 'Invalid OTP. Please try again.')
        toast.error(errorMessage)
      } finally {
        loading.value = false
      }
    }

    const handleResendOtp = async () => {
      loading.value = true
      try {
        await authService.sendOtp(contactNumber.value.trim())
        toast.success('OTP resent successfully!')
        otp.value = ''
        startResendTimer()
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to resend OTP. Please try again.'
        toast.error(errorMessage)
      } finally {
        loading.value = false
      }
    }

    const goBackToContact = () => {
      currentStep.value = 'contact'
      username.value = ''
      referralCode.value = ''
      otp.value = ''
      isNewUser.value = false
      clearResendTimer()
    }

    return {
      isOpen,
      currentStep,
      contactNumber,
      username,
      referralCode,
      otp,
      loading,
      resendCooldown,
      isNewUser,
      getStepDescription,
      handleContactSubmit,
      handleRegistrationContinue,
      handleOtpSubmit,
      handleResendOtp,
      goBackToContact
    }
  }
}
</script>