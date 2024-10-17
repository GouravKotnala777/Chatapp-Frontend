import { useRef } from "react"
import "../styles/utils.scss";

const Tooltip = ({content, position, isTooltipActive}:{content:string; position:{x:number; y:number;}; isTooltipActive:boolean;}) => {
    const tooltipRef = useRef<HTMLDialogElement>(null);

    //const tooltipPositionHandler = () => {
    //    const tooltipDialog = tooltipRef.current;

    //    if (tooltipDialog) {
    //        tooltipDialog.style.position = ""
    //    }
    //};


    return(
        <dialog className="tooltip_dialog" ref={tooltipRef} open={isTooltipActive} style={{
            //position:"absolute",
            top:position.y+"px",
            left:position.x+"px"
        }}>
            {content}
        </dialog>
    )
};

export default Tooltip;