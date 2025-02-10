<template>
  <header class="border-b">
    <div class="container mx-auto px-4">
      <nav class="flex items-center justify-between h-16">
        <NuxtLink to="/" class="font-bold text-xl">AutoReel AI</NuxtLink>
        <div class="flex gap-6">
          <UButton to="/solutions" variant="ghost">Solutions</UButton>
          <UButton to="/docs" variant="ghost">Docs</UButton>
          <UButton to="/pricing" variant="ghost">Pricing</UButton>
          <UButton to="/enterprise" variant="ghost">Enterprise</UButton>
        </div>
      </nav>
    </div>
  </header>
</template> 