<script setup>
    import Navbar from '../components/NavbarLoggedIn.vue';
</script>

<template>
    <Navbar />
    <div class="flex-1 flex items-center justify-center h-screen w-full bg-[url('/assets/seweybg.jpg')] text-white bg-cover bg-fixed">
        <div class="">
            <h1 class="text-6xl text-center text-600 font-semibold mb-12 text-white">
                Shorten a Link
            </h1>
            <label for="real-link" class="font-medium text-2xl">Real Link</label><br>
            <div class="flex items-center rounded-lg bg-white/30 hover:bg-white/20 border transition ease-in-out duration-[150ms] focus:bg-white/20 border-red-500/40 py-2 px-2 w-[35rem] mt-3 mb-1">
                <input class="appearance-none bg-transparent border-none w-full text-white mx-2 leading-tight focus:outline-none placeholder-white" type="text" id="real-link" placeholder="Place the link you want to redirect" v-model="realLink">
            </div>
            <div id="validation" class="text-white mb-5"></div>
            <label for="custom-path" class="font-medium text-2xl">Custom Path</label><br>
            <div class="flex items-center rounded-lg bg-white/30 hover:bg-white/20 border transition ease-in-out duration-[150ms] focus:bg-white/20 border-red-500/40 py-2 px-4 w-[35rem] mt-3 mb-5">
                <p class="font-medium">sew.ey:5173/</p>
                <input class="appearance-none bg-transparent border-none w-full text-white ml-2 leading-tight focus:outline-none placeholder-white" type="text" id="custom-path" placeholder="Write the custom route" v-model="customPath">
            </div>
            
            <div>
                <button type="submit" class="flex-shrink-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-xs border-4 text-white py-2 px-4 rounded text-[18px] font-semibold transition ease-in-out duration-[150ms]" @click="addLink">Shrink!</button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default{
        data() {
            return {
                domain: 'http://sew.ey:5173/',
                realLink: '',
                customPath: ''
            }
        },
        beforeMount() {
            this.checkUid()
        },
        methods:
        {
            async addLink() {
                // var realLinkInput = document.getElementById('real-link').value
                let result = this.realLink.includes("https://")
                if (result == false) {
                    this.$router.push('/create')
                    document.getElementById('validation').innerHTML = "Please enter a valid URL (include a https:// in the beginning of the link)"
                }
                else 
                {
                    const res = await axios.post("http://localhost:8000/api/addLink", {
                        domain: this.domain,
                        realLink: this.realLink,
                        customPath: this.customPath,
                        uid: localStorage.getItem('userToken')
                    })
                    .then((response) => {
                        console.log(response.data)
                        this.$router.push('/dashboard')
                    })
                    .catch((err) => {
                        console.log("error nambah link")
                        console.log(err)
                    })
                    
                }

            },
            checkUid() {
                if (localStorage.getItem('userToken') == null || localStorage.getItem('userToken') == '') {
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