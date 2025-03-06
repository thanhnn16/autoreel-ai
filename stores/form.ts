import { defineStore } from 'pinia'

interface FormState {
  title: string;
  storyDescription: string;
  duration: string;
  selectedGenres: string[];
  imageStyles: string[];
  selectedVoice: string;
  previewReady: boolean;
  currentStep: number;
  isSubmitting: boolean;
  errors: {
    [key: string]: string;
    title: string;
    storyDescription: string;
    duration: string;
    genres: string;
    imageStyles: string;
    voice: string;
  };
}

export const useFormStore = defineStore('form', {
  state: (): FormState => ({
    title: '',
    storyDescription: '',
    duration: '',
    selectedGenres: [] as string[],
    imageStyles: [] as string[],
    selectedVoice: '',
    previewReady: false,
    currentStep: 1,
    isSubmitting: false,
    errors: {
      title: '',
      storyDescription: '',
      duration: '',
      genres: '',
      imageStyles: '',
      voice: ''
    }
  }),

  getters: {
    canProceed: (state) => {
      switch (state.currentStep) {
        case 1:
          return (
            state.title.trim().length >= 4 &&
            state.storyDescription.trim().length >= 20 &&
            state.duration &&
            state.selectedGenres.length >= 1 &&
            state.selectedGenres.length <= 3
          )
        case 2:
          return state.imageStyles.length >= 1
        case 3:
          return !!state.selectedVoice
        case 4:
          return state.previewReady
        default:
          return false
      }
    },

    currentStepErrors: (state) => {
      switch (state.currentStep) {
        case 1:
          return {
            title: state.title.trim().length < 4 ? 'Title must be at least 4 characters' : '',
            storyDescription: state.storyDescription.trim().length < 20 ? 'Minimum 20 characters required' : '',
            duration: !state.duration ? 'Please select duration' : '',
            genres: !state.selectedGenres.length ? 'Select 1-3 genres' : 
                   state.selectedGenres.length > 3 ? 'Maximum 3 genres allowed' : ''
          }
        case 2:
          return {
            imageStyles: state.imageStyles.length === 0 ? 'Please select at least one style' : ''
          }
        case 3:
          return {
            voice: !state.selectedVoice ? 'Please select a voice' : ''
          }
        default:
          return {}
      }
    }
  },

  actions: {
    validateCurrentStep() {
      console.log(`[Form Debug] Validating step ${this.currentStep}`)
      this.resetErrors()
      const currentErrors = this.currentStepErrors
      console.log('[Form Debug] Validation errors:', currentErrors)
      Object.assign(this.errors, currentErrors)
      const isValid = Object.values(currentErrors).every(error => !error)
      console.log(`[Form Debug] Step ${this.currentStep} validation result:`, isValid)
      return isValid
    },

    setField<K extends keyof FormState>(field: K, value: FormState[K]) {
      console.log(`[Form Debug] Setting field '${field}' to:`, value)
      if (field in this.$state) {
        this.$state[field] = value
        // Validate the field immediately after setting
        const errors = this.currentStepErrors
        this.errors[field] = errors[field] || ''
        console.log(`[Form Debug] Field '${field}' validation:`, { value, error: this.errors[field] })
      }
    },

    nextStep() {
      console.log(`[Form Debug] Attempting to move to next step from step ${this.currentStep}`)
      if (this.canProceed && this.currentStep < 5) {
        this.currentStep++
        console.log(`[Form Debug] Successfully moved to step ${this.currentStep}`)
      } else {
        console.log('[Form Debug] Cannot proceed to next step:', {
          canProceed: this.canProceed,
          currentStep: this.currentStep
        })
      }
    },

    previousStep() {
      console.log(`[Form Debug] Moving back from step ${this.currentStep}`)
      if (this.currentStep > 1) {
        this.currentStep--
        console.log(`[Form Debug] Moved back to step ${this.currentStep}`)
      }
    },

    resetErrors() {
      console.log('[Form Debug] Resetting all form errors')
      Object.keys(this.errors).forEach(key => {
        this.errors[key] = ''
      })
    }
  }
})