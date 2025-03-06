<template>
  <div class="container mx-auto py-8 px-4 lg:px-8 max-w-5xl">
    <!-- Enhanced header with gradient accent -->
    <div class="text-center mb-16 space-y-4 relative">
      <div class="absolute inset-x-0 -top-4 h-40 bg-gradient-to-b from-slate-50 to-transparent dark:from-slate-900/10 -z-10 opacity-60"></div>
      <h1 class="text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
        AutoReel AI
      </h1>
      <p class="text-lg text-slate-600 dark:text-slate-400">
        Your Story, Your Style, Your Reel
      </p>
    </div>

    <!-- Modernized progress bar -->
    <div class="mb-12">
      <div class="relative">
        <div class="flex justify-between text-sm mb-4 text-slate-600 dark:text-slate-300">
          <span class="font-medium">Step {{ currentStep }} of 5</span>
          <span class="font-medium">{{ steps[currentStep - 1].title }}</span>
        </div>
        <div class="h-1.5 bg-slate-100 rounded-full overflow-hidden dark:bg-slate-800/50 shadow-inner">
          <div 
            class="h-full bg-gradient-to-r from-slate-600 to-slate-500 transition-all duration-700 ease-out"
            :style="{ width: `${(currentStep - 1) * 25}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Nội dung form với animation -->
    <div class="relative">
      <ClientOnly>
        <TransitionGroup
          name="fade-slide"
          tag="div"
        >
          <!-- Step 1: Form layout tối ưu -->
          <div v-if="currentStep === 1" key="step1" class="space-y-8">
            <UFormGroup 
              label="Story Title" 
              class="space-y-1"
              name="title"
              :error="store.errors.title"
              :rules="[{ 
                required: true, 
                message: 'Title must be at least 4 characters',
                validator: (_: unknown, value: string) => value?.trim().length >= 4 
              }]"
              >
              <UInput 
                v-model="title"
                placeholder="My Awesome Story"
                :icon="'i-heroicons-book-open'"
                size="lg"
                autofocus
                :color="store.errors.title ? 'red' : 'primary'"
                class="transition-all duration-300 hover:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-800/30 dark:bg-slate-800 dark:border-slate-700"
                :trailing="!!store.errors.title"
              >
                <template #trailing>
                  <UTooltip v-if="store.errors.title" text="Minimum 4 non-whitespace characters">
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                  </UTooltip>
                </template>
              </UInput>
            </UFormGroup>

            <div class="grid gap-4 md:grid-cols-2">
              <UFormGroup 
                label="Video Duration"
                name="duration"
                :error="store.errors.duration"
                :rules="[{ 
                  required: true, 
                  message: 'Please select duration',
                  validator: (_: unknown, value: string) => !!value
                }]"
              >
                <USelect
                  v-model="duration"
                  :options="durationOptions"
                  placeholder="Select duration"
                  icon="i-heroicons-clock"
                  :color="store.errors.duration ? 'red' : 'primary'"
                  class="transition-all duration-300 hover:border-primary-400 dark:bg-slate-800 dark:border-slate-700"
                />
              </UFormGroup>

              <UFormGroup 
                label="Genres (max 3)"
                name="genres"
                :error="store.errors.genres"
                :rules="[{ 
                  required: true,
                  message: 'Select 1-3 genres',
                  validator: (_: unknown, value: string[]) => value?.length >= 1 && value?.length <= 3
                }]"
              >
                <USelectMenu
                  v-model="selectedGenres"
                  :options="storyGenres"
                  multiple
                  :color="store.errors.genres ? 'red' : 'primary'"
                  class="transition-all duration-300 hover:border-primary-400 dark:bg-slate-800 dark:border-slate-700"
                  :popper="{ placement: 'bottom-end' }"
                >
                  <template #label>
                    <span v-if="selectedGenres.length" class="flex gap-1 flex-wrap">
                      <UBadge 
                        v-for="genre in selectedGenres"
                        :key="genre"
                        color="primary"
                        variant="subtle"
                        class="capitalize transition-all duration-300"
                      >
                        {{ genre }}
                      </UBadge>
                    </span>
                    <span v-else class="text-gray-400">Select genres</span>
                  </template>
                </USelectMenu>
              </UFormGroup>
            </div>

            <UFormGroup 
              label="Story Content"
              name="description"
              :error="store.errors.storyDescription"
              :rules="[{ 
                required: true, 
                message: 'Minimum 20 characters required',
                validator: (_: unknown, value: string) => value?.trim().length >= 20
              }]"
            >
              <UTextarea
                v-model="storyDescription"
                placeholder="Once upon a time..."
                :rows="5"
                resize
                class="font-mono text-sm transition-all duration-300 hover:border-primary-400 focus:ring-primary-100 dark:focus:ring-primary-800/30 dark:bg-slate-800 dark:border-slate-700"
                :color="store.errors.storyDescription ? 'red' : 'primary'"
                :trailing="storyDescription.length > 0 && storyDescription.trim().length < 20"
              >
                <template #trailing>
                  <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                </template>
              </UTextarea>
            </UFormGroup>
          </div>

          <!-- Step 2: Visual style selection -->
          <div v-else-if="currentStep === 2" key="step2" class="space-y-6">
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Select up to 2 visual styles for your video</p>
            <div class="grid gap-6 sm:grid-cols-2">
              <div 
                v-for="style in imageStyleOptions"
                :key="style.id"
                class="group relative cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
                @click="toggleImageStyle(style.id)"
              >
                <div class="relative aspect-video overflow-hidden rounded-xl border-2 transition-all"
                  :class="imageStyles.includes(style.id) 
                    ? 'border-primary-500 ring-4 ring-primary-100 dark:ring-primary-900/30 shadow-lg'
                    : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'">
                  <img
                    :src="style.preview"
                    class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Style preview"
                  />
                  <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent p-4">
                    <div class="flex h-full items-end justify-between">
                      <span class="font-medium text-white text-lg">{{ style.name }}</span>
                      <UIcon 
                        name="i-heroicons-check-circle" 
                        class="h-6 w-6 text-primary-500 transition-all duration-300"
                        :class="imageStyles.includes(style.id) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- Step 3: Voice Selection -->
          <div v-else-if="currentStep === 3" key="step3" class="space-y-4">
            <p class="text-sm text-gray-500 dark:text-gray-400">Choose a voice for your video narration</p>
            <div class="grid gap-4 sm:grid-cols-2">
              <div 
                v-for="voice in voiceOptions"
                :key="voice.id"
                class="relative"
              >
                <button
                  @click="selectVoice(voice.id)"
                  :disabled="voice.inDevelopment"
                  class="w-full text-left p-4 rounded-lg border-2 transition-all relative"
                  :class="{
                    'border-primary-500 bg-primary-50/50 dark:bg-primary-900/10': selectedVoice === voice.id,
                    'border-gray-200 hover:border-gray-300 dark:border-slate-700 dark:hover:border-slate-600': selectedVoice !== voice.id && !voice.inDevelopment,
                    'border-gray-100 bg-gray-50 dark:border-slate-800 dark:bg-slate-900/50 cursor-not-allowed': voice.inDevelopment
                  }"
                >
                  <div class="flex items-start justify-between gap-4">
                    <div class="space-y-1">
                      <h3 class="font-medium" :class="{ 'text-gray-400': voice.inDevelopment }">{{ voice.name }}</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400">{{ voice.description }}</p>
                    </div>
                    <div class="flex items-center gap-2">
                      <UBadge v-if="voice.inDevelopment" color="gray" variant="subtle" class="whitespace-nowrap">
                        In Development
                      </UBadge>
                      <UIcon 
                        v-if="selectedVoice === voice.id" 
                        name="i-heroicons-check-circle" 
                        class="h-5 w-5 text-primary-500 flex-shrink-0"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <!-- Step 4: Preview and Confirmation -->
          <div v-else-if="currentStep === 4" key="step4" class="space-y-6">
            <div class="bg-gray-50/50 dark:bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 space-y-6 border border-gray-100 dark:border-slate-700 shadow-sm">
              <div class="space-y-4">
                <h3 class="font-medium text-gray-900 dark:text-gray-100">Story Details</h3>
                <div class="grid gap-6 sm:grid-cols-2">
                  <div class="space-y-2">
                    <span class="text-sm text-gray-500 dark:text-gray-400">Title</span>
                    <p class="font-medium text-lg">{{ title }}</p>
                  </div>
                  <div class="space-y-2">
                    <span class="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                    <p class="font-medium text-lg">{{ duration }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="bg-primary-50 dark:bg-primary-900/10 border border-primary-100 dark:border-primary-800/20 rounded-lg p-4">
              <div class="flex items-center gap-3 text-primary-600 dark:text-primary-400">
                <UIcon name="i-heroicons-information-circle" class="flex-shrink-0 w-5 h-5" />
                <p class="text-sm">Please review your selections carefully. Once you proceed, the video generation process will begin.</p>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </ClientOnly>
    </div>

    <!-- Navigation tối giản -->
    <div class="sticky bottom-0 mt-10 bg-white/95 backdrop-blur-xl dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 shadow-lg">
      <div class="flex items-center justify-between gap-4 py-4">
        <UButton
          v-if="currentStep > 1"
          @click="handlePrevious"
          icon="i-heroicons-arrow-small-left"
          color="slate"
          variant="ghost"
          :disabled="isSubmitting"
          class="transition-all duration-300 hover:-translate-x-1"
        >
          Back
        </UButton>

        <UButton
          v-if="currentStep < 5"
          @click="handleNext"
          :loading="isSubmitting"
          :disabled="!canProceed"
          color="slate"
          variant="solid"
          class="ml-auto transition-all duration-300 hover:translate-x-1 hover:shadow-lg"
          :trailing-icon="currentStep === 4 ? undefined : 'i-heroicons-arrow-small-right'"
        >
          {{ currentStep === 4 ? 'Generate Now' : 'Continue' }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore } from '~/stores/form'

const store = useFormStore()

// Bind form state to store
const title = computed({
  get: () => store.$state.title,
  set: (value) => store.setField('title', value)
})

const storyDescription = computed({
  get: () => store.$state.storyDescription,
  set: (value) => store.setField('storyDescription', value)
})

const duration = computed({
  get: () => store.$state.duration,
  set: (value) => store.setField('duration', value)
})

const selectedGenres = computed({
  get: () => store.$state.selectedGenres,
  set: (value) => store.setField('selectedGenres', value)
})

const imageStyles = computed({
  get: () => store.$state.imageStyles,
  set: (value) => store.setField('imageStyles', value)
})

const selectedVoice = computed({
  get: () => store.$state.selectedVoice,
  set: (value) => store.setField('selectedVoice', value)
})

const previewReady = computed({
  get: () => store.$state.previewReady,
  set: (value) => store.setField('previewReady', value)
})

const currentStep = computed({
  get: () => store.$state.currentStep,
  set: (value) => store.setField('currentStep', value)
})

const isSubmitting = computed({
  get: () => store.$state.isSubmitting,
  set: (value) => store.setField('isSubmitting', value)
})

const canProceed = computed(() => store.canProceed)

interface Step {
  id: number
  title: string
}

const steps: Step[] = [
  { id: 1, title: 'Story Details' },
  { id: 2, title: 'Visual Style' },
  { id: 3, title: 'Voice' },
  { id: 4, title: 'Preview' },
  { id: 5, title: 'Generate Video' }
]

// Thêm dữ liệu thể loại
const storyGenres = [
  'Horror', 'Sci-Fi', 'Mystery',
  'Romance', 'Action', 'Fantasy',
  'Detective', 'Historical', 'Comedy'
]

// Thêm mảng imageStyleOptions
interface ImageStyle {
  id: string
  name: string
  preview: string
}

const imageStyleOptions = ref<ImageStyle[]>([
  { 
    id: 'cinematic', 
    name: 'Cinematic', 
    preview: 'https://placehold.co/600x400?text=Cinematic+Style' 
  },
  { 
    id: 'minimal', 
    name: 'Minimal', 
    preview: 'https://placehold.co/600x400?text=Minimal+Style' 
  },
  { 
    id: 'animated', 
    name: 'Animated', 
    preview: 'https://placehold.co/600x400?text=Animated+Style' 
  },
  { 
    id: 'documentary', 
    name: 'Documentary', 
    preview: 'https://placehold.co/600x400?text=Doc+Style' 
  },
])

// Sửa options duration
const durationOptions = ['30 seconds', '60 seconds', '90 seconds']

// Thêm hàm toggle image style
const toggleImageStyle = (styleId: string) => {
  const currentStyles = [...imageStyles.value]
  if (currentStyles.includes(styleId)) {
    imageStyles.value = currentStyles.filter(id => id !== styleId)
  } else if (currentStyles.length < 2) {
    imageStyles.value = [...currentStyles, styleId]
  }
}

// Enhanced navigation functions
const handleNext = () => {
  if (store.validateCurrentStep()) {
    store.nextStep()
  }
}

const handlePrevious = () => {
  store.previousStep()
}

const handleStepClick = (stepId: number) => {
  // Only allow going to completed steps or next step
  if (stepId <= Math.min(currentStep.value + 1, 5)) {
    store.setField('currentStep', stepId)
  }
}
// Add after const imageStyleOptions = ref<ImageStyle[]>([...])
interface Voice {
  id: string
  name: string
  description: string
  inDevelopment?: boolean
}

const voiceOptions = ref<Voice[]>([
  {
    id: 'natural_male',
    name: 'Natural Male',
    description: 'Clear and professional male voice'
  },
  {
    id: 'natural_female',
    name: 'Natural Female',
    description: 'Warm and engaging female voice'
  },
  {
    id: 'dramatic',
    name: 'Dramatic Voice',
    description: 'Perfect for intense and emotional stories',
    inDevelopment: true
  },
  {
    id: 'storyteller',
    name: 'Storyteller',
    description: 'Engaging narrative style voice',
    inDevelopment: true
  }
])

// Add after toggleImageStyle function
const selectVoice = (voiceId: string) => {
  const voice = voiceOptions.value.find(v => v.id === voiceId)
  if (voice && !voice.inDevelopment) {
    selectedVoice.value = voiceId
  }
}

// Add in script setup, after store initialization
watchEffect(() => {
  if (currentStep.value === 3 && !selectedVoice.value) {
    const availableVoice = voiceOptions.value.find(v => !v.inDevelopment)
    if (availableVoice) {
      selectedVoice.value = availableVoice.id
    }
  }
})
</script>

<style>
/* Tối ưu animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

@media (max-width: 640px) {
  .container {
    padding-bottom: 120px;
  }
}
</style>