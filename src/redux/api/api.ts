import { ChatTypes, ResponseType, UserTypes } from "../../types/types";



export const getMyChats = async() => {
    try {
        const myChatsRes = await fetch("http://localhost:8000/api/v1/chat/my_chats", {
            method:"GET",
            credentials:"include"
        });

        const myChatsData = await myChatsRes.json();

        console.log("----- getMyChats  api.ts");
        console.log(myChatsData);
        console.log("----- getMyChats  api.ts");
        return myChatsData as ResponseType<ChatTypes[]>;
    } catch (error) {
        console.log("----- getMyChats  api.ts");
        console.log(error);
        console.log("----- getMyChats  api.ts");
        return error as ResponseType<Error>;
    }
};
export const register = async(registerFormData:{name:string; email:string; password:string; gender:string; mobile:string;}):Promise<ResponseType<UserTypes|Error>> => {
    try {
        const loginRes = await fetch("http://localhost:8000/api/v1/user/new", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(registerFormData)
        });

        const registerData:unknown = await loginRes.json();

        console.log("----- register  api.ts");
        console.log(registerData);
        console.log("----- register  api.ts");
        return registerData as ResponseType<UserTypes>;
    } catch (error) {
        console.log("----- register  api.ts");
        console.log(error);
        console.log("----- register  api.ts");
        return error as ResponseType<Error>;
    }
};
export const login = async(loginFormData:{email:string; password:string;}):Promise<ResponseType<UserTypes|Error>> => {
    try {
        const loginRes = await fetch("http://localhost:8000/api/v1/user/login", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(loginFormData)
        });

        const loginData:unknown = await loginRes.json();

        console.log("----- login  api.ts");
        console.log(loginData);
        console.log("----- login  api.ts");
        return loginData as ResponseType<UserTypes>;
    } catch (error) {
        console.log("----- login  api.ts");
        console.log(error);
        console.log("----- login  api.ts");
        return error as ResponseType<Error>;
    }
};
export const myProfile = async() => {
    try {
        const myProfileRes = await fetch("http://localhost:8000/api/v1/user/me", {
            method:"GET",
            credentials:"include"
        });

        const myProfileData = await myProfileRes.json();

        console.log("----- getMyProfile  api.ts");
        console.log(myProfileData);
        console.log("----- getMyProfile  api.ts");
        return myProfileData as ResponseType<UserTypes>;
    } catch (error) {
        console.log("----- getMyProfile  api.ts");
        console.log(error);
        console.log("----- getMyProfile  api.ts");
        return error as ResponseType<Error>;
    }
};