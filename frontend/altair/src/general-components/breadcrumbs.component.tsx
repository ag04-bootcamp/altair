import "./breadcrumbs.styles.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

type propsModel = {
    path: Array<String>
}

const Breadcrumbs = (props: any) => {
    const userId: any = useSelector((state: any) => state.login.id)
    const navigate = useNavigate()
    const clickHandler = (params: Array<String>) => {
        navigate(`${params.join("/")}`)
    }
    return <div className="breadcrumbs">
        {props.path.map((element, index) => {
            if (index < props.path.length - 1) {
                return <div key={index}>
                    <span className="breadcrumbsLink" onClick={() => clickHandler(props.path.map((el: any)=>el.path).slice(0, index + 1))}>{element.displayName}</span>
                    <span className="separator">{">"}</span>
                </div>
            }
            else return <div key={index}><span className="breadcrumbsLink">{element.displayName}</span></div>
        })}
    </div>;
};

export default Breadcrumbs;
