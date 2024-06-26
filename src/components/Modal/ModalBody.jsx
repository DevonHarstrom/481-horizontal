import React, { useEffect } from 'react'


function ModalBody({ children, header, description, photo, onClose, title }) {
    useEffect(() => {
        console.log(photo);

    })

    return (
        <>
            {/* Topbar */}
            < div className='absolute top-0 w-full flex justify-between text-gray-300 p-4 pt-2' >
                {title ? <p className='bg-zinc-50 rounded-lg py-[0.5px] px-2'>{title}</p> : <div></div>}
                <button
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 drop-shadow hover:text-red-500 text-gray-400 transition-all duration-200">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </button>
            </div >

            {/* Video */}
            {photo &&
                < video key={photo} className={`rounded-xl rounded-b-none object-cover`} autoPlay loop muted><source type="video/mp4" src={photo}></source></video >
            }

            {/* Description */}
            < div className='flex flex-col gap-4 p-8 border-b-4 border-red-500' >
                {/* < div className='flex flex-col gap-2 p-8' > */}
                <p className='text-gray-800 text-xl font-semibold'>{header}</p>
                <div className='flex flex-col gap-1'>
                    <span className='text-gray-700 flex flex-row'>
                        {description}
                    </span>
                    {children}
                </div>
            </div >
        </>
    )
}

export default ModalBody