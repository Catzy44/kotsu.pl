import {SocialButtonsEl} from "../components/SocialButtons.jsx";
import {ShowContactForm} from "./ContactForm.jsx";

export function WelcomePageEl(props) {
    return <div className={`h-screen w-full select-none`}>
        <div className={`z-100 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-8 whitespace-nowrap flex-wrap justify-start content-start`}>
            <span className={`text-6xl pt-2`}>🦴</span>
            <div className={`flex flex-col gap-5`}>
                <div>
                    <div className={`flex flex-col`}>
                        <span className={`text-2xl`}>Kotsu Software</span>
                        <span>Tworzę dynamiczne i dopracowane oprogramowanie</span>
                        <span>
                        <span className={`underline decoration-dotted text-purple-600 cursor-pointer`} onClick={ShowContactForm}>Wyślij wiadomość</span>
                        , albo <span className={`underline decoration-dotted text-purple-600 cursor-pointer`} onClick={ShowContactForm}>zostaw ślad</span>?
                    </span>
                    </div>
                </div>
                <div className="pointer-events-auto flex gap-x-3 gap-y-4">{<SocialButtonsEl/>}</div>
            </div>
        </div>
    </div>
}