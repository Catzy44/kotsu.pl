import s from "./ContactForm.module.scss"
import {SocialButtonsEl} from "../components/SocialButtons.jsx";
import {useState} from "react";
export function ContactFormEl(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [content, setContent] = useState("")

    function send() {
        fet("client_messages", {
            method: "POST",
            body: {
                name: name,
                email: email,
                content: content
            }
        })
    }

    return <div>
        <div className={`text-center mb-10`}>
            <span>Skontaktuj się!</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                 className="lucide lucide-move-down mx-auto mt-4 size-4 animate-bounce" aria-hidden="true">
                <path d="M8 18L12 22L16 18"></path>
                <path d="M12 2V22"></path>
            </svg>
        </div>

        <div className={`flex flex-col gap-5 relative`}>
            <div className="pointer-events-auto flex flex-col gap-x-3 gap-y-4 absolute -left-15 top-1/2 -translate-y-1/2">{<SocialButtonsEl/>}</div>

            <div className={`flex gap-5 text-white`}>
                <div className={s.inputContainer}>
                    <span>Imie</span>
                    <input required="" autoCapitalize="" autoComplete="name"
                           className="border-white/2 pointer-events-auto w-full rounded-lg border bg-black/20 px-4 py-2 backdrop-blur placeholder:text-white/75 focus-within:outline-0 hover:border-white/10"
                           placeholder="Anonim..." onChange={(e) => setName(e.target.value)} value={name}/>
                </div>

                <div className={s.inputContainer}>
                    <div><span>Email</span> <span className={`decoration-dotted text-purple-600 text-sm`}>*wymagane</span></div>
                    <input required="" autoCapitalize="" autoComplete="name"
                           className="border-white/2 pointer-events-auto w-full rounded-lg border bg-black/20 px-4 py-2 backdrop-blur placeholder:text-white/75 focus-within:outline-0 hover:border-white/10"
                           placeholder="to@ja.pl..." onChange={(e) => setEmail(e.target.value)} value={email}/>
                </div>
            </div>
            <div className={s.inputContainer}>
                <div><span>Wiadomość</span> <span className={`decoration-dotted text-purple-600 text-sm`}>*wymagane</span></div>
                <textarea name="message" required="" autoCorrect=""
                          className="border-white/2 pointer-events-auto w-full rounded-lg border bg-black/20 px-4 py-2 backdrop-blur placeholder:text-white/75
                      focus-within:outline-0 hover:border-white/10"
                          placeholder="Wpisz wiadomość..." rows="4" onChange={(e) => setContent(e.target.value)} value={content}></textarea>
            </div>
            <button className="pointer-events-auto w-full cursor-pointer rounded-lg bg-white px-4 py-2 font-medium text-black backdrop-blur transition-all hover:scale-[1.02] active:scale-[.97] disabled:scale-100 disabled:opacity-75"
                    type="submit" onClick={send}>Wyślij prywatną wiadomość
            </button>
        </div>
    </div>
}

function fixAddr(adr) {
    return host+adr
}
export function ShowContactForm() {
    window.scrollTo({left: 0, top:document.body.scrollHeight, behavior: "smooth"})
}

let host = "https://kotsu.pl/api/";

function getSID() {
    return ""
}

function fet(address,options = null,decodejson = true) {
    const isFormData = options == null || options.body == null ? false : options.body instanceof FormData

    let default_headers = isFormData ? {} : {"Content-Type":"application/json"};
    if (typeof getSID != 'undefined') {
        default_headers["Authorization"] = "Bearer "+getSID();
    }

    if(options == null) {
        options = {method:"GET",headers:default_headers};
    } else {
        if(options["headers"] == null) {
            options["headers"] = {};
        }
        const provided_options_keys = Object.keys(options["headers"]);
        Object.keys(default_headers).forEach(default_headers_key=>{
            if(!(default_headers_key in provided_options_keys)) {
                options["headers"][default_headers_key] = default_headers[default_headers_key];
            }
        })
        if(!isFormData) {
            if (options['body'] != null && typeof options['body'] === 'object') {
                options['body'] = JSON.stringify(options['body'])
            }
        }
    }

    let rprp = fetch(fixAddr(address),options);

    rprp = rprp.then(function(response) {
        // first then()
        if(response.ok){
            return response.text();
        }
        if(response.status == 401) {
            location.reload();
            throw new Error(`${response.status}`);
        }
        throw new Error(`${response.status}`);
    })

    return rprp.then((res)=>{
        try {
            return JSON.parse(res.toString())
        } catch (e) {
            return res.toString()
        }
    })
}