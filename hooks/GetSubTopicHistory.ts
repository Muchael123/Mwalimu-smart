const url = 'https://mwalimu-smart.vercel.app/api/myLearning/history'

export default async function GetSubTopicHistory(id: string) {
    console.log('Getting subtopics...')
    try {
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
    } catch (error) {
    console.error('GetSubTopicHistory error: ', error)
    return null
    }
}
