<template>
  <div class="container mx-auto py-6 px-4 lg:px-6 max-w-4xl">
    <!-- Header tối giản -->
    <div class="text-center mb-8 space-y-2">
      <h1 class="text-3xl font-semibold text-gray-900 dark:text-gray-100">
        AutoReel AI
      </h1>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Your Story, Your Style, Your Reel
      </p>
    </div>

    <!-- Stepper dạng progress bar -->
    <div class="mb-8">
      <div class="relative pt-4">
        <div class="flex justify-between text-sm mb-2 text-gray-500 dark:text-gray-400">
          <span>Step {{ currentStep }} of 5</span>
          <span>{{ steps[currentStep - 1].title }}</span>
        </div>
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-800">
          <div 
            class="h-full bg-primary-500 transition-all duration-300"
            :style="{ width: `${(currentStep - 1) * 25}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Nội dung form -->
    <div class="relative">
      <ClientOnly>
        <!-- Step 1: Tối ưu form layout -->
        <div v-if="currentStep === 1" class="space-y-6">
          <UFormGroup 
            label="Story Title" 
            class="space-y-1"
            name="title"
            :rules="[{ 
              required: true, 
              min: 4, 
              message: 'Title must be at least 4 characters',
              validator: (_, value) => value.trim().length >= 4 
            }]"
          >
            <UInput 
              v-model="title"
              placeholder="My Awesome Story"
              icon="i-heroicons-book-open"
              size="lg"
              autofocus
              :trailing="title.length > 0 && title.trim().length < 4"
            >
              <template #trailing>
                <UTooltip text="Minimum 4 non-whitespace characters">
                  <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                </UTooltip>
              </template>
            </UInput>
            <div class="text-xs text-gray-500 mt-1">Min. 4 characters</div>
          </UFormGroup>

          <div class="grid gap-4 md:grid-cols-2">
            <UFormGroup 
              label="Video Duration"
              name="duration"
              :rules="[{ required: true, message: 'Please select duration' }]"
            >
              <USelect
                v-model="duration"
                :options="durationOptions"
                placeholder="Select duration"
                icon="i-heroicons-clock"
              />
            </UFormGroup>

            <UFormGroup 
              label="Genres (max 3)"
              name="genres"
              :rules="[{ 
                validator: (_unused: any, value: string[]) => value.length >= 1 && value.length <= 3,
                message: 'Select 1-3 genres' 
              }]"
            >
              <USelectMenu
                v-model="selectedGenres"
                :options="storyGenres"
                multiple
                :popper="{ placement: 'bottom-end' }"
              >
                <template #label>
                  <span v-if="selectedGenres.length" class="flex gap-1 flex-wrap">
                    <UBadge 
                      v-for="genre in selectedGenres"
                      :key="genre"
                      color="gray"
                      variant="subtle"
                      class="capitalize"
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
            :rules="[{ required: true, min: 20, message: 'Minimum 20 characters required' }]"
          >
            <UTextarea
              v-model="storyDescription"
              placeholder="Once upon a time..."
              :rows="5"
              resize
              class="font-mono text-sm"
              :trailing="storyDescription.length > 0 && storyDescription.length < 20"
            >
              <template #trailing>
                <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
              </template>
            </UTextarea>
          </UFormGroup>
        </div>

        <!-- Step 2: Tối ưu visual style selection -->
        <div v-else-if="currentStep === 2" class="grid gap-4 sm:grid-cols-2">
          <div 
            v-for="style in imageStyleOptions"
            :key="style.id"
            class="group relative cursor-pointer"
            @click="toggleImageStyle(style.id)"
          >
            <div class="relative aspect-video overflow-hidden rounded-xl border-2 transition-all"
              :class="imageStyles.includes(style.id) 
                ? 'border-primary-500 ring-4 ring-primary-100 dark:ring-primary-900/30'
                : 'border-gray-200 hover:border-gray-300 dark:border-gray-700'">
              <img
                :src="style.preview"
                class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt="Style preview"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-4">
                <div class="flex h-full items-end justify-between">
                  <span class="font-medium text-white">{{ style.name }}</span>
                  <UIcon 
                    name="i-heroicons-check-circle" 
                    class="h-6 w-6 text-primary-500 transition-transform"
                    :class="imageStyles.includes(style.id) ? 'scale-100' : 'scale-0'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClientOnly>
    </div>

    <!-- Navigation tối giản -->
    <div class="sticky bottom-0 mt-8 bg-white/90 backdrop-blur-lg dark:bg-gray-900/90">
      <div class="flex items-center justify-between gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <UButton
          v-if="currentStep > 1"
          @click="handlePrevious"
          icon="i-heroicons-arrow-small-left"
          color="gray"
          variant="ghost"
          :disabled="isSubmitting"
        >
          Back
        </UButton>

        <UButton
          v-if="currentStep < 5"
          @click="handleNext"
          :loading="isSubmitting"
          :disabled="!canProceed"
          color="primary"
          variant="solid"
          class="ml-auto"
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

// Thêm biến isSubmitting
const isSubmitting = ref(false)

const currentStep = ref<number>(1)

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

// Step 1 data
const title = ref('')
const storyDescription = ref('')
const duration = ref('')

// Step 2 data
const imageStyles = ref<string[]>([])

// Thêm dữ liệu thể loại
const storyGenres = [
  'Kinh dị', 'Viễn tưởng', 'Huyền bí',
  'Lãng mạn', 'Hành động', 'Giả tưởng',
  'Trinh thám', 'Lịch sử', 'Hài hước'
]

// Sửa các biến dữ liệu
const selectedGenres = ref<string[]>([])

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
const durationOptions = ['30 giây', '60 giây', '90 giây']

// Cập nhật validation
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return (
        title.value.trim().length >= 4 &&
        storyDescription.value.trim().length >= 20 &&
        duration.value !== '' &&
        selectedGenres.value.length >= 1 &&
        selectedGenres.value.length <= 3
      )
    case 2:
      return imageStyles.value.length >= 1
    case 3:
      // Thêm validation cho step 3 nếu cần
      return true
    case 4:
      // Thêm validation cho step 4 nếu cần
      return true
    default:
      return false
  }
})

// Thêm hàm toggle image style
const toggleImageStyle = (styleId: string) => {
  if (imageStyles.value.includes(styleId)) {
    imageStyles.value = imageStyles.value.filter(id => id !== styleId)
  } else if (imageStyles.value.length < 2) {
    imageStyles.value = [...imageStyles.value, styleId]
  }
}

// Enhanced navigation functions
const handleNext = () => {
  if (canProceed.value && currentStep.value < 5) {
    currentStep.value++
  }
}

const handlePrevious = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const handleStepClick = (stepId: number) => {
  // Only allow going to completed steps or next step
  if (stepId <= Math.min(currentStep.value + 1, 5)) {
    currentStep.value = stepId
  }
}
</script>

<style>
/* Tối ưu animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 640px) {
  .container {
    padding-bottom: 120px;
  }
}
</style>