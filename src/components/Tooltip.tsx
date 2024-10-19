import { useRef } from "react"
import "../styles/utils.scss";

const Tooltip = ({content, position, isTooltipActive}:{content:string; position:{x:number; y:number;}; isTooltipActive:boolean;}) => {
    const tooltipRef = useRef<HTMLDialogElement>(null);

    return(
        <dialog id="tooltip_dialog" className="tooltip_dialog" ref={tooltipRef} open={true} style={{
            top:position.y+10+"px",
            marginLeft:position.x+60+"px",
            opacity:isTooltipActive?"1":"0",
            zIndex:isTooltipActive?"20":"-1"
        }}>
            {content}
        </dialog>
    )
};

export default Tooltip;