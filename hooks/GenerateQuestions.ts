import { MyLearning, MyLearningResponse } from "@/constants/LearningTypes"

const url = 'https://mwalimu-smart.vercel.app/api/myLearning'

export default async function GenerateQuestions(id: string, uid: string): Promise<MyLearning | null> {
   try{
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({subTopicId: id, uid: uid}),
    })

    console.log(res)
    if (res.ok){
        const data: MyLearningResponse = await res.json()
        return data.myLearning
    }
    else{
        return null
    }
   }catch(err){
         console.log(err)
         return null
   }
}