<template>
  <div>
    <Head>
      <Title>AutoReel AI - Create Videos Automatically from Your Story | Your Story, Your Style, Your Reel 🎥</Title>
      <Meta name="description" content="AutoReel AI is an AI video creation tool that automatically turns your story into a professional video. Your Story, Your Style, Your Reel 🎥. Transform your ideas into visually stunning videos in 5 simple steps." />
      
      <!-- Open Graph / Facebook -->
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content="AutoReel AI - Create Videos Automatically from Your Story | Your Story, Your Style, Your Reel 🎥" />
      <Meta property="og:description" content="Transform your story into a professional video using AI. Your Story, Your Style, Your Reel 🎥. Customize your visual style, voiceover, and many other features." />
      <Meta property="og:image" content="/og-image.jpg" />

      <!-- Twitter -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content="AutoReel AI - Create Videos Automatically from Your Story | Your Story, Your Style, Your Reel 🎥" />
      <Meta name="twitter:description" content="Transform your story into a professional video using AI. Your Story, Your Style, Your Reel 🎥. Customize your visual style, voiceover, and many other features." />
      <Meta name="twitter:image" content="/og-image.jpg" />

      <!-- Keywords -->
      <Meta name="keywords" content="ai video creation, automatic video, text to video, ai video generator, autoreel, story video" />

      <!-- Additional meta tags -->
      <Meta name="author" content="AutoReel AI" />
      <Meta name="robots" content="index, follow" />
      <Link rel="canonical" href="https://autoreel.ai" />
    </Head>

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} | AutoReel AI - Your Story, Your Style, Your Reel 🎥`
      : 'AutoReel AI - Create Videos Automatically from Your Story | Your Story, Your Style, Your Reel 🎥'
  }
})
</script>
