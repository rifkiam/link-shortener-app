<template>
  <div class="w-full flex flex-wrap">

        <!-- Register Section -->
        <div class="w-full md:w-2/5 flex flex-col">

            <div class="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-12">
                <!-- <a href="#" class="bg-black text-white font-bold text-xl p-4" alt="Logo">Logo</a> -->
                <a href="/" class="bg-black block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white font-semibold text-2xl p-4">Sew.ey</a>
            </div>

            <div class="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
                <p class="text-center text-3xl">Welcome to Sewey Link Shrinker App</p>
                
                <div class="text-center pt-12 pb-12">
                    <p>Already have an account? <a href="newLogin" class="underline font-semibold">Log in here.</a></p>
                </div>
            </div>

        </div>

        <!-- Image Section -->
        <div class="w-3/5 shadow-2xl h-screen bg-[url('/assets/seweyhomepage.jpg')] bg-fixed bg-cover bg-no-repeat">
            <!-- <img class="object-cover w-full h-screen hidden md:block" src="https://source.unsplash.com/IXUM4cJynP0" alt="Background" /> -->
        </div>
    </div>
</template>

<script>

  export default {
    mounted()
    {
      console.log(localStorage.getItem('userToken'))
    }
  }
</script>
