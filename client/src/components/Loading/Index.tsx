import "./Loading.scss";
import spinner from "./spinner.svg";

export default function Loading() {
    return ( 
        <img src={spinner} alt="data is loading" className="spinner"/>
    )
}