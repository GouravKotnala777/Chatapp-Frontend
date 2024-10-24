import { BiRefresh, BiSmile } from "react-icons/bi";
import "../styles/pages/new_group.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";

const NewGroup = () => {
    const dispatch = useDispatch();

    const goBackHandler = () => {
        dispatch(setSelectedNavigation("Chats"));
    };


    return(
        <div className="new_group_cont">
            <div className="new_group_section_header">
                <button className="back_btn" onClick={goBackHandler}><FaArrowLeftLong className="FaArrowLeftLong" /></button>
                <div className="heading">New group</div>
            </div>
            {/*<div className="search_section">

            </div>*/}
            <div className="new_group_section">
                <div className="group_image_cont">
                    <p>ADD GROUP ICON</p>
                    <BiRefresh className="BiRefresh" />
                    <input type="file" name="group_photo" />
                </div>
                <div className="new_group_name_field">
                    <input type="text" name="newGroupName" placeholder="Group name" />
                    <BiSmile className="BiSmile" />
                </div>
                <div className="new_group_description_field">
                    <textarea className="text_area" placeholder="Group description..." rows={6}></textarea>
                    <BiSmile className="BiSmile" />
                </div>
            </div>
        </div>
    )
};

export default NewGroup;