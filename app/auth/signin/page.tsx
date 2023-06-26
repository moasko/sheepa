"use client";

import React, { useRef } from 'react';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { Divider } from 'antd';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

const SigninPage=()=> {
const username = useRef("");
const password = useRef("")


const handlSubmite = async()=>{
    const result = await signIn("credentials",{
        username:username.current,
        password:password.current,
        redirect:true,
        callbackUrl:"/admin"
    })
    console.log(result)
}

  return (
    <div className='w-full h-[100vh] bg-slate-300'>

      <section className="flex min-h-full overflow-hidden pt-16 sm:py-28">
        <div className="mx-auto w-[60%] rounded-xl bg-white flex gap-10 p-4">

          <div className="w-1/2 h-full flex flex-col justify-and bg-slate-100 relative p-8 overflow-hidden rounded-xl">
            <Image src={"/shipa_logo.png"} alt='ff' height={100} width={150}/>
            <div className='mt-20 mb-20'>
              <h1 className=' text-3xl font-bold'>Faites passer votre entreprise au niveau supérieur !</h1>
              <p className='mt-5 text-slate-500 font-semibold'>{"Vous êtes l'architecte de votre entreprise, et votre succès dépend de chaque décision que vous prenez."}</p>
            </div>
            <div className="w-full flex justify-center flex-col p-5 h-[250px] relative overflow-hidden bg-gray-800 rounded-xl">
              <p className='text-white text-[16px]'>{" N'attendez plus pour passer à l'action ! Connectez-vous en tant qu'administrateur dès maintenant et donnez vie à votre entreprise. L'avenir est entre vos mains, et nous sommes là pour vous accompagner à chaque étape de votre voyage vers le succès."} </p>
              <p className='text-slate-300 italic text-[14px] mt-5'> @__ moasko.dev __</p>
            </div>
          </div>

          <div className="w-1/2 h-full p-12">
            <h1 className="text-3xl font-bold text-black">{"S'identifier"}</h1>

            <p className="mt-3 text-md text-slate-400">
              Connectez-vous à votre compte
            </p>



            <div className="mt-16 space-y-8">
              <div>
                <label htmlFor='username' className="text-slate-500">Emali</label>
                <input onChange={(e)=>(username.current = e.target.value)} className="block border border-slate-300 rounded-lg p-4 w-full mt-2" type="email" id="username" placeholder='entrez votre psuedo ou email' />
              </div>
              <div>
                <label htmlFor='password' className="text-slate-500">Mot de passe</label>
                <input onChange={(e)=>(password.current = e.target.value)} className="block border border-slate-300 rounded-lg p-4 w-full mt-2" type='password' id="username" placeholder='entrez votre mot de passe' />
              </div>
              <button
              onClick={handlSubmite}
                className="w-full bg-blue-500 text-white p-3 text-md font-bold rounded-md mt-3"
              >
                Connexion
              </button>
            </div>
            <div className="mx-auto my-10 w-full">
              <Divider>Ou</Divider>
            </div>
            <GoogleSignInButton />
          </div>
        </div>
      </section>
    </div>

  );
}

export default SigninPage;
