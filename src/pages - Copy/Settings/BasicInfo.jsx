import React, { useEffect, useState } from "react";
import "./BasicInfo.css";
import ImageUploader from "../../components/ImageUploader";
import { BUSINESS_SETTINGS1 } from "../../api/apiUrls";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as servicePage from "../../services/vendor/signupPageService";

const schema = yup.object().shape({
  name: yup.string().required("Business name is required"),
});

const BasicInfo = ({ vendorDetails }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    website: "",
    photo: "",
  });

  // const [inputWebsite, setInputWebsite] = useState(vendorDetails.website || "");
  const [image, setImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    watch,
    register,
    formState: { errors, isValid, isSubmitted },
    control,
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const onUpload = (imageUrl) => {
    console.log("Image uploaded:", imageUrl);
    setImage(imageUrl);
  };

  const handleSubmit = async () => {
    const updatedName = watch("name");
    const updatedWebsite = watch("website");
    const formData = {
      name: updatedName,
      website: updatedWebsite,
      photo: image,
    };

    console.log("Updated Form Data:", formData);
    try {
      const response = await servicePage.businessStoreData(formData); // Call the storeData function with the form data
      if (response.statuscode === 200) {
        console.log("API Response:", response.data.result);
      } else {
        console.error("API Error:", response.statuscode);
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
                defaultValue={vendorDetails.name}
                {...register("name")}
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
                defaultValue={vendorDetails.website}
                {...register("website")}
              />
            </div>
          </div>
          <div className="relative">
            <div>
              <label className="font-semibold">Upload Business Logo</label>
            </div>
            <ImageUploader image={image} onUpload={onUpload} />
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
