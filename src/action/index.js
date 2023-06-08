export const userStateUpdate =(value) =>{
    return {
        type:'USERSTATEUPDATE',
        token:value.token,
        user:value.user
    };
};

export const userLogOut =() =>{
    return {
        type:'USERLOGOUT'
    };
};

