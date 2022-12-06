<script setup>
    import Navbar from '../components/NavbarLoggedIn.vue';
</script>

<template>
    <Navbar />
    <div class="container mx-auto px-72">
        <div class="w-full h-80 border mt-16 rounded-lg bg-red-500 overflow-clip">
            <div class="">
                <h2 class="text-white text-lg font-semibold mx-8 my-6">Shorten a Link</h2>
            </div>
            <div class="w-full h-full bg-white">
                <div class="h-3/4 bg-white px-8 py-6">
                    <div>
                        <label for="real-link" class="font-medium text-lg">Real Link</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="text" id="real-link" placeholder="Place the link you want to redirect" v-model="realLink">
                    </div>
                    <div class="mt-4">
                        <label for="custom-path" class="font-medium text-lg">Custom Path</label><br>
                        <input class="border mt-1.5 rounded focus:outline-red-400" type="text" id="custom-path" placeholder="Write the custom route" v-model="customPath">
                    </div>
                    <button type="submit" class="bg-red-500 text-white px-4 py-2 rounded-lg mt-4 font-medium" @click="addLink">Shrink!</button>
                </div>
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