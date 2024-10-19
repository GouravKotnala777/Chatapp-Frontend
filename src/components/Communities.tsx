import { CgAddR } from "react-icons/cg";
import "../styles/components/communities.scss";
import { BiDotsVertical } from "react-icons/bi";
import globe from "../../public/globe.png";
import { Button, Heading, Para } from "../utils/Utill";
import { GRAY_LIGHTER } from "../constants/constants";


const Communities = () => {

    return(
        <div className="communities_cont">
            <div className="communities_section_header">
                <div className="heading">Communities</div>
                <div className="icons">
                    <button className="icon"><CgAddR /></button>
                    <button className="icon"><BiDotsVertical /></button>
                </div>
            </div>

            // it is placeholder
            <div className="my_community_section_placeholder">
                <img src={globe} alt={globe} />
                <Heading value="Stay connected with a community" color={GRAY_LIGHTER} />
                <Para value="Communities bring members together in topic based groups, and make it easy to get admin announcements. Any community you'r added to will appear hear." />
                <Button value="Start your community" color="white" />
            </div>




            {/*<div className="my_community_section">
            </div>
            <div className="communities_section">
                <div className="viewed_heading">VIEWED</div>
                <div className="status_section_scrollable">
                </div>
            </div>*/}
        </div>
    )
};

export default Communities;