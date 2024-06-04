import { getFirestore } from "firebase-admin/firestore";
import { app } from "../firebase/client";

const db = getFirestore(app);
let form = document.querySelector('form');
let errorElement = document.getElementById('errorElement');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(form);

    const data = {
        acceptedCounsellor: null, // Assuming no counsellor is assigned initially
        message: formData.get('reason'),
        status: 'pending',
        user: `/users/${user.id}`,
        name: formData.get('name'),
        age: formData.get('age'),
        grade: formData.get('grade'),
        department: formData.get('department'),
        concerns: formData.get('concerns'),
        wellbeing: formData.get('wellbeing'),
        anxiety: formData.has('anxiety'),
        depression: formData.has('depression'),
        trauma: formData.has('trauma'),
        adhd: formData.has('adhd'),
        other: formData.has('other'),
        diagnosis: formData.get('diagnosis')
    };

    try {
        await db.collection('requests').add(data)
        alert("Your request has been submitted successfully!");
    } catch (e) {
        console.error("Error adding document: ", e);
        errorElement.innerText = e.message || "An error occurred. Please try again.";
        alert("There was an error submitting your request. Please try again.");
    }

})