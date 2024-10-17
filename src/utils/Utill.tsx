import { GRAY_LIGHT } from "../constants/constants";
import "../styles/utils.scss";

export const Heading = ({value, color, fontSize}:{value:string; color?:string; fontSize?:string;}) => {
    return(
        <h1 style={{color:color?color:GRAY_LIGHT, fontSize:fontSize?fontSize:"1rem"}}>{value}</h1>
    )
}
export const Para = ({value, color, fontSize}:{value:string; color?:string; fontSize?:string;}) => {
    return(
        <p style={{color:color?color:GRAY_LIGHT, fontSize:fontSize?fontSize:"0.7rem"}}>{value}</p>
    )
}
export const Button = ({value, color, fontSize, padding}:{value:string; color?:string; fontSize?:string; padding?:string;}) => {
    return(
        <button className="button_util" style={{color:color?color:"black", fontSize:fontSize?fontSize:"0.7rem", padding:padding?padding:"10px"}}>{value}</button>
    )
}
