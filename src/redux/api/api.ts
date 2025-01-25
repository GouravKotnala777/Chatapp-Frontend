import toast from "react-hot-toast";
import { ContentMessageType, FriendRequestStatusType, MessageStatusType, NotificationStatusTypes, NotificationTypeTypes, ResponseType } from "../../types/types";



const apiHandler = async<T, U = undefined>(
    {endpoint, method, options, toastMessageArray, body, contentType, handlerName}:
    {
        endpoint:string,
        method:"GET"|"POST"|"PUT"|"DELETE",
        body?:U,
        toastMessageArray:{condition:boolean; toastMessage:string;}[],
        options:{requiresAuth?:boolean;},
        contentType?:"FormType",
        handlerName:string;
    }
):Promise<ResponseType<T>> => {
    const {requiresAuth = false} = options;
    try {
        toastMessageArray.forEach((item) => {
            if (item.condition) throw new Error(item.toastMessage);
        });
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}${endpoint}`, {
            method,
            ...(contentType !== "FormType" && {
                headers:{
                    "Content-Type":"application/json"
                }}
            ),
            ...(requiresAuth&&{credentials:"include"}),
            ...(body&&{body:JSON.stringify(body)})
        });

        const data:ResponseType<T> = await res.json();

        if (!res.ok) throw new Error(data.message || "Something went wrong");

        
        if (data.message) {
            toast.success(data.message, {
                duration:2000,
                position:"top-center"
            });
        }
        

        console.log(`----- ${handlerName}  api.ts (1)`);
        console.log(data);
        console.log(`----- ${handlerName}  api.ts (2)`);
        return data;
    } catch (error) {
        const errorMessage = (error as {message:string;}).message || "An unknown error occured";

        if (errorMessage && errorMessage !== "Token not found") {
            toast.error(errorMessage, {
                duration:2000,
                position:"top-center"
            });
        }
        console.log("API Error", error);
        return error as ResponseType<T>;
    }
}


// User APIs
export const getMyChats = async() =>(
    await apiHandler({
        handlerName:"getMyChats",
        endpoint:"/api/v1/chat/my_chats",
        method:"GET",
        body:null,
        toastMessageArray:[],
        options:{requiresAuth:true},
        //disableSuccessToast:true,
        //disableErrorToast:true
    })
);
export const register = async(formData:{name:string; email:string; password:string; gender:string; mobile:string;}):Promise<ResponseType<string|Error>> => (
    await apiHandler({
        handlerName:"register",
        endpoint:"/api/v1/user/new",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:(!formData.name || !formData.email || !formData.password || !formData.gender || !formData.mobile), toastMessage:"All fields are required"},
            {condition:(!formData.email.includes("@")), toastMessage:"Not a valid email"},
            {condition:(formData.password.length < 6), toastMessage:"Too short password"},
            {condition:(formData.mobile.length < 10), toastMessage:"Mobile number must be of 10 digits"}
        ],
        options:{requiresAuth:true}
    })
);
export const login = async(formData:{email:string, password:string}) =>(
    await apiHandler({
        handlerName:"login",
        endpoint:"/api/v1/user/login",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:(!formData.email || !formData.password), toastMessage:"All fields are required"},
            {condition:(!formData.email.includes("@")), toastMessage:"Not a valid email"},
            {condition:(formData.password.length < 6), toastMessage:"Too short password"}
        ],
        options:{requiresAuth:true}
    })
);
export const myProfile = async() =>(
    await apiHandler({
        handlerName:"myProfile",
        endpoint:"/api/v1/user/me",
        method:"GET",
        body:null,
        toastMessageArray:[],
        options:{requiresAuth:true},
        //disableSuccessToast:true,
        //disableErrorToast:true
    })
);
export const myFriends = async() =>(
    await apiHandler({
        handlerName:"myFriends",
        endpoint:"/api/v1/user/friends",
        method:"GET",
        body:null,
        toastMessageArray:[],
        options:{requiresAuth:true}
    })
);
export const searchUser = async(formData:{searchQuery:string;}) =>(
    await apiHandler({
        handlerName:"searchUser",
        endpoint:"/api/v1/user/search",
        method:"POST",
        body:formData,
        toastMessageArray:[],
        options:{requiresAuth:true}
    })
);
export const allReceivedFriendRequests = async() =>(
    await apiHandler({
        handlerName:"allReceivedFriendRequests",
        endpoint:"/api/v1/user/friends_request",
        method:"GET",
        body:null,
        toastMessageArray:[],
        options:{requiresAuth:true}
    })
);
export const sendFriendRequest = async(formData:{searchedUserIDArray:string[];}) =>(
    await apiHandler({
        handlerName:"sendFriendRequest",
        endpoint:"/api/v1/user/friends_request",
        method:"POST",
        body:formData,
        toastMessageArray:[],
        options:{requiresAuth:true}
    })
);
export const replyFriendRequest = async(formData:{friendRequestID:string; status:FriendRequestStatusType;}) =>(
    await apiHandler({
        handlerName:"replyFriendRequest",
        endpoint:"/api/v1/user/friends_request",
        method:"PUT",
        body:formData,
        toastMessageArray:[
            {condition:!formData.friendRequestID, toastMessage:"No user selected"},
            {condition:(formData.status === "pending"), toastMessage:"You can either accept or reject request"}
        ],
        options:{requiresAuth:true}
    })
);
export const removeFriend = async(formData:{friendUserID:string;}) =>(
    await apiHandler({
        handlerName:"removeFriend",
        endpoint:"/api/v1/user/friends",
        method:"DELETE",
        body:formData,
        toastMessageArray:[
            {condition:!formData.friendUserID, toastMessage:"No user selected"}
        ],
        options:{requiresAuth:true}
    })
);
export const verify = async(formData:{token:string; emailType:"VERIFY_EMAIL"|"RESET_PASSWORD";}) =>(
    await apiHandler({
        handlerName:"verify",
        endpoint:"/api/v1/user/verifyemail",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:!formData.emailType, toastMessage:"emailType not found"},
            {condition:!formData.token, toastMessage:"token not found for varification"}
        ],
        options:{requiresAuth:true}
    })
);

// Chat APIs
export const createChat = async(formData:{chatName:string; members?:string[]; description:string; isGroupChat:boolean;}) =>(
    await apiHandler({
        handlerName:"createChat",
        endpoint:"/api/v1/chat/new",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:(!formData.chatName || !formData.description), toastMessage:"All fields are required"},
            {condition:(formData.members?.length === 0), toastMessage:"No member selected"}
        ],
        options:{requiresAuth:true}
    })
);
export const selectedChatMessages = async(formData:{chatID:string;}) =>(
    await apiHandler({
        handlerName:"selectedChatMessages",
        endpoint:"/api/v1/chat/selected_chat",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:!formData.chatID, toastMessage:"chatID not found"}
        ],
        options:{requiresAuth:true}
    })
);
export const updateChat = async(formData:{chatID:string; members:string[];}) =>(
    await apiHandler({
        handlerName:"updateChat",
        endpoint:"/api/v1/chat/selected_chat",
        method:"PUT",
        body:formData,
        toastMessageArray:[
            {condition:!formData.chatID, toastMessage:"chatID not found"},
            {condition:formData.members.length === 0, toastMessage:"No member selected"}
        ],
        options:{requiresAuth:true}
    })
);
export const removeMembersFromChat = async(formData:{chatID:string; members:string[];}) =>(
    await apiHandler({
        handlerName:"removeMembersFromChat",
        endpoint:"/api/v1/chat/remove_members",
        method:"PUT",
        body:formData,
        toastMessageArray:[
            {condition:!formData.chatID, toastMessage:"chatID not found"},
            {condition:formData.members.length === 0, toastMessage:"No member selected"}
        ],
        options:{requiresAuth:true}
    })
);
export const deleteChat = async(formData:{chatID:string;}) =>(
    await apiHandler({
        handlerName:"deleteChat",
        endpoint:"/api/v1/chat/selected_chat",
        method:"DELETE",
        body:formData,
        toastMessageArray:[
            {condition:!formData.chatID, toastMessage:"chatID not found"}
        ],
        options:{requiresAuth:true}
    })
);

// Message APIs
export const createMessage = async(formData:{sender:string; chatID:string; content:string; attachment:string[]; messageType:ContentMessageType; messageStatus:MessageStatusType;}) =>(
    await apiHandler({
        handlerName:"createMessage",
        endpoint:"/api/v1/message/new",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:(!formData.sender || !formData.chatID || !formData.content || !formData.messageType || !formData.messageStatus), toastMessage:"All fields are required"},
            {condition:(!formData.content && formData.attachment.length === 0), toastMessage:"Null content and attachment"}
        ],
        options:{requiresAuth:true}
    })
);
export const sendAttachment = async(formData:FormData) =>(
    await apiHandler({
        handlerName:"sendAttachment",
        endpoint:"/api/v1/message/send-attachment",
        method:"POST",
        contentType:"FormType",
        body:formData,
        toastMessageArray:[],
        options:{requiresAuth:true},
    })
);
export const deleteMessagesForMe = async(formData:{messageID:string[]}) =>(
    await apiHandler({
        handlerName:"deleteMessagesForMe",
        endpoint:"/api/v1/message/delete-for-me",
        method:"DELETE",
        body:formData,
        toastMessageArray:[
            {condition:formData.messageID.length === 0, toastMessage:"messageIDs not found"}
        ],
        options:{requiresAuth:true}
    })
);
export const deleteMessagesForAll = async(formData:{messageID:string[]; chatID:string;}) =>(
    await apiHandler({
        handlerName:"deleteMessagesForAll",
        endpoint:"/api/v1/message/delete-for-all",
        method:"DELETE",
        body:formData,
        toastMessageArray:[
            {condition:!formData.chatID, toastMessage:"chatID not found"},
            {condition:formData.messageID.length === 0, toastMessage:"messageIDs not found"},
        ],
        options:{requiresAuth:true}
    })
);
export const forwardMessage = async(formData:{memberIDs:string[]; contentID:string[]; attachment:string[]; messageType:ContentMessageType; messageStatus:MessageStatusType; isForwarded:boolean;}) =>(
    await apiHandler({
        handlerName:"forwardMessage",
        endpoint:"/api/v1/message/forward",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:formData.memberIDs.length === 0, toastMessage:"memberIDs not found"},
            {condition:(formData.contentID.length === 0 && formData.attachment.length === 0), toastMessage:"Null content and attachment array"},
            {condition:formData.messageStatus !== "read", toastMessage:"Message has not read yet"},
            {condition:!formData.messageType, toastMessage:"messageType not found"}
        ],
        options:{requiresAuth:true}
    })
);

// Notification APIs
export const createNotification = async(formData:{
    toUserID:string;
    notificationType:NotificationTypeTypes;
    status:NotificationStatusTypes;
    content:string;
    redirectedURL?:string;
}) =>(
    await apiHandler({
        handlerName:"createNotification",
        endpoint:"/api/v1/notification/create",
        method:"POST",
        body:formData,
        toastMessageArray:[
            {condition:(!formData.toUserID || !formData.notificationType || !formData.status || !formData.content), toastMessage:"All fields are required"}
        ],
        options:{requiresAuth:true}
    })
);
export const updateNotificationStatus = async(formData:{
    notificationID:string;
    status:NotificationStatusTypes;
}) =>(
    await apiHandler({
        handlerName:"updateNotificationStatus",
        endpoint:"/api/v1/notification/update",
        method:"PUT",
        body:formData,
        toastMessageArray:[
            {condition:(!formData.notificationID || !formData.status), toastMessage:"All fields are required"}
        ],
        options:{requiresAuth:true}
    })
);