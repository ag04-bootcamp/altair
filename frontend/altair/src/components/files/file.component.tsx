import "./files.styles.scss"

import FolderIcon from "components/svg/folderIcon.component.tsx";

import FileIcon from "components/svg/fileIcon.component.tsx";
import { useNavigate, useParams } from "react-router-dom";

const File = (props) => {

    var path = useParams()["*"]
    const navigate = useNavigate();

    const clickHandler = () => {
        if (!props.file.file) navigate(`${path}/${props.file.name}`);
        else window.open(`http://localhost:8080/file/${props.file.path}`, '_blank')?.focus();
    }

    return (
        <div className="file" onClick={clickHandler}>
            <div className="file-display">
                {!props.file.file && <FolderIcon />}
                {props.file.image && <img src={`http://localhost:8080/file/${props.file.path}`} alt="file" height="100%" width="100%"></img>}
                {props.file.file && !props.file.image && <FileIcon />}
            </div>
            <div className="file-name">{props.file.name}</div>
        </div>
    )
}

export default File;