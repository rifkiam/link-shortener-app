import { getFirestore, query, collection, doc, onSnapshot, addDoc, deleteDoc, updateDoc, where, connectFirestoreEmulator, increment, getDocs, getDoc } from "firebase/firestore";
import { adminAuth } from "../config/database.js"
import { auth, db } from "./firebase.js"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import express from 'express'
// const express = require('express')
const app = express()
import cors from 'cors'
// const cors = require("cors")
const port = 8000

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
    console.log("Listening to port 8000");
})

app.get("/api/links", async (req, res) => {
    const uid = req.query.uid
    let links = [];
    try {
        const q = query(collection(db, "links"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
            let data = docSnap.data();
            let id = docSnap.id;
            links.push({ id, ...data });
        })
        res.send(links)
    }
    catch (error) {
        console.log("udah tapi error")
        console.log(error)
        res.send(error)
    }
})

app.get("/api/redirectLink", async (req, res) => {
    console.log("test")
    const url = req.query.url
    let id = ''
    let click = 0
    let realLink = ''
    // console.log(url)
    try {
        const q = query(collection(db, "links"), where("customPath", "==", url));
        console.log("masuk try")
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((docSnap) => {
            id = docSnap.id
            if (docSnap == null || docSnap === null) {
                console.log("Cannot find associated link")
                res.send("Cannot find associated link")
            }
            else {
                const docData = docSnap.data()
                click = parseInt(docData.click)
                realLink = docData.realLink
                console.log(click)
                console.log(realLink)
                console.log(id)
                updateDoc(doc(db, "links", id), {
                    click: click + 1
                })
                console.log(click)
            }
        });
        res.send(realLink)
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

app.post("/api/login", async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    try {
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                userCredential.user.getIdTokenResult()
                    .then((token) => {
                        console.log(token)
                        adminAuth.verifyIdToken(token.token)
                            .then((decodedToken) => {
                                res.send(decodedToken)
                            })
                    })
            })
            .catch((err) => {
                console.log(err)
                res.send(err)
            })
    }
    catch (err) {
        res.send(err)
    }
})

app.post("/api/logout", async (req, res) => {
    try {
        await signOut(auth).then(() => {
            console.log("berhasil log out")
            res.send("berhasil log out")
        })
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

app.post("/api/register", async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    try {
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                res.send(userCredential)
            })
    }
    catch (err) {
        res.send(err)
    }
})

app.post("/api/addLink", async (req, res) => {
    const uid = req.body.uid
    const domain = req.body.domain
    const realLink = req.body.realLink
    const customPath = req.body.customPath
    const shortenedLink = domain.concat(customPath)
    console.log(uid)
    console.log(realLink)
    console.log(customPath)
    console.log(shortenedLink)
    try {
        await addDoc(collection(db, "links"), {
            realLink: realLink,
            customPath: shortenedLink,
            uid: uid,
            click: 0,
            showForm: false
        })
        .then(() => {
            res.send("Link succesfully added")
        })
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})

app.post("/api/update", async (req, res) => {
    const newCustomPath = req.body.newCustomPath
    const uid = req.body.uid
    const docRef = doc(db, "links", uid)

    try {
        await updateDoc(docRef, {
            customPath: newCustomPath
        })
        res.send({ message: "Succesfully edited" })
    }
    catch (err) {
        console.log(err)
        res.send(err)
    }
})