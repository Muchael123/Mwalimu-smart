import { LessonResponse } from "@/constants/LessonTypes";

const url = 'https://mwalimu-smart.vercel.app/api/lessons'
const GetLessons = async (): Promise<LessonResponse | null> => {
    console.log('Getting lessons...')
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GetLessons error: ', error)
        return null
    }
}
export default GetLessons;