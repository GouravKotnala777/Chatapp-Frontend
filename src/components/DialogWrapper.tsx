import { Dispatch, SetStateAction } from "react";
import "../styles/components/dialog-wrapper.scss";
import { DialogParentTypes } from "../types/types";

const DialogWrapper = ({heading, parent, isDialogOpen, setIsDialogOpen,
    setIsDeleteForMeClicked, setIsDeleteForAllClicked
}:{heading:string; parent:DialogParentTypes; isDialogOpen:boolean; setIsDialogOpen:Dispatch<SetStateAction<boolean>>;
    setIsDeleteForMeClicked:Dispatch<SetStateAction<boolean>>;
    setIsDeleteForAllClicked:Dispatch<SetStateAction<boolean>>;
}) => {

    

    return(
        <>
            <dialog className="dialog_wrapper_cont" open={isDialogOpen} onClick={() => setIsDialogOpen(false)}>
                <div className="dialog_wrapper_content">
                    <div className="dialog_heading">{heading}</div>
                    {
                        parent === "Delete for all" &&
                            <div className="delete_for_all_cont">
                                <button onClick={() => setIsDeleteForAllClicked(true)}>Delete for everyone</button>
                                <button onClick={() => setIsDeleteForMeClicked(true)}>Delete for me</button>
                                <button onClick={() => setIsDialogOpen(false)}>Cancel</button>
                            </div>
                    }
                    {
                        parent === "Delete for me" &&
                            <div className="delete_for_me_cont" onClick={() => setIsDialogOpen(false)}>
                                <button className="cancel_btn">Cancel</button>
                                <button className="delete_btn" onClick={() => setIsDeleteForMeClicked(true)}>Delete for me</button>
                            </div>
                    }
                </div>
            </dialog>
        </>
    )
};

export default DialogWrapper;