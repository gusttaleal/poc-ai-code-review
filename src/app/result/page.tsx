"use client"
import { GetOfSessionStorage } from "../components/server-components/dynamic-rendering/GetOfSessionStorage";

export default function ResultPage() {
    const data = GetOfSessionStorage({ key: "codeReview" })

    return (
        <div className="m-4 max-w-4xl break-all">
            <pre className="max-w-4xl break-all">
                <code className="max-w-4xl break-all">
                    {data}
                </code>
            </pre>
        </div>
    );
}
