import { BiSearch } from "react-icons/bi";
import { GRAY_LIGHT } from "../constants/constants";
import "../styles/utils.scss";
import { FaArrowLeftLong } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { NaviagationTypes, textAlign } from "../types/types";
import { Dispatch, SetStateAction } from "react";
//import { MiscReducerTypes } from "../redux/reducers/navigationReducer";
import { useDispatch } from "react-redux";
import { setSelectedNavigation } from "../redux/reducers/navigationReducer";

export const Heading = ({value, color, fontSize, padding, margin, textAlign}:{value:string; color?:string; fontSize?:string; padding?:string; margin?:string; textAlign?:textAlign;}) => {
    return(
        <h1 style={{
            color:color?color:GRAY_LIGHT,
            fontSize:fontSize?fontSize:"1rem",
            padding:padding?padding:"10px",
            margin:margin?margin:"0 auto",
            textAlign:textAlign?textAlign:"center"
        }}>{value}</h1>
    )
};
export const Para = ({value, color, fontSize, margin, padding}:{value:string; color?:string; fontSize?:string; margin?:string; padding?:string;}) => {
    return(
        <p style={{width:"fit-content", color:color?color:GRAY_LIGHT, fontSize:fontSize?fontSize:"0.7rem", textAlign:"justify", margin:margin?margin:"0", padding:padding?padding:"10px"}}>{value}</p>
    )
};
export const Input = ({biSearchID, faArrowLeftLongID, inputID, ioMdCloseID}:{biSearchID:string; faArrowLeftLongID:string; inputID:string; ioMdCloseID:string;}) => {

    const onFocusHandler = () => {
        const BiSearch = document.getElementById(biSearchID);
        const FaArrowLeftLong = document.getElementById(faArrowLeftLongID);
        const IoMdClose = document.getElementById(ioMdCloseID);

        if (BiSearch && FaArrowLeftLong && IoMdClose) {
            BiSearch.style.rotate = "-180deg";
            BiSearch.style.opacity = "0";
            FaArrowLeftLong.style.rotate = "0deg";
            FaArrowLeftLong.style.opacity = "1";
            IoMdClose.style.rotate = "0deg";
            IoMdClose.style.opacity = "1";
        }
    };
    const onBlurHandler = () => {
        const BiSearch = document.getElementById(biSearchID);
        const FaArrowLeftLong = document.getElementById(faArrowLeftLongID);
        const IoMdClose = document.getElementById(ioMdCloseID);

        if (BiSearch && FaArrowLeftLong && IoMdClose) {
            BiSearch.style.rotate = "0deg";
            BiSearch.style.opacity = "1";
            FaArrowLeftLong.style.rotate = "180deg";
            FaArrowLeftLong.style.opacity = "0";
            IoMdClose.style.rotate = "180deg";
            IoMdClose.style.opacity = "0";
            
        }
    };
    const searchInputClearHandler = () => {
        const searchChatInp = document.getElementById(inputID) as HTMLInputElement;

        if (searchChatInp) {
            searchChatInp.value = "";
        }
    };

    return(
        <div className="search_cont">
            <div className="search_icon" onClick={searchInputClearHandler}>
                <BiSearch id={biSearchID} className="BiSearch" />
                <FaArrowLeftLong id={faArrowLeftLongID} className="FaArrowLeftLong" />
            </div>
            <input type="text" name="search" placeholder="Search" id={inputID} onFocus={onFocusHandler} onBlur={onBlurHandler} />
            <div className="search_icon" onClick={searchInputClearHandler}>
                <IoMdClose id={ioMdCloseID} className="IoMdClose" />
            </div>
        </div>
    )
};
export const Button = ({value, color, fontSize, padding}:{value:string; color?:string; fontSize?:string; padding?:string;}) => {
    return(
        <button className="button_util" style={{color:color?color:"black", fontSize:fontSize?fontSize:"0.7rem", padding:padding?padding:"10px"}}>{value}</button>
    )
};
//ActionCreatorWithPayload<MiscReducerTypes, "miscReducer/setSelectedNavigation">
export const SpreadOptions = ({contentArray, isOpen, setIsOpen}:{contentArray:NaviagationTypes[]; isOpen:boolean; setIsOpen:Dispatch<SetStateAction<boolean>>;}) => {
    const dispatch = useDispatch();


    const onClickOptionsHandler = (optionName:NaviagationTypes) => {
        setIsOpen(false);
        dispatch(setSelectedNavigation(optionName));
    }
    const onClickOptionsBGHandler = () => {
        setIsOpen(false);
    }

    return(
        <>
            <div className="spread_option_dialog_disable_bg" style={{
                zIndex:isOpen?"21":"-1"
            }} onClick={() => onClickOptionsBGHandler()}>
            </div>
            <div className="spread_option_dialog_cont_outer" style={{
                opacity:isOpen?"1":"0",
                zIndex:isOpen?"21":"-1"
            }}>
                <div className="spread_option_dialog_cont" style={{
                    top:"40px",
                    right:"30px",
                    height:isOpen?"210px":"1px",
                    opacity:isOpen?"1":"0",
                    zIndex:isOpen?"21":"-1",
                    position:"absolute"
                }}>
                    {
                        contentArray.map((optionName, index) => (
                            <button key={index} className="option" onClick={() => onClickOptionsHandler(optionName as NaviagationTypes)} >{optionName}</button>
                        ))
                    }
                </div>
            </div>
        </>
    )
}
