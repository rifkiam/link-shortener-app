<script setup>
    import Navbar from '../components/Navbar.vue';
</script>

<template>
    <Navbar />
    <div class="container mx-auto px-72">
        <div class="w-full h-[400px] border mt-16 rounded-lg bg-red-500 overflow-clip">
            <div class="">
                <h2 class="text-white text-lg font-semibold mx-8 my-6">Register</h2>
            </div>
            <div class="w-full h-full bg-white">
                <div class="h-3/4 bg-white px-8 py-6">
                    <div>
                        <label for="username" class="font-medium text-lg">Username</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="text" id="username" placeholder="Enter your username" v-model="username">
                    </div> 
                    <div class="mt-4">
                        <label for="email" class="font-medium text-lg">Email</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="email" id="email" placeholder="Enter your email" v-model="email">
                    </div>
                    <div class="mt-4">
                        <label for="password" class="font-medium text-lg">Password</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="password" id="password" placeholder="Enter password" v-model="password">
                    </div>
                    <button class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 font-medium" @click="userReg">Register</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
    // import { auth } from "../firebase.js"
    import axios from 'axios'
    // import firebase from 'firebase/compat/app';

    export default {
        data() {
            return{
                username: '',
                email: '',
                password: ''
            }
        },
        methods: 
        {
            async userReg() { 
                const res = await axios.post("http://localhost:8000/api/register", {
                    email: this.email,
                    password: this.password
                })
                .then((response)=>{
                    console.log(response)
                    alert("User successfully registered")
                    this.$router.push('/login')
                })
            }

        }
    }
</script>