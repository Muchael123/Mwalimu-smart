// https://mwalimu-smart.vercel.app/api/myLearning/update
// uid,learningId,state

import { MyLearning, MyLearningResponse } from "@/constants/LearningTypes";

export type State =  "correct" | "failed"

export default async function UpdateMyLearning(uid: string, learningId: string, state: State): Promise<MyLearning | null> {
    console.log("Updating learning data... for ", uid, learningId," And state is", state)
    const url = 'https://mwalimu-smart.vercel.app/api/myLearning/update'
    try {
        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uid, learningId, state }),
        });
       if (response.ok) {
            const data: MyLearningResponse = await response.json();
            return data.myLearning;
        }
        return null;
    } catch (error) {
        return null;
        console.error('Error:', error);
    }
}