import { ChatTypes, ContentMessageType, FriendRequestStatusType, MessageStatusType, MessageTypesPopulated, ResponseType, UserTypes } from "../../types/types";


// User APIs
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
export const removeFriend = async(removeFriendFormData:{friendUserID:string;}) => {
    try {
        const removeFriendRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(removeFriendFormData)
        });

        const removeFriendData = await removeFriendRes.json();

        console.log("----- removeFriend  api.ts");
        console.log(removeFriendData);
        console.log("----- removeFriend  api.ts");

        return removeFriendData as ResponseType<UserTypes[]>;
    } catch (error) {
        console.log("----- removeFriend  api.ts");
        console.log(error);
        console.log("----- removeFriend  api.ts");
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
export const selectedChatMessages = async(selectedChatMessagesFromData:{chatID:string;}) => {
    try {
        const selectedChatMessagesRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/selected_chat`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(selectedChatMessagesFromData)
        });

        const selectedChatMessagesData = await selectedChatMessagesRes.json();

        console.log("----- selectedChatMessages api.ts");
        console.log(selectedChatMessagesData);
        console.log("----- selectedChatMessages api.ts");

        return selectedChatMessagesData as  ResponseType<MessageTypesPopulated[]>
        
    } catch (error) {
        console.log("----- selectedChatMessages api.ts");
        console.log(error);
        console.log("----- selectedChatMessages api.ts");
        return error as  ResponseType<Error>
    }
}
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

// Message APIs
export const createMessage = async(createMessageFormData:{sender:string; chatID:string; content:string; attachment:string[]; messageType:ContentMessageType; messageStatus:MessageStatusType;}) => {
    try {
        const createMessageRes = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/message/new`, {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(createMessageFormData)
        });

        const createMessageData = await createMessageRes.json();

        console.log("----- createMessage api.ts");
        console.log(createMessageData);        
        console.log("----- createMessage api.ts");
        return createMessageData as ResponseType<MessageTypesPopulated>;
    } catch (error) {
        console.log("----- createMessage api.ts");
        console.log(error);
        console.log("----- createMessage api.ts");
        return error as ResponseType<Error>;
    }
};
export const deleteMessagesForMe = async(deleteForMeFormData:{messageID:string[]}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/message/delete-for-me`, {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(deleteForMeFormData)
        });

        const resolved = await res.json();

        console.log("----- deleteMessagesForMe api.ts");
        console.log(resolved);        
        console.log("----- deleteMessagesForMe api.ts");
        return resolved as ResponseType<string[]>;
    } catch (error) {
        console.log("----- deleteMessagesForMe api.ts");
        console.log(error);
        console.log("----- deleteMessagesForMe api.ts");
        return error as ResponseType<Error>;
    }
};
export const deleteMessagesForAll = async(deleteForAllFormData:{messageID:string[]; chatID:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/message/delete-for-all`, {
            method:"DELETE",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(deleteForAllFormData)
        });

        const resolved = await res.json();

        console.log("----- deleteMessagesForAll api.ts");
        console.log(resolved);        
        console.log("----- deleteMessagesForAll api.ts");
        return resolved as ResponseType<string[]>;
    } catch (error) {
        console.log("----- deleteMessagesForAll api.ts");
        console.log(error);
        console.log("----- deleteMessagesForAll api.ts");
        return error as ResponseType<Error>;
    }
};
