<template>
    <div class="bg-red-500">
      <nav class="flex items-center justify-between flex-wrap bg-red-500 p-6 container mx-auto">
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <a href="/" class="block mt-4 lg:inline-block lg:mt-0 text-red-200 hover:text-white font-semibold text-2xl">
              Sew.ey
            </a>
          </div>
          <div class="pr-6">
            <button class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-red-500 hover:bg-white mt-4 lg:mt-0" @click="logOut">Logout</button>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
  import { RouterLink, RouterView } from 'vue-router'
  import { auth } from "../firebase.js"
  import axios from 'axios'

  export default {
    methods:
    {
      async logOut() {
        const res = await axios.post("http://localhost:8000/api/logout")
        .then((response)=>{
          console.log(response.data)
          localStorage.removeItem('userToken')
          localStorage.removeItem('userEmail')
          if(localStorage.getItem('userToken'))
          {
            console.log(localStorage.getItem('userToken'))
          }
          else
          {
            console.log("Cookie kosong")
          }
          this.$router.push("/login")
        })
      }
    }
  }

</script>