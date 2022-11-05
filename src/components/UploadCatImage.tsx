import react, {useState} from 'react';
import { uploadCat } from '../services/catServices';
import { toast } from 'react-toastify';

const UploadCatImage = () => {
    const [image, setImage] = useState<File>();
    const [uploading, setUploading] = useState(false);
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
        setImage(event.target.files[0]);
        }
    };
    
    const handleUpload = async () => {
        if (image) {
        setUploading(true);
       const result =  await uploadCat(image);
        if(result.status === 200 || result.status === 201) {
            toast.success("Refresh the page to see the image");
        } else {
            toast.error("Error uploading image");
        }

        setUploading(false);
        setImage(undefined);
        }
    };

    return (
        <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload} disabled={uploading}>
            Upload
        </button>
        </div>
    );
    }

export default UploadCatImage;