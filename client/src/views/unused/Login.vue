<script setup>
    import Navbar from '../components/Navbar.vue';
</script>

<template>
    <!-- <Navbar /> -->
    <div class="container mx-auto px-72">
        <div class="w-full h-80 border mt-16 rounded-lg bg-red-500 overflow-clip">
            <div class="">
                <h2 class="text-white text-lg font-semibold mx-8 my-6">Login</h2>
            </div>
            <div class="w-full h-full bg-white">
                <div class="h-3/4 bg-white px-8 py-6">
                    <div>
                        <label for="email" class="font-medium text-lg">Email</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="text" id="email" placeholder="Enter your email" v-model="email">
                    </div>
                    <div class="mt-4">
                        <label for="password" class="font-medium text-lg">Password</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="password" id="password" placeholder="Enter password" v-model="password">
                    </div>
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 font-medium" @click="userLogin">Login</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { auth } from "../firebase.js"
    import axios from 'axios'

    export default{
        data() {
            return{
                // name: '',
                email: '',
                password: ''
            }
        },
        beforeMount() {
            this.check()
        },
        mounted() {
            console.log(localStorage.getItem('userToken'))
        },
        methods:
        {
            async userLogin() { 
                let benar = false 
                const res = await axios.post("http://localhost:8000/api/login", {
                    email: this.email,
                    password: this.password
                })
                .then((response)=>{
                    console.log(response.data)
                    const userId = response.data.uid
                    const userEmail = response.data.email
                    localStorage.setItem('userToken', userId)
                    localStorage.setItem('userEmail', userEmail)
                    this.$router.push("/dashboard")
                })
                .catch((response) => {
                    console.log(response.data.code)
                })
            },
            check() {
                if (localStorage.getItem('userToken') != null) {
                    this.$router.push('/dashboard')
                }
                else
                {
                    return;
                }
            }
        }
    }
</script>