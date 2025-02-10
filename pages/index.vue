<template>
  <div class="container mx-auto py-8 px-4">
    <!-- Title and Slogan -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">🚀 AutoReel AI</h1>
      <p class="text-xl text-gray-600">Your Story, Your Style, Your Reel 🎥</p>
    </div>

    <!-- Stepper with improved UX -->
    <div class="mb-12 relative">
      <div class="flex items-center justify-between">
        <template v-for="(step, index) in steps" :key="step.id">
          <div class="flex items-center relative group">
            <UTooltip :text="step.title">
              <UButton
                :variant="currentStep >= step.id ? 'solid' : 'ghost'"
                :color="currentStep >= step.id ? 'primary' : 'gray'"
                :class="[
                  'rounded-full w-12 h-12 flex items-center justify-center',
                  currentStep === step.id ? 'ring-2 ring-primary-500/30' : ''
                ]"
                @click="handleStepClick(step.id)"
              >
                <span v-if="currentStep > step.id" class="text-white">
                  <UIcon name="i-heroicons-check" class="w-5 h-5" />
                </span>
                <span v-else>{{ step.id }}</span>
              </UButton>
            </UTooltip>
            <p class="ml-3 font-medium transition-all duration-300" :class="{
              'text-primary-500 scale-105': currentStep >= step.id,
              'text-gray-500': currentStep < step.id,
              'hidden md:block': true
            }">
              {{ step.title }}
            </p>
          </div>
          <div v-if="index < steps.length - 1" class="flex-1 mx-4">
            <div class="h-1 rounded-full bg-gray-200 relative">
              <div
                class="absolute top-0 left-0 h-full bg-primary-500 rounded-full transition-all duration-500"
                :style="{ width: currentStep > step.id ? '100%' : '0%' }"
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- Content with smooth transitions -->
    <div class="space-y-8">
      <ClientOnly>
        <TransitionGroup name="fade">
          <UCard
            v-for="step in steps" 
            v-show="currentStep === step.id"
            :key="step.id"
            :ui="{ 
              base: 'transition-opacity duration-300',
              body: { 
                padding: 'p-6',
                base: 'ring-1 ring-gray-200 bg-white'
              }
            }"
          >
            <div class="flex items-center gap-4 mb-4">
              <UBadge
                color="primary"
                variant="solid"
                size="lg"
                class="w-8 h-8 rounded-full flex items-center justify-center"
              >
                {{ step.id }}
              </UBadge>
              <h2 class="text-2xl font-bold">{{ step.title }}</h2>
            </div>

            <div>
              <!-- Step 1 Content -->
              <div v-if="step.id === 1">
                <UFormGroup label="Story Source">
                  <URadioGroup v-model="storySource" :options="[
                    { label: 'Generate New Story', value: 'generate' },
                    { label: 'Use My Own Story', value: 'own' }
                  ]" />
                </UFormGroup>

                <template v-if="storySource === 'generate'">
                  <UFormGroup label="Story Theme" class="mt-4">
                    <USelect
                      v-model="storyTheme"
                      :options="['Adventure', 'Romance', 'Mystery', 'Comedy', 'Drama']"
                      placeholder="Select a theme"
                    />
                  </UFormGroup>
                  <UFormGroup label="Story Description" class="mt-4">
                    <UTextarea
                      v-model="storyDescription"
                      placeholder="Enter your story description or select options to generate one..."
                      :rows="4"
                    />
                  </UFormGroup>
                </template>

                <template v-if="storySource === 'own'">
                  <UFormGroup label="Your Story" class="mt-4">
                    <UTextarea
                      v-model="storyDescription"
                      placeholder="Enter your story here..."
                      :rows="6"
                    />
                  </UFormGroup>
                </template>

                <UFormGroup label="Duration" class="mt-4">
                  <USelect
                    v-model="duration"
                    :options="['30 seconds', '1 minute', '2 minutes', '3 minutes']"
                    placeholder="Select video duration"
                  />
                </UFormGroup>
              </div>

              <!-- Step 2 Content -->
              <div v-if="step.id === 2">
                <h2 class="text-2xl font-bold mb-4">Step 2: Image Style</h2>
                <UCard class="p-4">
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div v-for="style in imageStyles" :key="style.id" class="relative">
                      <UCard :ui="{ body: { padding: 'p-0' } }">
                        <img :src="style.preview" :alt="style.name" class="w-full h-48 object-cover rounded-t">
                        <div class="p-4">
                          <URadio v-model="selectedStyle" :value="style.id" :label="style.name" />
                          <p class="text-sm text-gray-500 mt-2">{{ style.description }}</p>
                        </div>
                      </UCard>
                    </div>
                  </div>
                </UCard>
              </div>

              <!-- Step 3 Content -->
              <div v-if="step.id === 3">
                <h2 class="text-2xl font-bold mb-4">Step 3: Voice Selection</h2>
                <UCard class="p-4">
                  <div class="space-y-4">
                    <UFormGroup label="Voice Gender">
                      <URadioGroup v-model="voiceGender" :options="['Male', 'Female']" />
                    </UFormGroup>
                    <UFormGroup label="Voice Age">
                      <URadioGroup v-model="voiceAge" :options="['Young', 'Middle', 'Senior']" />
                    </UFormGroup>
                    <UFormGroup label="Available Voices" class="mt-4">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <UCard v-for="voice in voices" :key="voice.id" class="p-4">
                          <div class="flex items-center justify-between">
                            <div>
                              <h4 class="font-medium">{{ voice.name }}</h4>
                              <p class="text-sm text-gray-500">{{ voice.description }}</p>
                            </div>
                            <UButton icon="i-heroicons-play" color="primary" variant="soft" @click="playVoiceSample(voice.id)" />
                          </div>
                          <URadio v-model="selectedVoice" :value="voice.id" class="mt-2" />
                        </UCard>
                      </div>
                    </UFormGroup>
                  </div>
                </UCard>
              </div>

              <!-- Step 4 Content -->
              <div v-if="step.id === 4">
                <h2 class="text-2xl font-bold mb-4">Step 4: Preview</h2>
                <UCard class="p-4">
                  <div class="space-y-4">
                    <div class="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-heroicons-play-circle" class="w-16 h-16 text-gray-400" />
                    </div>
                    <div class="space-y-4">
                      <h3 class="font-medium">Story Summary</h3>
                      <UCard class="p-4 bg-gray-50">
                        <ul class="space-y-2">
                          <li><span class="font-medium">Theme:</span> {{ storyTheme }}</li>
                          <li><span class="font-medium">Duration:</span> {{ duration }}</li>
                          <li><span class="font-medium">Style:</span> {{ getStyleName(selectedStyle) }}</li>
                          <li><span class="font-medium">Voice:</span> {{ getVoiceName(selectedVoice) }}</li>
                        </ul>
                      </UCard>
                    </div>
                  </div>
                </UCard>
              </div>

              <!-- Step 5 Content -->
              <div v-if="step.id === 5">
                <h2 class="text-2xl font-bold mb-4">Step 5: Download Video</h2>
                <UCard class="p-4">
                  <div class="flex flex-col items-center space-y-4">
                    <div class="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                      <UIcon name="i-heroicons-qr-code" class="w-32 h-32 text-gray-400" />
                    </div>
                    <p class="text-center text-gray-600">Scan this QR code with your mobile device to download the video</p>
                    <div class="flex gap-4">
                      <UButton color="primary" icon="i-heroicons-arrow-down-tray">
                        Download Directly
                      </UButton>
                      <UButton color="gray" icon="i-heroicons-arrow-path" @click="restartProcess">
                        Create Another Video
                      </UButton>
                    </div>
                  </div>
                </UCard>
              </div>
            </div>
          </UCard>
        </TransitionGroup>
      </ClientOnly>
    </div>

    <!-- Improved Navigation Buttons -->
    <div class="flex justify-between mt-8">
      <UButton
        v-if="currentStep > 1"
        @click="handlePrevious"
        icon="i-heroicons-arrow-left"
        variant="soft"
      >
        Previous
      </UButton>
      <div class="flex gap-4 ml-auto">
        <UButton
          v-if="currentStep === 5"
          color="gray"
          icon="i-heroicons-arrow-path"
          @click="restartProcess"
        >
          Start Over
        </UButton>
        <UButton
          v-if="currentStep < 5"
          @click="handleNext"
          icon="i-heroicons-arrow-right"
          color="primary"
          :disabled="!canProceed"
        >
          Next
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentStep = ref<number>(1)

interface Step {
  id: number
  title: string
}

const steps: Step[] = [
  { id: 1, title: 'Story Input' },
  { id: 2, title: 'Image Style' },
  { id: 3, title: 'Voice Selection' },
  { id: 4, title: 'Preview' },
  { id: 5, title: 'Download' }
]

// Step 1 data
const storySource = ref<'generate' | 'own'>('generate')
const storyTheme = ref<string>('')
const storyDescription = ref<string>('')
const duration = ref<string>('')

// Step 2 data
const selectedStyle = ref('')
const imageStyles = [
  { id: 'anime', name: 'Anime', description: 'Japanese animation style', preview: '/styles/anime.jpg' },
  { id: '3d', name: '3D Animation', description: 'Modern 3D rendered style', preview: '/styles/3d.jpg' },
  { id: 'realistic', name: 'Realistic', description: 'Photorealistic style', preview: '/styles/realistic.jpg' }
]

// Step 3 data
const voiceGender = ref('Male')
const voiceAge = ref('Young')
const selectedVoice = ref('')
const voices = [
  { id: 'voice1', name: 'Alex', description: 'Clear and professional male voice' },
  { id: 'voice2', name: 'Emma', description: 'Warm and friendly female voice' },
  { id: 'voice3', name: 'James', description: 'Deep and authoritative male voice' },
  { id: 'voice4', name: 'Sophie', description: 'Soft and gentle female voice' }
]

// Helper functions
const getStyleName = (id: string) => {
  return imageStyles.find(style => style.id === id)?.name || ''
}

const getVoiceName = (id: string) => {
  return voices.find(voice => voice.id === id)?.name || ''
}

const playVoiceSample = (voiceId: string) => {
  // TODO: Implement voice sample playback
  console.log('Playing voice sample:', voiceId)
}

// Add new function to restart the process
const restartProcess = () => {
  currentStep.value = 1
  storySource.value = 'generate'
  storyTheme.value = ''
  storyDescription.value = ''
  duration.value = ''
  selectedStyle.value = ''
  voiceGender.value = 'Male'
  voiceAge.value = 'Young'
  selectedVoice.value = ''
}

// Add validation logic
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return storyDescription.value.length > 0 && duration.value
    case 2:
      return selectedStyle.value
    case 3:
      return selectedVoice.value
    default:
      return true
  }
})

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

<style scoped>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
.container {
  max-width: 1200px;
}
</style>