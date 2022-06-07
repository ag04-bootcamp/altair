
import { getFiles } from 'api/files.ts';
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { setFiles } from 'redux/files.ts';
import Breadcrumbs from 'general-components/breadcrumbs.component';
import File from "./file.component.tsx";
import "./files.styles.scss";
type FileModel = {
    name: String
    path: String
    file: String
    isImage: Boolean
}

const Files = () => {
    // let [files, setFiles] = useState<Array<FileModel>>([])

    const files: Array<FileModel> = useSelector((state: any) => state.files)
    var path = useParams()["*"]

    const dispatch = useDispatch()

    useEffect(() => {
        getFiles(path).then((res) => {
            dispatch(setFiles(res.data))
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [path])

    return (
        <div>
            <div className='files-header'>
                <Breadcrumbs path={path.split("/")
                    .map((el: any, index) => {
                        return { path: el, displayName: index === 0 ? "ROOT" : el }
                    })
                } />
                <div>
                    <button>create Folder</button>
                    <button>upload</button>
                </div>
            </div>
            <div className="files files-container">
                {files.map((file) => {
                    return <File file={file} key={file.name} />
                })}
            </div>
        </div>

    )
}

export default Files;