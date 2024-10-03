import axios from 'axios'


export const getUserDetail = async (userId: number) =>{
    try{
        const response = await fetch(`/api/user/${userId}`);
  const data = await response.json();

  if (!response.ok) {
    console.error('Error fetching user details:', data.error);
    return null;
  }

  return data;

    }catch(err: any){
        console.error("error:", err);
        throw err;
    }
}


export const updateUserDetail = async (userId: number, updateData: any) =>{

  try{

    const response = await fetch(`/api/user/update-user/${userId}`, {
      method: 'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updateData)
    });

    if (!response.ok) {
      throw new Error('Failed to update user');
    }

    return await response.json();

  }catch(err){
    console.error("error:", err);
    throw err;
  }
}