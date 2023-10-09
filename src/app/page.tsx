import { CreateForm } from "./components/client-components/CreateForm";
import { GetTaskDescriptionFromJira } from "./components/server-components/dynamic-rendering/GetTaskDescriptionFromJira";

interface PageProps {
  searchParams: { [key: string]: string };
}

export default async function Home({ searchParams }: PageProps) {
  try {
    const jiraKey = searchParams["jira-key"];
    const value = await GetTaskDescriptionFromJira({ jiraKey })
    return (
      <CreateForm taskDescription={value} />
    )
  } catch (err) {
    return <> Try a valid path</>
  }
}
