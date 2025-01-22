import "../styles/pages/new_group.scss";
import { BiRefresh, BiSmile } from "react-icons/bi";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";
import { createChat } from "../redux/api/api";
import { ChangeEvent, useState } from "react";
import { TopBackBtn } from "../utils/Utill";
import toast from "react-hot-toast";

const NewGroup = () => {
    const [newGroupFormData, setNewGroupFormData] = useState<{chatName:string; description:string; isGroupChat:boolean;}>({chatName:"", description:"", isGroupChat:false})



    const onChangeHandler = (e:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
        setNewGroupFormData({...newGroupFormData, [e.target.name]:e.target.value});
    };

    const createNewGroupHandler = async() => {
        console.log(newGroupFormData);
        
        const newGroup = await createChat({...newGroupFormData, isGroupChat:true});

        if (newGroup.success === true) {
            setSelectedNavigation("Chats");
            toast.success("New Group created", {
                duration:2000,
                position:"top-center"
            });
        }else{
            toast.error(newGroup.message.toString(), {
                duration:2000,
                position:"top-center"
            });
        }
        //if (newGroup.success === false) {
            
        //}
    };


    return(
        <div className="new_group_cont">
            <TopBackBtn heading="New group" />
            <div className="new_group_section">
                <div className="group_image_cont">
                    <p>ADD GROUP ICON</p>
                    <BiRefresh className="BiRefresh" />
                    <input type="file" name="group_photo" />
                </div>
                <div className="new_group_name_field">
                    <input type="text" name="chatName" placeholder="Group name" onChange={(e) => onChangeHandler(e)} />
                    <BiSmile className="BiSmile" />
                </div>
                <div className="new_group_description_field">
                    <textarea className="text_area" name="description" placeholder="Group description..." rows={6} onChange={(e) => onChangeHandler(e)}></textarea>
                    <BiSmile className="BiSmile" />
                </div>
                <div className="new_group_create_btn">
                    <button onClick={createNewGroupHandler}>Create group</button>
                </div>
            </div>
        </div>
    )
};

export default NewGroup;