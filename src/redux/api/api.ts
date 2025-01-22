import { ChatTypes, ContentMessageType, FriendRequestStatusType, MessageStatusType, MessageTypesPopulated, ResponseType, UserTypes } from "../../types/types";


// User APIs
export const getMyChats = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/my_chats`, {
            method:"GET",
            credentials:"include"
        });

        const data = await res.json();

        console.log("----- getMyChats  api.ts");
        console.log(data);
        console.log("----- getMyChats  api.ts");
        return data as ResponseType<ChatTypes[]>;
    } catch (error) {
        console.log("----- getMyChats  api.ts");
        console.log(error);
        console.log("----- getMyChats  api.ts");
        return error as ResponseType<Error>;
    }
};
export const register = async(registerFormData:{name:string; email:string; password:string; gender:string; mobile:string;}):Promise<ResponseType<string|Error>> => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/new`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(registerFormData)
        });

        const data = await res.json();

        console.log("----- register  api.ts");
        console.log(data);
        console.log("----- register  api.ts");
        return data as ResponseType<typeof data.jsonData>;
    } catch (error) {
        console.log("----- register  api.ts");
        console.log(error);
        console.log("----- register  api.ts");
        return error as ResponseType<Error>;
    }
};
export const login = async(loginFormData:{email:string; password:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(loginFormData)
        });

        const data = await res.json();

        console.log("----- login  api.ts");
        console.log(data);
        console.log("----- login  api.ts");
        return data as ResponseType<UserTypes>;
    } catch (error) {
        console.log("----- login  api.ts");
        console.log(error);
        console.log("----- login  api.ts");
        return error as ResponseType<Error>;
    }
};
export const myProfile = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/me`, {
            method:"GET",
            credentials:"include"
        });

        const data = await res.json();

        console.log("----- getMyProfile  api.ts");
        console.log(data);
        console.log("----- getMyProfile  api.ts");
        return data as ResponseType<UserTypes>;
    } catch (error) {
        console.log("----- getMyProfile  api.ts");
        console.log(error);
        console.log("----- getMyProfile  api.ts");
        return error as ResponseType<Error>;
    }
};
export const myFriends = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends`, {
            method:"GET",
            credentials:"include"
        });

        const data = await res.json();

        console.log("----- myFriends  api.ts");
        console.log(data);
        console.log("----- myFriends  api.ts");
        return data as ResponseType<UserTypes[]>;
    } catch (error) {
        console.log("----- myFriends  api.ts");
        console.log(error);
        console.log("----- myFriends  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const searchUser = async(searchUserFormData:{searchQuery:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/search`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(searchUserFormData)
        });

        const data = await res.json();

        console.log("----- searchUser  api.ts");
        console.log(data);
        console.log("----- searchUser  api.ts");
        return data as ResponseType<UserTypes[]>;
    } catch (error) {
        console.log("----- searchUser  api.ts");
        console.log(error);
        console.log("----- searchUser  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const allReceivedFriendRequests = async() => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends_request`, {
            method:"GET",
            credentials:"include"
        });

        const data = await res.json();

        console.log("----- allReceivedFriendRequests  api.ts");
        console.log(data);
        console.log("----- allReceivedFriendRequests  api.ts");
        return data as ResponseType<{_id:string; from:{_id:string; name:string; email:string;}; to:{_id:string; name:string; email:string;}; date:Date;}[]>;
    } catch (error) {
        console.log("----- allReceivedFriendRequests  api.ts");
        console.log(error);
        console.log("----- allReceivedFriendRequests  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const sendFriendRequest = async(sendFriendRequestFormData:{searchedUserIDArray:string[];}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends_request`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(sendFriendRequestFormData)
        });

        const data = await res.json();

        console.log("----- sendFriendRequest  api.ts");
        console.log(data);
        console.log("----- sendFriendRequest  api.ts");
        return data as ResponseType<string>;
    } catch (error) {
        console.log("----- sendFriendRequest  api.ts");
        console.log(error);
        console.log("----- sendFriendRequest  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const replyFriendRequest = async(replyFriendRequestFormData:{friendRequestID:string; status:FriendRequestStatusType;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends_request`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(replyFriendRequestFormData)
        });

        const data = await res.json();

        console.log("----- replyFriendRequest  api.ts");
        console.log(data);
        console.log("----- replyFriendRequest  api.ts");
        return data as ResponseType<string>;
    } catch (error) {
        console.log("----- replyFriendRequest  api.ts");
        console.log(error);
        console.log("----- replyFriendRequest  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const removeFriend = async(removeFriendFormData:{friendUserID:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/friends`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(removeFriendFormData)
        });

        const data = await res.json();

        console.log("----- removeFriend  api.ts");
        console.log(data);
        console.log("----- removeFriend  api.ts");
        return data as ResponseType<UserTypes[]>;
    } catch (error) {
        console.log("----- removeFriend  api.ts");
        console.log(error);
        console.log("----- removeFriend  api.ts");
        return error as ResponseType<Error>;        
    }
};
export const verify = async({token, emailType}:{token:string; emailType:"VERIFY_EMAIL"|"RESET_PASSWORD";}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/verifyemail`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({token, emailType})
        });

        const data = await res.json();

        console.log("----- verify  api.ts");
        console.log(data);
        console.log("----- verify  api.ts");
        return data as ResponseType<UserTypes>;
    } catch (error) {
        console.log("----- verify  api.ts");
        console.log(error);
        console.log("----- verify  api.ts");
        return error as ResponseType<string>;        
    }
};

// Chat APIs
export const createChat = async(newChatFormData:{chatName:string; members?:string[]; description:string; isGroupChat:boolean;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/new`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(newChatFormData)
        });

        const data = await res.json();

        console.log("----- createChat  api.ts");
        console.log(data);
        console.log("----- createChat  api.ts");
        return data as ResponseType<ChatTypes>;
    } catch (error) {
        console.log("----- createChat  api.ts");
        console.log(error);
        console.log("----- createChat  api.ts");
        return error as ResponseType<Error>;
    }
};
export const selectedChatMessages = async(selectedChatMessagesFromData:{chatID:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/selected_chat`, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(selectedChatMessagesFromData)
        });

        const data = await res.json();

        console.log("----- selectedChatMessages api.ts");
        console.log(data);
        console.log("----- selectedChatMessages api.ts");
        return data as  ResponseType<MessageTypesPopulated[]>
        
    } catch (error) {
        console.log("----- selectedChatMessages api.ts");
        console.log(error);
        console.log("----- selectedChatMessages api.ts");
        return error as  ResponseType<Error>
    }
}
export const updateChat = async(updateChatFromData:{chatID:string; members:string[];}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/selected_chat`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(updateChatFromData)
        });

        const data = await res.json();

        console.log("----- updateChat api.ts");
        console.log(data);
        console.log("----- updateChat api.ts");
        return data as  ResponseType<ChatTypes>
        
    } catch (error) {
        console.log("----- updateChat api.ts");
        console.log(error);
        console.log("----- updateChat api.ts");
        return error as  ResponseType<Error>
    }
}
export const removeMembersFromChat = async(removeMembersFromChatFromData:{chatID:string; members:string[];}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/remove_members`, {
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(removeMembersFromChatFromData)
        });

        const data = await res.json();

        console.log("----- removeMembersFromChat api.ts");
        console.log(data);
        console.log("----- removeMembersFromChat api.ts");
        return data as  ResponseType<ChatTypes>
        
    } catch (error) {
        console.log("----- removeMembersFromChat api.ts");
        console.log(error);
        console.log("----- removeMembersFromChat api.ts");
        return error as  ResponseType<Error>
    }
}
export const deleteChat = async(deleteChatFormData:{chatID:string;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/chat/selected_chat`, {
            method:"DELETE",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(deleteChatFormData)
        });

        const data = await res.json();

        console.log("----- deleteChat api.ts");
        console.log(data);
        console.log("----- deleteChat api.ts");
        return data as  ResponseType<ChatTypes>
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
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/message/new`, {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(createMessageFormData)
        });

        const data = await res.json();

        console.log("----- createMessage api.ts");
        console.log(data);        
        console.log("----- createMessage api.ts");
        return data as ResponseType<MessageTypesPopulated>;
    } catch (error) {
        console.log("----- createMessage api.ts");
        console.log(error);
        console.log("----- createMessage api.ts");
        return error as ResponseType<Error>;
    }
};
export const sendAttachment = async(formData:FormData) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/message/send-attachment`, {
            method:"POST",
            credentials:"include",
            body:formData
        });

        const data = await res.json();

        console.log("----- sendAttachment api.ts");
        console.log(data);        
        console.log("----- sendAttachment api.ts");
        return data as ResponseType<MessageTypesPopulated>;
    } catch (error) {
        console.log("----- sendAttachment api.ts");
        console.log(error);
        console.log("----- sendAttachment api.ts");
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

        const data = await res.json();

        console.log("----- deleteMessagesForMe api.ts");
        console.log(data);        
        console.log("----- deleteMessagesForMe api.ts");
        return data as ResponseType<string[]>;
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

        const data = await res.json();

        console.log("----- deleteMessagesForAll api.ts");
        console.log(data);        
        console.log("----- deleteMessagesForAll api.ts");
        return data as ResponseType<string[]>;
    } catch (error) {
        console.log("----- deleteMessagesForAll api.ts");
        console.log(error);
        console.log("----- deleteMessagesForAll api.ts");
        return error as ResponseType<Error>;
    }
};
export const forwardMessage = async(forwardMessageFormData:{memberIDs:string[]; contentID:string[]; attachment:string[]; messageType:ContentMessageType; messageStatus:MessageStatusType; isForwarded:boolean;}) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/v1/message/forward`, {
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(forwardMessageFormData)
        });

        const data = await res.json();

        console.log("----- forwardMessage api.ts");
        console.log(data);        
        console.log("----- forwardMessage api.ts");
        return data as ResponseType<string>;
    } catch (error) {
        console.log("----- forwardMessage api.ts");
        console.log(error);
        console.log("----- forwardMessage api.ts");
        return error as ResponseType<Error>;
    }
};