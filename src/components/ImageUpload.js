import React, {useState} from 'react';
// import ProfileImage from './../assets/images/profile.jpg';
import './../css/ImageUpload.css';
import { PhotoCamera } from '@mui/icons-material';

function ImageUpload() {
    const [imageFile, setImageFile] = useState(require("./../assets/images/profile.jpg"));

    const imageHandler = (event) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImageFile(reader.result);
            }
        };
        console.log(reader.readAsDataURL(event.target.files[0]));
        console.log(reader.result);
    };

    return (
        <div className="page">
            <div className="container">
                <h1 className="heading">Upload your Image</h1>
            <div className="img-holder">
                <img src={imageFile} alt="Profile Picture" id="img" className="img" />
            </div>
            <input
                type="file"
                accept="image/*"
                name="image-upload"
                id="input"
                onChange={imageHandler}
            />
            <div>
                <label htmlFor="input">
                    <PhotoCamera/>
                </label>
            </div>
            </div>
        </div>
    );
}

export default ImageUpload;