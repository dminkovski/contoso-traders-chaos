import './breadcrumb.scss'

import { Link } from "react-router-dom";

interface BreadcrumbProps {
    parentPath?: string,
    parentUrl?: string,
    currentPath?: string,
}

const Breadcrumb = ({parentPath, parentUrl, currentPath}:BreadcrumbProps) => {
    return(
        <div className="breadcrump">
            <p>
                <b><Link to='/'>Home</Link> / </b>
                {parentPath ? <b><Link to={parentUrl as string}>{parentPath}</Link> / </b> : null}
                {currentPath ? <span>{currentPath}</span> : null}
            </p>
        </div>
    );
}
export default Breadcrumb;