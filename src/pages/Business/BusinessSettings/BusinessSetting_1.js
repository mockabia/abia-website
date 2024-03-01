import React, { useEffect, useState } from "react";
import "../../Style/BusinessSettings.css";
import ImageUploader from "../../../components/ImageUploader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Business from "../../../pages/Business/Business";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const schema = yup.object().shape({
  name: yup.string().required("Business name is required"),
  website: yup
    .string()
    .matches(
      /^(?:(?:(?:https?|ftp):)?\/\/)?(?:www\.)?([a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+)(?:\/[^ "]+)?$/,
      "Enter a valid website"
    ),
});

const BasicInfo = ({ vendorDetails }) => {
  const [inputs, setInputs] = useState({
    name: "",
    website: "",
    photo: [],
  });
  const [inputsErrors, setInputsErrors] = useState({});
  const [image, setImage] = useState(null);
  const VendorID = vendorDetails.vid;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [settingResponse, setSettingResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const openSuccessSnackbar = () => {
    setOpenSnackbar(true);
  };

  const closeSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    watch,
    register,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const handleImageCrop = (images) => {
    setInputs((prevValues) => ({
      ...prevValues,
      photo: {
        imageUrl: images.imageUrl,
        thumbUrl: images.thumbUrl,
        iconUrl: images.iconUrl,
      },
    }));
  };

  const handleImageChange = (imageUrl) => {
    setImage(imageUrl);
    // setImage((values) => ({ ...values, ["photo"]: imageUrl }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedName = watch("name");
    const updatedWebsite = watch("website");
    const formValues = {
      name: updatedName,
      website: updatedWebsite,
      photo: inputs.photo,
      vid: VendorID,
    };
    setTimeout(() => {
      Business.updateBusiness(
        1,
        formValues,
        setInputsErrors,
        setSettingResponse
      );
      setLoading(false); // Set loading to false when the response is received
    }, 1000);
  };

  console.log("settingResponse:", settingResponse);
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
              <p className="text-[12px] text-red-500 font-semibold mt-1">
                {errors.website?.message}
              </p>
            </div>
          </div>
          <div className="relative">
            <div>
              <label className="font-semibold">Upload Business Logo</label>
            </div>
            <ImageUploader
              onImageCrop={handleImageCrop}
              onChangeCrop={handleImageChange}
              childThumbImage={vendorDetails.photoURL}
            />
            <div className="upload-recommendation">
              <span>Recommended Size: 400px x 300px</span>
              <br />
              <span>Maximum file size 1MB</span>
            </div>
            <div
              className={`basicinfo-submit-button ${
                settingResponse ? "focused" : ""
              }`}
              onClick={handleSubmit}
            >
              <button>{loading ? "Loading..." : "Save"}</button>
            </div>
            {/* <div className="success-message">{settingResponse}</div> */}
          </div>
        </form>
        {/* SNACKBAR */}
        <Snackbar
          sx={{
            zIndex: "10000",
          }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Basic Information Submitted !
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default BasicInfo;
