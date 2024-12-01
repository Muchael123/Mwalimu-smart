import { SubjectResponse } from "@/constants/Types";

const url = 'https://mwalimu-smart.vercel.app/api/subjects'

export default async function GetLevelSubjects(id: string): Promise<SubjectResponse | null> {
 console.log('Getting subjects...')
    try {
    const response = await fetch(`${url}/${id}`);
    const data:SubjectResponse = await response.json();
    return data;
    } catch (error) {
    console.error('GetLevelSubjects error: ', error)
    return null
    }
}