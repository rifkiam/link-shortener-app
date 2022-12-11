<script setup>
    import Navbar from '../components/NavbarLoggedIn.vue';
</script>
<template>
    <Navbar />
    <div class="h-screen w-full bg-[url('/assets/seweybg.jpg')] bg-cover bg-no-repeat bg-fixed">
        <div class="text-white text-lg pl-12 pt-8">
            You are logged in as <span id="user-email" class="font-medium"></span>
        </div>
        <div class="flex-1 flex items-center justify-center">
            <div class="mt-10">
                <div class="grid grid-cols-2 gap-6 mb-6">
                    <div class="text-white rounded-lg backdrop-blur-lg border border-red-500/40 px-5 py-4 transition ease-in-out font-medium text-2xl h-44 bg-white/30 hover:bg-white/20">Links made 
                        <h1 class="text-8xl text-right mr-6 hover:text-[112px] transition-all ease-in-out delay-100">
                            {{ links.length }}
                        </h1>
                    </div>
                    <div class="text-white rounded-lg backdrop-blur-lg border border-red-500/40 px-5 py-4 transition ease-in-out font-medium text-2xl h-44 bg-white/30 hover:bg-white/20">Total clicks 
                        <h1 class="text-8xl text-right mr-6 hover:text-[112px] transition-all ease-in-out delay-100">
                            {{ totalClicks }}
                        </h1>
                    </div>
                </div>
                <!-- <h1 class="text-3xl text-center text-600 font-semibold mb-11 text-white">
                    Your Links
                </h1> -->
                <button @click="this.$router.push('/create')" class="text-white bg-white/30 hover:bg-white/20 text-lg px-3 py-1.5 rounded-lg font-semibold hover:text-gray-100 transition ease-in-out duration-[250ms] items-center">Add Link</button>
                <div v-for="link in links" :key="link" class="rounded-lg bg-white/30 hover:bg-white/20 transition ease-in-out duration-[150ms] backdrop-blur-lg py-2 px-2 w-[50rem] my-3 border-red-500/40 border">
                    <div class="flex items-center">
                        <button v-bind:data-tooltip-target="'tooltip-left-'+link.id" data-tooltip-placement="left" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="scale-110 ml-1 fill-white hover:fill-gray-400 transition ease-in-out duration-[250ms]"><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
                        </button>
                        <div v-bind:id="'tooltip-left-'+link.id" role="tooltip" class="inline-block absolute invisible hover:visible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                            <div>{{link.click}}</div>
                            <!-- <div class="tooltip-arrow" data-popper-arrow></div> -->
                        </div>
                        <div class="container flex flex-wrap justify-between items-center mx-auto">
                            <a class="text-base font-semibold text-white my-1 mx-3 rounded hover:text-gray-400 transition ease-in-out duration-[250ms]" target="_blank" v-bind:href="link.customPath">{{ link.customPath.replace("http://", "") }}</a>
                            <p class="text-base font-semibold text-white my-1 mx-2 rounded text-left">{{ link.realLink }}</p>
                        </div>
                        <button v-if="!link.showForm" @click="link.showForm = !link.showForm" class="bg-white px-2 py-1 rounded-md text-gray-900 font-medium mr-3 hover:bg-white/30 transition ease-in-out duration-200">Edit</button>
                        <button @click="deleteLink(link.id)" class=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-white hover:fill-gray-400 transition ease-in-out duration-[250ms]"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg></button>
                    </div>
                    <div v-if="link.showForm" class="py-3">
                        <div class="flex justify-between px-3 pb-2">
                            <div>
                                <label for="" class="text-white font-medium">Custom Link</label><br>
                                <div class="flex">
                                    <p class="text-white">sew.ey:5173/&nbsp;</p>
                                    <input v-model="newCustomPath" type="text" class="rounded">
                                </div>
                            </div>
                            <div>
                                <label for="" class="text-white font-medium">Real Link</label><br>
                                <input v-model="newRealLink" type="text" class="rounded">
                            </div>
                        </div>
                        <div class="px-3 pt-2 gap-2 ">
                            <button @click="updateItem(link.id, link.customPath, link.realLink)" class="px-2 bg-white mr-2 text-gray-900 rounded-md py-0.5 font-medium">Edit</button>
                            <button @click="link.showForm = !link.showForm" class="ml-2 px-2 bg-white text-gray-900 rounded-md py-0.5 font-medium">Cancel</button>
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
                newCustomPath: '',
                newRealLink: '',
                totalClicks: 0,
            }
        },
        mounted() {
            // console.log(localStorage.getItem('userToken'))
            this.getLinks()
            document.getElementById('user-email').innerHTML = localStorage.getItem('userEmail')
        },
        beforeMount() {
            this.checkUid()
        },
        methods:
        {
            async getLinks() {
                this.links = []
                const res = await axios.get("http://localhost:8000/api/links", {
                    params: { uid: localStorage.getItem('userToken')}
                })
                .then((response)=>{
                    console.log(response)
                    const links = response.data
                    this.links.push(...response.data.links)
                    this.totalClicks = response.data.clicks
                    console.log(this.links)
                    console.log("berhasil ges")
                })
                .catch((err) => {
                    console.log("error ngepush link ke array")
                    console.log(err)
                })
            },
        
            async updateItem(id, customPath, realLink) {
                console.log(customPath)
                console.log(realLink)
                if (this.newCustomPath == '') {
                    this.newCustomPath = customPath.replace("http://sew.ey:5173/")
                }
                if (this.newRealLink == '') {
                    this.newRealLink = realLink
                }
                const res = await axios.post("http://localhost:8000/api/update", {
                    newCustomPath: this.newCustomPath,
                    newRealLink: this.newRealLink,
                    id: id
                })
                this.links = [];
                this.getLinks()
                this.newCustomPath = ''
                this.newRealLink = ''
            },

            async deleteLink(id) {
                const res = await axios.post("http://localhost:8000/api/delete", {
                    id: id
                })
                this.links = [];
                this.getLinks()
            },

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