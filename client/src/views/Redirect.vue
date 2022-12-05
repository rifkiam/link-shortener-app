<template>
    <div class="container mx-auto px-72">
        <div class="warning">
            wait
        </div>
    </div>
</template>

<script>
    import { db } from '../../../server/src/firebase.js'
    import { query, where, collection, doc, onSnapshot } from "firebase/firestore";
    import axios from 'axios'

    export default {
        mounted() {
            this.check()
        },
        data() {
            return {
                url: window.location.href,
                text: ''
            }
        },
        methods: {
            async check() {
                const redLink = await axios.get("http://localhost:8000/api/redirectLink", {
                    params: { url: this.url }
                })
                .then((response)=>{
                    window.location.replace(response.data)
                })
                // const q = query(collection(db, "links"), where("customPath", "==", this.url))
                // onSnapshot(q, (querySnapshot) => {
                //     console.log(querySnapshot)
                //     querySnapshot.forEach((doc) => {
                //         if (doc == null || doc === null) 
                //         {
                //             this.$router.push('/')
                //         }
                //         else
                //         {
                //             const docData = doc.data()
                //             console.log(docData)
                //             window.location.replace(docData.realLink)
                //         }
                //     });
                // });
                // console.log(q)
            }
        }
    }
</script>