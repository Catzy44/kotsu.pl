import { useEffect, useRef } from "react"
import * as THREE from "three"
import s from "./Root.module.scss"
import Background from "./panels/Background.jsx"
import {WelcomePageEl} from "./panels/WelcomePage.jsx"
import {ContactFormEl} from "./panels/ContactForm.jsx"




export function Root() {
  return (
    <div className={s.application_wrapper}>
        <Background/>
        <WelcomePageEl/>

        <div className={`relative z-50 w-full justify-center flex flex-col items-center`}>
            <div className={`max-w-4xl mb-40`}>
                <ContactFormEl/>
            </div>


            <footer className="pointer-events-none relative z-10 mx-auto flex w-full max-w-4xl flex-col justify-between gap-4 p-6 text-sm sm:flex-row sm:pb-32">
                <div className="flex flex-col"><span>Stworzono w środku nocy podczas nalotu Rosyjskich dronów.</span><span
                    className="opacity-75">© 2025 Kotsu</span></div>
                <div className="flex gap-2">
                    <button
                        className="text-purple-600 pointer-events-auto h-fit cursor-pointer rounded-lg text-[var(--theme)] underline decoration-dotted opacity-75 transition-all hover:decoration-solid hover:opacity-100"
                        type="button">Zostaw ślad
                    </button>
                    {/*<span className="opacity-75">•</span> <a*/}
                    {/*className="pointer-events-auto rounded-lg text-[var(--theme)] underline decoration-dotted opacity-75 transition-all hover:decoration-solid hover:opacity-100" target="_blank"*/}
                    {/*href="https://github.com/ariesclark/ariesclark.com?utm_source=ariesclark.com&amp;utm_medium=footer">View source</a>*/}
                </div>
            </footer>
        </div>
    </div>
  )
}
