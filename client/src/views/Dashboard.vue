<script setup>
    import Navbar from '../components/NavbarLoggedIn.vue';
</script>
<template>
    <Navbar />
    <div class="h-screen w-full bg-[url('/assets/seweybg.jpg')] bg-cover bg-no-repeat">
        <div class="flex-1 flex items-center justify-center">
            <div class="mt-10">
                <h1 class="text-3xl text-center text-600 font-semibold mb-12 text-white">
                    Your Links
                </h1>
                <button @click="this.$router.push('/create')" class="text-white bg-white/30 text-lg px-3 py-1.5 rounded-lg font-semibold">Add Link</button>
                <div v-for="link in links" :key="link" class="rounded-lg bg-white/30 backdrop-blur-lg py-2 px-2 w-[50rem] my-3">
                    <div class="flex items-center">
                        <div class="container flex flex-wrap justify-between items-center mx-auto">
                            <h2 class="text-base font-semibold text-white my-1 mx-2 rounded">{{ link.customPath }}</h2>
                            <p class="text-base font-semibold text-white my-1 mx-2 rounded">{{ link.realLink }}</p>
                            <!-- <p class="flex-shrink-0 bg-red-500 border-red-500 text-base font-semibold border-4 text-white py-1 px-2 rounded">{{ link.id }}</p> -->
                        </div>
                        <button v-if="!link.showForm" @click="link.showForm = !link.showForm" class="bg-white px-2 py-1 rounded-md text-gray-900 font-medium mr-3">Edit</button>
                        <button @click="deleteLink(link.uid)" class=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#FFFFFF" d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button>
                    </div>
                    <div v-if="link.showForm" class="pt-3">
                        <div class="flex justify-between px-3 pb-2">
                            <div>
                                <label for="" class="text-white font-medium">Custom Link</label><br>
                                <input type="text" class="rounded">
                            </div>
                            <div>
                                <label for="" class="text-white font-medium">Real Link</label><br>
                                <input type="text" class="rounded">
                            </div>
                        </div>
                        <div class="px-3 gap-2">
                            <button class="px-2 bg-white mr-2 text-red-500 rounded-md py-0.5 font-medium">Edit</button>
                            <button @click="link.showForm = !link.showForm" class="px-2 bg-white text-red-500 rounded-md py-0.5 font-medium">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from 'axios'
    import { auth } from "../firebase.js"

    export default{
        data() {
            return{
                // links: [{customPath: 'http://127.0.0.1:5173/info', realLink: 'https://www.instagram.com/rifkiam_', showForm: false}, {customPath: 'http://127.0.0.1:5173/info', realLink: 'https://www.instagram.com/rifkiam_', showForm: false}, {customPath: 'http://127.0.0.1:5173/info', realLink: 'https://www.instagram.com/rifkiam_', showForm: false}, {customPath: 'http://127.0.0.1:5173/info', realLink: 'https://www.instagram.com/rifkiam_', showForm: false}]
                links: [],
                showForm: false,
                newCustomPath: ''
            }
        },
        mounted() {
            // console.log(localStorage.getItem('userToken'))
            this.getLinks()
        },
        beforeMount() {
            this.checkUid()
        },
        methods:
        {
            async getLinks() {
                const res = await axios.get("http://localhost:8000/api/links", {
                    params: { uid: localStorage.getItem('userToken')}
                })
                .then((response)=>{
                    console.log(response)
                    const links = response.data
                    this.links.push(...response.data)
                    console.log(this.links)
                    console.log("berhasil ges")
                })
                .catch((err) => {
                    console.log("error ngepush link ke array")
                    console.log(err)
                })
            },
        
            // async updateItem(uid) {
            //     const res = await axios.post("http://localhost:8000/api/update", {
            //         newCustomPath: this.newCustomPath,
            //         uid: this.uid
            //     })
            // },

            checkUid() {
                if (localStorage.getItem('userToken') == null || localStorage.getItem('userToken') == '')
                {
                    this.$router.push('/login')
                }
                else
                {
                    return;
                }
            }
        }
    }
</script>