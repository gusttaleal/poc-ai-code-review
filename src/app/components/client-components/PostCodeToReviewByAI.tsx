import { SaveOnSessionStorage } from "../server-components/dynamic-rendering/SaveOnSessionStorage";

interface PostCodeToReviewByAIProps {
    context?: string;
    code?: string;
}

interface ChatCompletion {
    id: string,
    object: string,
    created: number,
    model: string,
    choices: [
        {
            index: number,
            message: {
                role: string,
                content: string
            },
            finish_reason: string
        }
    ],
    usage: {
        prompt_tokens: number,
        completion_tokens: number,
        total_tokens: number
    }
}

export async function PostCodeToReviewByAI({ context, code }: PostCodeToReviewByAIProps): Promise<void> {
    const message: string = "Based on the business context, "
        + "conduct a code review of the provided code, "
        + "identifying issues, suggesting fixes, "
        + "in accordance with software development best practices.\n\n"
        + `- Business Context: ${context}\n\n- Provided Code:\n${code}`;

    const body = JSON.stringify({
        "model": "gpt-3.5-turbo",
        "messages": [{ "role": "user", "content": message }],
        "temperature": 0.5
    });

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`);

    const url = `${process.env.NEXT_PUBLIC_OPEN_AI_URL}`;
    const response = await fetch(url, {
        body,
        headers,
        method: "POST"
    });

    if (!response.ok) {
        console.log(JSON.stringify(response))
        throw new Error('Failed to fetch data')
    }

    const codeReview: ChatCompletion = await response.json();
    console.log(codeReview.choices[0].message.content);
    // const codeReview = await {
    //     choices: [{
    //         message: {
    //             content: `Code Review:

    // 1. Variable Declaration: 
    // The variable "list" is declared as a single number instead of an array. To create a list from 1 to 10, it should be declared as an array of numbers.

    // 2. Initialization:
    // The variable "list" is not initialized as an array before trying to access its elements. It should be initialized as an empty array before the loop.

    // 3. Loop Condition:
    // The loop condition is set to "i<10", which means the loop will run for 10 iterations. However, since arrays are zero-indexed, the loop condition should be "i<10" to ensure that the loop runs for 10 iterations and the array is filled with numbers from 1 to 10.

    // 4. Array Indexing:
    // Inside the loop, the code tries to access the elements of the "list" array using the index "i", but since "list" is not an array, this will result in an error. The code should use the "push" method to add elements to the array instead.

    // 5. Element Assignment:
    // The code tries to assign the value of "i+1" to the "list" array, but since the array is not initialized, this will result in an error. The code should use the "push" method to add elements to the array instead.

    // 6. Variable Type:
    // The variable "i" is declared as an "int" which is not a valid type in JavaScript. It should be declared as "let" instead.

    // 7. Code Formatting:
    // The code lacks proper indentation, making it difficult to read and understand. It should be properly indented for better readability.

    // Suggested Fix:

    // \`\`\`javascript
    // let list: number[] = [];
    // for(let i=0; i<10; i++){
    //     list.push(i+1);
    // }
    // \`\`\`

    // In this fixed code, the "list" variable is declared as an empty array before the loop. Inside the loop, the "push" method is used to add elements to the array. The loop condition is set to "i<10" to ensure that the loop runs for 10 iterations and the array is filled with numbers from 1 to 10. The variable "i" is declared as "let" and the code is properly indented for better readability.` }
    //     }]
    // }
    SaveOnSessionStorage({ key: "openAIAPIResponse", value: JSON.stringify(codeReview) })
    SaveOnSessionStorage({ key: "codeReview", value: codeReview.choices[0].message.content })
}
