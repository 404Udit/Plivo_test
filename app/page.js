"use client"


import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  let router=useRouter();
  return (
    <>
    <h1> This Is The Home Page</h1>
    <h2> Choose What You Want to Perform</h2>
    <button className="border rounded-2xl py-2 px-2 font-bold m-5" onClick={() => router.push('/Audio')}> Audio</button>
    <button className="border rounded-2xl py-2 px-2 font-bold m-5" onClick={() => router.push('/Image')}> Image</button>
    
    </>
  );
}
