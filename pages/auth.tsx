import Input from "@/components/input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from 'next-auth/react';

const Auth = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [veriant, setVeriant] = useState('login');

    const toggleVeriant = useCallback(() => {
        setVeriant((currentVeriant) => currentVeriant === 'login' ? 'register' : 'login');
    }, []);

    const login = useCallback(async () =>{
        try {
            await signIn('credentials', {
                email,
                password,
                callbackUrl: "/profile"
            });
            
        } catch (error) {
           console.log(error) 
        }
    }, [email, password]);

    const register = useCallback(async () => {
        try {
            await axios.post('/api/register', {
                email,
                name,
                password
            });
            login()
        } catch (error) {
            console.log(error)
        }
    }, [email, name, password]);
    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <div className='bg-black w-full h-full bg-opacity-50'>
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="logo" className="h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">{veriant === 'login' ? 'Sign in' : 'Register'}</h2>
                        <div className="flex flex-col gap-4">
                            {veriant === 'register' && (
                                <Input
                                    lable="username"
                                    onChange={(ev: any) => setName(ev.target.value)}
                                    id="name"
                                    type="text"
                                    value={name}
                                />
                            )}
                            <Input
                                lable="Email"
                                onChange={(ev: any) => setEmail(ev.target.value)}
                                id="email"
                                type="email"
                                value={email}
                            />
                            <Input
                                lable="Password"
                                onChange={(ev: any) => setPassword(ev.target.value)}
                                id="password"
                                type="password"
                                value={password}
                            />
                        </div>
                        <button onClick={veriant === 'login' ? login : register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {veriant === 'login' ? 'login' : 'Sign up'}
                        </button>
                        <p className="text-neutral-500 mt-12">
                            {veriant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVeriant} className="text-white ml-1 hover:underline cursor-pointer">
                                {veriant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;