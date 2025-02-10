<template>
  <div>
    <Head>
      <Title>AutoReel AI - Tạo Video Tự Động từ Câu Chuyện của Bạn</Title>
      <Meta name="description" content="AutoReel AI - Công cụ tạo video AI tự động từ câu chuyện của bạn. Chuyển đổi ý tưởng thành video chuyên nghiệp với 5 bước đơn giản." />
      
      <!-- Open Graph / Facebook -->
      <Meta property="og:type" content="website" />
      <Meta property="og:title" content="AutoReel AI - Tạo Video Tự Động từ Câu Chuyện của Bạn" />
      <Meta property="og:description" content="Chuyển đổi câu chuyện của bạn thành video chuyên nghiệp với AI. Tùy chỉnh phong cách hình ảnh, giọng đọc và nhiều tính năng khác." />
      <Meta property="og:image" content="/og-image.jpg" />

      <!-- Twitter -->
      <Meta name="twitter:card" content="summary_large_image" />
      <Meta name="twitter:title" content="AutoReel AI - Tạo Video Tự Động từ Câu Chuyện của Bạn" />
      <Meta name="twitter:description" content="Chuyển đổi câu chuyện của bạn thành video chuyên nghiệp với AI. Tùy chỉnh phong cách hình ảnh, giọng đọc và nhiều tính năng khác." />
      <Meta name="twitter:image" content="/og-image.jpg" />

      <!-- Keywords -->
      <Meta name="keywords" content="tạo video ai, video tự động, text to video, ai video generator, autoreel, video từ câu chuyện" />

      <!-- Các meta tag bổ sung -->
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
    return titleChunk ? `${titleChunk} | AutoReel AI` : 'AutoReel AI - Tạo Video Tự Động từ Câu Chuyện của Bạn'
  }
})
</script>
