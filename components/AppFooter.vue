<template>
  <footer class="bg-gray-50 border-t py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 class="font-bold mb-4">AutoReel AI</h3>
          <p class="text-gray-600">Your Story, Your Style, Your Reel</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Product</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/features" class="text-gray-600 hover:text-primary">Features</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="text-gray-600 hover:text-primary">Pricing</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Resources</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/docs" class="text-gray-600 hover:text-primary">Documentation</NuxtLink></li>
            <li><NuxtLink to="/blog" class="text-gray-600 hover:text-primary">Blog</NuxtLink></li>
          </ul>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Company</h4>
          <ul class="space-y-2">
            <li><NuxtLink to="/about" class="text-gray-600 hover:text-primary">About</NuxtLink></li>
            <li><NuxtLink to="/contact" class="text-gray-600 hover:text-primary">Contact</NuxtLink></li>
          </ul>
        </div>
      </div>
      <div class="mt-8 pt-8 border-t text-center text-gray-600">
        <p>&copy; {{ new Date().getFullYear() }} AutoReel AI. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template> 