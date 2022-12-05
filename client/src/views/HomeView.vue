<script setup>
  import Navbar from '../components/Navbar.vue';
</script>

<template>
  <Navbar />
  <div class="h-screen w-full bg-[url('/assets/seweybg.jpg')] bg-cover py-10">
    <div class="text-3xl text-center text-600 font-semibold mb-6 text-white">
      <div class="flex-1 flex items-center  justify-center">
        Simple link shortening app using Firebase, ExpressJS and Vue 3
      </div>
    </div>
  </div>
</template>
