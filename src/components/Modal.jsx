import { useState } from 'react';
import { app } from '../firebase/client';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Modal = ({ user }) => {
    const [formData, setFormData] = useState({
        name: user.displayName || '',
        age: '',
        grade: '',
        school: '',
        email: user.email || '',
        reason: '',
        concerns: '',
        wellbeing: '',
        anxiety: false,
        depression: false,
        trauma: false,
        adhd: false,
        other: false,
        diagnosis: ''
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const db = getFirestore(app);
        const timestamp = serverTimestamp();

        const message = `Name: ${formData.name}\nAge: ${formData.age}\nGrade: ${formData.grade}\nSchool: ${formData.school}\nEmail: ${formData.email}\nReason for Seeking Consultation: ${formData.reason}\nConcerns: ${formData.concerns}\nEmotional State: ${formData.wellbeing}\nDiagnosed Conditions: ${formData.diagnosis}`;
        
        const medicalInfo = {
            anxiety: formData.anxiety,
            depression: formData.depression,
            trauma: formData.trauma,
            adhd: formData.adhd,
            other: formData.other
        };

        const requestData = {
            message: message,
            status: 'pending',
            user: `/users/${user.uid}`,
            acceptedCounsellor: null, // Initially set to null since it's pending
            createdAt: timestamp,
            medicalInfo: medicalInfo
        };

        try {
            const docRef = await addDoc(collection(db, 'requests'), requestData);
            if (docRef) {
                console.log(docRef.id);
                window.location.href = `/consult?requestId=${docRef.id}`;
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div
            id="popup-modal"
            className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-xl max-h-full">
                <button
                    type="button"
                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center m-4"
                    onClick={() => (document.getElementById('popup-modal').style.display = 'none')}>
                    <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
                <div className="w-full max-w-2xl mx-auto p-6 sm:p-10 bg-white rounded-lg shadow-lg">
                    <h2 className="text-3xl mb-6 text-center">Mental Health Consultation</h2>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <input
                                    value={formData.name}
                                    onChange={handleChange}
                                    id="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Enter your name"
                                    required
                                    type="text"
                                    name="name"
                                />
                            </div>
                            <div>
                                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                    Age
                                </label>
                                <input
                                    value={formData.age}
                                    onChange={handleChange}
                                    id="age"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Enter your age"
                                    required
                                    type="number"
                                    name="age"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
                                    Grade Level
                                </label>
                                <input
                                    value={formData.grade}
                                    onChange={handleChange}
                                    id="grade"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Enter your grade level"
                                    required
                                    type="text"
                                    name="grade"
                                />
                            </div>
                            <div>
                                <label htmlFor="school" className="block text-sm font-medium text-gray-700">
                                    School Name
                                </label>
                                <input
                                    value={formData.school}
                                    onChange={handleChange}
                                    id="school"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                    placeholder="Enter your school name"
                                    required
                                    type="text"
                                    name="school"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                value={formData.email}
                                onChange={handleChange}
                                id="email"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Enter your email address"
                                required
                                type="email"
                                name="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
                                Reason for Seeking Consultation
                            </label>
                            <textarea
                                value={formData.reason}
                                onChange={handleChange}
                                id="reason"
                                name="reason"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Briefly describe the reason for your consultation"
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Please describe your specific concerns and mental/emotional wellbeing:
                            </label>
                            <div className="mt-4 space-y-4">
                                <div>
                                    <label htmlFor="concerns" className="block text-sm font-medium text-gray-700">
                                        Concerns
                                    </label>
                                    <textarea
                                        value={formData.concerns}
                                        onChange={handleChange}
                                        id="concerns"
                                        name="concerns"
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="Do you have a specific concern you'd like to talk about? If yes, please briefly describe"
                                        required
                                    ></textarea>
                                </div>
                                <div>
                                    <label htmlFor="wellbeing" className="block text-sm font-medium text-gray-700">
                                        Emotional State
                                    </label>
                                    <textarea
                                        value={formData.wellbeing}
                                        onChange={handleChange}
                                        id="wellbeing"
                                        name="wellbeing"
                                        rows="3"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                        placeholder="Briefly tell us about how you feel and the thoughts that have bothered you lately."
                                        required
                                    ></textarea>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Have you experienced any of the following?
                            </label>
                            <div className="mt-4 space-y-2">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="anxiety"
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded-md"
                                            type="checkbox"
                                            name="anxiety"
                                            checked={formData.anxiety}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="anxiety" className="font-medium text-gray-700">
                                            Anxiety
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="depression"
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded-md"
                                            type="checkbox"
                                            name="depression"
                                            checked={formData.depression}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="depression" className="font-medium text-gray-700">
                                            Depression
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="trauma"
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded-md"
                                            type="checkbox"
                                            name="trauma"
                                            checked={formData.trauma}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="trauma" className="font-medium text-gray-700">
                                            Trauma
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="adhd"
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded-md"
                                            type="checkbox"
                                            name="adhd"
                                            checked={formData.adhd}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="adhd" className="font-medium text-gray-700">
                                            ADHD
                                        </label>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="other"
                                            className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300 rounded-md"
                                            type="checkbox"
                                            name="other"
                                            checked={formData.other}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="other" className="font-medium text-gray-700">
                                            Other
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">
                                Have you been previously diagnosed with any mental health conditions?
                            </label>
                            <textarea
                                value={formData.diagnosis}
                                onChange={handleChange}
                                id="diagnosis"
                                name="diagnosis"
                                rows="3"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                                placeholder="Describe any previous mental health diagnoses"
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-dark hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
