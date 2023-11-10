import React, { useEffect, useState } from "react";
import "./BasicInfo.css";
import ImageUploader from "../../components/ImageUploader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Business from "../../pages/Business/Business";

const schema = yup.object().shape({
  name: yup.string().required("Business name is required"),
});

const BasicInfo = ({ vendorDetails }) => {
  const [formValues, setFormValues] = useState({
    name: "",
    website: "",
    photo: "",
  });
  const [inputsErrors, setInputsErrors] = useState({});

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

  const handleImageCrop = (images) => {
    console.log("ImageUrl:", images.imageUrl);
    console.log("Cropped image:", images.thumbUrl);
    console.log("Cropped thumbnail:", images.iconUrl);
  };

  const handleImageChange = (imageUrl) => {
    setImage((values) => ({ ...values, ["photo"]: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedName = watch("name");
    const updatedWebsite = watch("website");
    const formValues = {
      name: updatedName,
      website: updatedWebsite,
      photo: image,
    };
    Business.updateBusiness(1, formValues, setInputsErrors);
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
                className={`basicinfo-input-style ${
                  errors.name ? "signup-error-border" : ""
                }`}
                defaultValue={vendorDetails.name}
                {...register("name")}
              />
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.name?.message}
              </p>
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
            <ImageUploader
              onImageCrop={handleImageCrop}
              onChangeCrop={handleImageChange}
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
