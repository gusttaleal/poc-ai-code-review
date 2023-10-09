export interface GetTaskDescriptionFromJiraProps {
    jiraKey?: string
}

export interface GetTaskDescriptionFromJiraResponse {
    fields: { description: string }
}

export async function GetTaskDescriptionFromJira({ jiraKey }: GetTaskDescriptionFromJiraProps): Promise<string> {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `${process.env.NEXT_PUBLIC_JIRA_AUTH_TOKEN}`);

    const url = `${process.env.NEXT_PUBLIC_JIRA_URL}/${jiraKey}`;

    const response = await fetch(url, { headers, method: "GET", cache: "no-store" });

    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }

    const data: GetTaskDescriptionFromJiraResponse = await response.json();
    return data.fields.description;
}