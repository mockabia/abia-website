import React, { useEffect, useState } from "react";
import "./BasicInfo.css";
import ImageUploader from "../../components/ImageUploader";

const BasicInfo = () => {
  const [inputBusinessName, setInputBusinessName] = useState("");
  const [inputWebsite, setInputWebsite] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const onUpload = (imageUrl) => {
    console.log("Image uploaded:", imageUrl);
    setImage(imageUrl);
  };

  const handleBusinessNameChange = (e) => {
    setInputBusinessName(e.target.value);
  };

  const handleWebsiteChange = (e) => {
    setInputWebsite(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      inputBusinessName,
      inputWebsite,
      image,
    };
    console.log(formData);

    setInputBusinessName("");
    setInputWebsite("");
    setImage(null);
  };

  return (
    <div className="basic-info-container">
      <div className="basic-sub-header">
        <p>Add your logo, business name and website to your ABIA Profile. </p>
      </div>
      <div className="mt-[20px]">
        <form className="space-y-7">
          <div>
            <label className="font-semibold">Business Name</label>
            <div>
              <input
                type="text"
                required
                className="basicinfo-input-style"
                value={inputBusinessName}
                onChange={handleBusinessNameChange}
              />
            </div>
          </div>
          {/* Wesbite */}
          <div className="">
            <label className="font-semibold">Website</label>
            <div>
              <input
                type="text"
                required
                className="basicinfo-input-style"
                value={inputWebsite}
                onChange={handleWebsiteChange}
              />
            </div>
          </div>
          <div className="relative">
            <div>
              <label className="font-semibold">Upload Business Logo</label>
            </div>
            <ImageUploader
              image={image}
              setImage={setImage}
              onUpload={onUpload}
            />
            <div className="upload-recommendation">
              <span>Recommended Size: 400px x 300px</span>
              <br />
              <span>Maximum file size 1MB</span>
            </div>
            <div className="basicinfo-submit-button" onClick={handleSubmit}>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInfo;
