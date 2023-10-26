import React, { useEffect, useState } from "react";
import "./BasicInfo.css";
import ImageUploader from "../../components/ImageUploader";
import { BUSINESS_SETTINGS1 } from "../../api/apiUrls";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: inputBusinessName,
      website: inputWebsite,
      photo: image,
    };

    try {
      const response = await fetch(BUSINESS_SETTINGS1, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.error("API Request Error:", error);
    }
  };

  return (
    <div className="basic-info-container">
      <div className="basic-sub-header">
        <p className="whitespace-break-spaces">
          Add your logo, business name and website to your ABIA Profile.{" "}
        </p>
      </div>
      <div className="mt-[20px]">
        <form className="space-y-7">
          <div>
            <label className="font-semibold">Business Name</label>
            <div>
              <input
                type="text"
                required
                name="name"
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
                name="website"
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
