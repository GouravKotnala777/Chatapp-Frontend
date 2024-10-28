import { ChatTypes, FriendRequestStatusType, ResponseType, UserTypes } from "../../types/types";



export const getMyChats = async() => {
    try {
        const myChatsRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/my_chats`, {
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
        const loginRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/new`, {
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
        const loginRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, {
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
        const myProfileRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/me`, {
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
export const myFriends = async() => {
    try {
        const myFriendsRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends`, {
            method:"GET",
            credentials:"include"
        });

        const myFriendsData = await myFriendsRes.json();

        console.log("----- myFriends  api.ts");
        console.log(myFriendsData);
        console.log("----- myFriends  api.ts");

        return myFriendsData as ResponseType<UserTypes[]>;
    } catch (error) {
        console.log("----- myFriends  api.ts");
        console.log(error);
        console.log("----- myFriends  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const searchUser = async(searchUserFormData:{searchQuery:string;}) => {
    try {
        const searchUserRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/search`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(searchUserFormData)
        });

        const searchUserData = await searchUserRes.json();

        console.log("----- searchUser  api.ts");
        console.log(searchUserData);
        console.log("----- searchUser  api.ts");

        return searchUserData as ResponseType<UserTypes[]>;
    } catch (error) {
        console.log("----- searchUser  api.ts");
        console.log(error);
        console.log("----- searchUser  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const allReceivedFriendRequests = async() => {
    try {
        const allReceivedFriendRequestsRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends_request`, {
            method:"GET",
            credentials:"include"
        });

        const allReceivedFriendRequestsData = await allReceivedFriendRequestsRes.json();

        console.log("----- allReceivedFriendRequests  api.ts");
        console.log(allReceivedFriendRequestsData);
        console.log("----- allReceivedFriendRequests  api.ts");

        return allReceivedFriendRequestsData as ResponseType<{_id:string; name:string; email:string; date:Date;}[]>;
    } catch (error) {
        console.log("----- allReceivedFriendRequests  api.ts");
        console.log(error);
        console.log("----- allReceivedFriendRequests  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const sendFriendRequest = async(sendFriendRequestFormData:{searchedUserIDArray:string[];}) => {
    try {
        const sendFriendRequestRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends_request`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(sendFriendRequestFormData)
        });

        const sendFriendRequestData = await sendFriendRequestRes.json();

        console.log("----- sendFriendRequest  api.ts");
        console.log(sendFriendRequestData);
        console.log("----- sendFriendRequest  api.ts");

        return sendFriendRequestData as ResponseType<string>;
    } catch (error) {
        console.log("----- sendFriendRequest  api.ts");
        console.log(error);
        console.log("----- sendFriendRequest  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const replyFriendRequest = async(replyFriendRequestFormData:{friendRequestID:string; status:FriendRequestStatusType;}) => {
    try {
        const replyFriendRequestRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends_request`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(replyFriendRequestFormData)
        });

        const replyFriendRequestData = await replyFriendRequestRes.json();

        console.log("----- replyFriendRequest  api.ts");
        console.log(replyFriendRequestData);
        console.log("----- replyFriendRequest  api.ts");

        return replyFriendRequestData as ResponseType<string>;
    } catch (error) {
        console.log("----- replyFriendRequest  api.ts");
        console.log(error);
        console.log("----- replyFriendRequest  api.ts");
        return error as ResponseType<Error>;        
    }
};

// Chat APIs
export const createChat = async(newChatFormData:{chatName:string; members?:string[]; description:string; isGroupChat:boolean;}) => {
    try {
        const createChatRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/new`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(newChatFormData)
        });

        const createChatData = await createChatRes.json();

        console.log("----- createChat  api.ts");
        console.log(createChatData);
        console.log("----- createChat  api.ts");
        return createChatData as ResponseType<ChatTypes>;
    } catch (error) {
        console.log("----- createChat  api.ts");
        console.log(error);
        console.log("----- createChat  api.ts");
        return error as ResponseType<Error>;
    }
};
export const updateChat = async(updateChatFromData:{chatID:string; members:string[];}) => {
    try {
        const updatedChatRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/selected_chat`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(updateChatFromData)
        });

        const updatedChatData = await updatedChatRes.json();

        console.log("----- updateChat api.ts");
        console.log(updatedChatData);
        console.log("----- updateChat api.ts");

        return updatedChatData as  ResponseType<ChatTypes>
        
    } catch (error) {
        console.log("----- updateChat api.ts");
        console.log(error);
        console.log("----- updateChat api.ts");
        return error as  ResponseType<Error>
    }
}
export const removeMembersFromChat = async(removeMembersFromChatFromData:{chatID:string; members:string[];}) => {
    try {
        const updatedChatRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/remove_members`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(removeMembersFromChatFromData)
        });

        const updatedChatData = await updatedChatRes.json();

        console.log("----- removeMembersFromChat api.ts");
        console.log(updatedChatData);
        console.log("----- removeMembersFromChat api.ts");

        return updatedChatData as  ResponseType<ChatTypes>
        
    } catch (error) {
        console.log("----- removeMembersFromChat api.ts");
        console.log(error);
        console.log("----- removeMembersFromChat api.ts");
        return error as  ResponseType<Error>
    }
}
export const deleteChat = async(deleteChatFormData:{chatID:string;}) => {
    try {
        const deleteChatRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/selected_chat`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(deleteChatFormData)
        });

        const deleteChatData = await deleteChatRes.json();

        console.log("----- deleteChat api.ts");
        console.log(deleteChatData);
        console.log("----- deleteChat api.ts");

        return deleteChatData as  ResponseType<ChatTypes>
    } catch (error) {
        console.log("----- deleteChat api.ts");
        console.log(error);
        console.log("----- deleteChat api.ts");
        return error as  ResponseType<Error>
    }
};
//export const singleChatMembers = async() => {
//    try {
//        const updatedChatRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/remove_members`, {
//            method:"PUT",
//            headers:{
//                "Content-Type":"application/json"
//            },
//            credentials:"include",
//            body:JSON.stringify(removeMembersFromChatFromData)
//        });

//        const updatedChatData = await updatedChatRes.json();

//        console.log("----- removeMembersFromChat api.ts");
//        console.log(updatedChatData);
//        console.log("----- removeMembersFromChat api.ts");

//        return updatedChatData as  ResponseType<ChatTypes>
        
//    } catch (error) {
//        console.log("----- removeMembersFromChat api.ts");
//        console.log(error);
//        console.log("----- removeMembersFromChat api.ts");
//        return error as  ResponseType<Error>
//    }
//}
