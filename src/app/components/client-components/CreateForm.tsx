"use client"

import { useRouter } from 'next/navigation';
import { useState } from "react";
import { CleanSessionStorage } from '../server-components/dynamic-rendering/CleanSessionStorage';
import { CustomTextArea } from "../server-components/static-rendering/CustomTextArea";
import { PostCodeToReviewByAI } from "./PostCodeToReviewByAI";

interface CreateFormProps {
    taskDescription: string;
}

export function CreateForm({ taskDescription }: CreateFormProps) {
    CleanSessionStorage();

    const [context, setContext] = useState(taskDescription)
    const [code, setCode] = useState("")
    const [btnDisable, setBtnDisable] = useState(false)
    const router = useRouter()

    async function handleSubmit(event: any) {
        event.preventDefault();
        try {
            setBtnDisable(true)
            await PostCodeToReviewByAI({ context, code });
            router.push('/result')

        } catch (err) {
            console.log(err)
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="bg-slate-500 min-h-screen flex flex-col p-[16px_0_0_0]">
                <CustomTextArea
                    text={context}
                    setText={setContext}
                    placeHolder="Paste your task description here."
                />
                <CustomTextArea
                    text={code}
                    setText={setCode}
                    placeHolder="Paste your code here."
                />
                <button className="bg-gray-600 text-white  m-[0_16px_16px_16px]" type="submit" disabled={btnDisable}>Submit</button>
            </div>
        </form>
    );
}
