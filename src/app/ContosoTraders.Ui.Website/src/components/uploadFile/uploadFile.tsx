import './uploadFile.scss'

import { DropzoneArea } from 'mui-file-dropzone'
import { useNavigate } from "react-router-dom";

import SearchIconNew from '../../assets/images/original/Contoso_Assets/product_page_assets/upload_icon.svg'
import { ProductService } from '../../services';

interface UploadFileProps {
    title: string;
    subtitle: string;
}    

const UploadFile = ({title, subtitle}:UploadFileProps) => {
    const navigate = useNavigate();
    const uploadFile = async (loadedFiles:File[]) => {
        const file = loadedFiles[0];
        if (file) {
            const formData = new FormData();
            formData.append("file", file);

            const relatedProducts:Array<any> = await ProductService.getRelatedProducts(formData);
            if (relatedProducts.length > 1) {
                navigate("/suggested-products-list",{
                    state: { relatedProducts },
                });
            } else {
                navigate({
                    pathname: `/product/detail/${relatedProducts[0].id}`,
                });
            }
        }
    }
    
    return (
        <form className="upload">
            <DropzoneArea
                showPreviews={false}
                acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                onChange={uploadFile.bind(this)}
                filesLimit={1}
                fileObjects={[]}
            />
            <label className="upload__label" htmlFor="upload_image">
                <img src={SearchIconNew} alt="upload" />
                <span className="upload__info">
                    {subtitle ? <span className="upload__subtitle fs-14" style={{ color: 'black', fontSize: '14px' }}>{subtitle}</span> : null}
                    <span className="upload__title">{title}</span>
                </span>
            </label>
        </form>
    );
}

export default UploadFile;