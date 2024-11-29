const url = 'https://mwalimu-smart.vercel.app/api/learner'
export async function AddUserToDB (email: string, id: string ): Promise<string | null> {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:email, uid: id}),
        });
        const data = response.status;
        console.log('data', data)
        if(data === 201){
            return 'User added to DB'
        }
        return 'Failed to add user to DB'
    } catch (error) {
        return null;
        console.error('Error:', error);
    }

}