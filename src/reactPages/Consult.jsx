import { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import animationData from '../../lotties/loading-animation.json'

function ConsultPage() {
    let [isSearching, setIsSearching] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsSearching(false), 5000)
    }, [])


    return (
        isSearching ?
            <div className="py-12 mx-auto text-center md:pt-16">
                <Player
                    autoplay
                    loop
                    src={animationData}
                    className="w-full max-h-[500px] max-w-[500px]"
                />
                <p className="mt-5 text-sm md:text-lg">Searching for available doctors...</p>
            </div> :

            <>
                <div className="fixed inset-0 z-50 bg-black/80 animate-in fade-in-0" data-aria-hidden="true" aria-hidden="true" ></div>
                <div role="dialog" id="radix-:r3:" data-state="open" className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 animate-in fade-in-0 zoom-in-95 slide-in-from-left-1/2 slide-in-from-top-[48%] sm:rounded-lg sm:max-w-[425px] bg-white" tabindex="-1" >
                    <div className="grid gap-6 p-6">
                        <div className="flex items-center gap-4">
                            <img
                                alt="Consultant"
                                className="rounded-full"
                                height={80}
                                src="https://avatar.iran.liara.run/public/job/doctor/male"
                                style={{
                                    aspectRatio: "80/80",
                                    objectFit: "cover",
                                }}
                                width={80}
                            />
                            <div>
                                <h3 className="text-xl font-semibold">Jane Doe</h3>
                                <p className="text-gray-500 dark:text-gray-400">Senior Medical Consultant</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <Button>
                                <ContactIcon className="mr-2 h-4 w-4" />
                                Chat
                            </Button>
                            <Button>
                                <PhoneIcon className="mr-2 h-4 w-4" />
                                Call
                            </Button>
                        </div>
                    </div>
                </div>
            </>
    )
}

export default ConsultPage;

function Button(props) {
    return (
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
            {props.children}
        </button>
    )
}

function ContactIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <circle cx="12" cy="10" r="2" />
            <line x1="8" x2="8" y1="2" y2="4" />
            <line x1="16" x2="16" y1="2" y2="4" />
        </svg>
    )
}


function PhoneIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
    )
}
