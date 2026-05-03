import '../App.css'
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify";

const SignUpPage = () => {
    const [name, setname] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")

    const accountHandler = async() => {
        const signUpAuth = await fetch('https://major-project-3-backend.vercel.app/auth/signup',{
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({name, email, password})
        })

        const signUpData = await signUpAuth.json()
        toast.success("New Account created.");
       
    }
    return(
        <>
        <main className='signUp-bg'>
        <div className='loginPgCenter'>
            <p className='company-name loginPgCenter-brand'>Welcome to workasana</p>
            <p className="loginPgCenter-intro">Please fill the below details to create your account</p>
            <section className="loginPgCenter-fields">
                <div className='form-row'>
                    <label htmlFor="fullName">Full Name:</label>
                    <input className='box-format' type="text" id="fullName" placeholder='enter full name' value={name} onChange={(e) => setname(e.target.value)}/>
                </div>
                <div className='form-row'>
                    <label htmlFor="email">Email:</label>
                    <input className='box-format' type="email" placeholder='enter email' id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className='form-row'>
                    <label htmlFor="password">Password:</label>
                    <input className='box-format' type="text" id="password" placeholder='create password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <div className="loginPgCenter-actions">
                    <button className='btn' onClick={accountHandler} disabled={!name || !password || !email}>Create account</button>
                    <Link className='removeLine forALine loginPgCenter-backLink' to="/">Back to Sign In</Link>
                </div>
            </section>
        </div>
        </main>
        </>
    )
}

export default SignUpPage