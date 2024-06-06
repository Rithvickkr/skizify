/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yL3qkdO19NZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import * as React from "react"
import { useState } from "react"
import { Label } from "../../../@/components/ui/label"
import { Input } from "../../../@/components/ui/input"
import { Textarea } from "../../../@/components/ui/textarea"
import { Button } from "../../../@/components/ui/button"
import { setform } from "../../lib/actions/setform";
import { useSession } from "next-auth/react";

export default function Component() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [education, setEducation] = useState('');
    const { data: session } = useSession();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
   const response = await setform(name, username, bio, education,session);
    if(response){
        window.alert("Profile created successfully")
        console.log(response)
        setName('')
        setUsername('')
        setBio('')
        setEducation('')
        console.log(response)
    }
    else
    
        window.alert("Profile creation failed")

    }
  return (
    <div className="shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 dark:bg-black md:rounded-2xl md:p-8">
      <div className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Create Your Profile</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" value={name} onChange={(e)=>{setName(e.target.value)}} placeholder="Enter your name" className="w-full" />
          </div>
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" type="text"   value={username} onChange={(e)=>{setUsername(e.target.value)}}  placeholder="Enter your username" className="w-full" />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" placeholder="Tell us about yourself"  value={bio} onChange={(e)=>{setBio(e.target.value)}}className="w-full" />
          </div>
          <div>
            <Label htmlFor="education">Education</Label>
            <Input id="education" type="text" value={education} onChange={(e)=>{setEducation(e.target.value)}}  placeholder="Enter your education details" className="w-full" />
          </div>
          <Button className="bg-black text-white dark:bg-white dark:text-black w-full" type="submit" onClick={handleSubmit} >
            Save Profile
          </Button>
        </form>
      </div>
    </div>
  )
}