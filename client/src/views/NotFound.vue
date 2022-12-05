<script setup>
  import Navbar from '../components/Navbar.vue';
</script>

<template>
  <Navbar />
    <main class="h-screen w-full flex flex-col justify-center items-center bg-[#ebc697]">
        <h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
            Page Not Found
        </div>
        <button class="mt-5">
          <a class="relative inline-block text-sm font-medium text-[#ebc697] group active:text-orange-500 focus:outline-none focus:ring">
            <span class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#8a7e6e] group-hover:translate-y-0 group-hover:translate-x-0"></span>
            <span class="relative block px-8 py-3 bg-[#de985e] border border-current">
              <router-link to="/" class="font-bold">Go Home</router-link>
            </span>
          </a>
      </button>
    </main>
</template>