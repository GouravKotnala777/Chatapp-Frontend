import { GRAY_LIGHT } from "../constants/constants";
import "../styles/utils.scss";

export const Heading = ({value, color, fontSize, padding}:{value:string; color?:string; fontSize?:string; padding?:string;}) => {
    return(
        <h1 style={{color:color?color:GRAY_LIGHT, fontSize:fontSize?fontSize:"1rem", padding:padding?padding:"10px"}}>{value}</h1>
    )
}
export const Para = ({value, color, fontSize, margin, padding}:{value:string; color?:string; fontSize?:string; margin?:string; padding?:string;}) => {
    return(
        <p style={{width:"fit-content", color:color?color:GRAY_LIGHT, fontSize:fontSize?fontSize:"0.7rem", textAlign:"justify", margin:margin?margin:"0", padding:padding?padding:"10px"}}>{value}</p>
    )
}
export const Button = ({value, color, fontSize, padding}:{value:string; color?:string; fontSize?:string; padding?:string;}) => {
    return(
        <button className="button_util" style={{color:color?color:"black", fontSize:fontSize?fontSize:"0.7rem", padding:padding?padding:"10px"}}>{value}</button>
    )
}
