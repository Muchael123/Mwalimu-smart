
const AddUserToDb = (user: string, id: string) => {
   const userin = search(user, id);
   console.log(userin);
}

const search = async (user: string, id:string) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if(response.status === 404) {
        AddUser(user, id);
    }
    const data = await response.json();
    console.log(data);
    return data;
}
const AddUser = async (user: string, id:string) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify({
            id: id,
            email: user,
        }),
    });
    const data = await response.json();
    console.log(data);
    return data;
}

