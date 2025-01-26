export type textAlign = 'left' | 'right' | 'center' | 'justify';

export type NaviagationTypes = "Chats" | "Status" | "Communities" | "Channels" | "Settings" | "Profile" | "New group" | "Chat info" | "User info" | "New broadcast" | "Linked devices" | "Starred messages" | "Payments" | "Settings" | "Add members" | "Contacts" | "Remove members" | "Friend requests" | "Search user" | "Archive chat" | "Mute notifications" | "Delete chat" | "Pin chat" | "Mark as unread" | "Block" | "Start chat" | "Delete freind" | "Forward" | "Delete message" | "Notifications";
export type DialogParentTypes = "Delete for me" | "Delete for all";
export type ResponseType<T> = {success:boolean; message:string; jsonData:T};

export type FriendRequestStatusType = "pending"|"accepted"|"rejected";
export interface UserTypes {
    _id: string,
    name: string,
    email: string,
    password: string,
    profilePicture: string,
    coverPicture: string,
    bio: string,
    gender: string,
    friends: string[],
    posts: string[],
    notifications: string[],
    chats: string[],
    is_varified: boolean,
    friendRequests: string[],
    createdAt:Date
};

export interface ChatTypes {
    _id:string;
    chatName:string;
    admin:string[];
    members:string[];
    description:string;
    isGroupChat:boolean;
    createdBy:string;
    createdAt:Date;
    updatedAt:Date;
};
export interface ChatTypesPopulated {
    _id:string;
    chatName:string;
    admin:string[];
    members:UserTypes[];
    description:string;
    isGroupChat:boolean;
    createdBy:string;
    createdAt:Date;
    updatedAt:Date;
};

export type MessageStatusType = "sent"|"delivered"|"read";
export interface MessageTypes {
    _id:string;
    sender:string;
    chatID:string;
    content?:string;
    attachment?:string[];
    messageStatus:MessageStatusType;
    isForwarded:boolean;
    deletedFor:string[];
    createdAt:string;
    updatedAt:string;
};
export interface MessageTypesPopulated {
    _id:string;
    sender:string;
    chatID:string;
    content?:ContentType;
    attachment?:ContentType[];
    messageStatus:MessageStatusType;
    isForwarded:boolean;
    deletedFor:string[];
    createdAt:string;
    updatedAt:string;
};

export type ContentMessageType = "text"|"image"|"file"|"video"|"audio";
export interface ContentType {
    _id:string;
    contentMessage:string;
    createdBy:string;
    isForwarded:boolean;
    contentType:ContentMessageType;
    createdAt:Date;
    updatedAt:Date;
};

export type NotificationTypeTypes = "info"|"alert"|"warning";
export type NotificationStatusTypes = "pending"|"received"|"viewed"|"archived";
export interface NotificationTypes{
    _id:string;
    receiverID:string;
    notificationType:NotificationTypeTypes;
    status:NotificationStatusTypes;
    content:string;
    redirectedURL?:string;
    newFor:string[];
    visibleFor:string[];
    createdAt:Date;
}