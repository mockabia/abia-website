import React, { useEffect, useState } from "react";
import "../Style/BusinessSettings.css";
import ImageUploader from "../../components/ImageUploader";
import * as Business from "./Business";
import ImageUpload from "../../third-party-packs/ImageUploadCrop";

// BASIC INFO
export const BasicInfo = ({ vendorDetails, props }) => {
  const [inputs, setInputs] = useState({});
  const [inputsErrors, setInputsErrors] = useState({});

  const handleImageCrop = (images) => {
    console.log("ImageUrl:", images.imageUrl);
    console.log("Cropped image:", images.thumbUrl);
    console.log("Cropped thumbnail:", images.iconUrl);
  };

  const handleImageChange = (imageUrl) => {
    setInputs((values) => ({ ...values, ["image"]: imageUrl }));
  };

  const handleChange = (e) => {
    Business.handleChange(e, setInputs, setInputsErrors);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const updateSettings_1 = async (e) => {
    e.preventDefault();
    Business.updateBusiness(1, inputs, setInputsErrors);
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
                onChange={handleChange}
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
                onChange={handleChange}
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
            {/* <ImageUpload
              onImageCrop={handleImageCrop}
              onChangeCrop={handleImageChange}
            /> */}
            {/* <ImageUploader
              // onImageCrop={}
              // onChangeCrop={}
              // image={image}
              // onUpload={onUpload}
            /> */}
            <div className="upload-recommendation">
              <span>Recommended Size: 400px x 300px</span>
              <br />
              <span>Maximum file size 1MB</span>
            </div>
            <div className="basicinfo-submit-button" onClick={updateSettings_1}>
              <button>Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

//CONTACT DETAILS
// const phoneRegExp = /^\d{10,}$/;

// const schema = yup.object().shape({
//   contact_person: yup.string().required("Contact name is required"),
//   email: yup
//     .string()
//     .required("Email is required")
//     .email("Invalid email address"),
//   mobile_phone: yup
//     .string()
//     .required("Phone no: is required")
//     .matches(phoneRegExp, "Phone number is not valid"),
//   state: yup.string().required("Please select an option"),
//   postcode: yup.string().required("Postcode is required"),
//   suburb: yup.string().required("Suburb is required"),
// });
// export const ContactDetails = ({ vendorDetails }) => {
//   const [selectedState, setSelectedState] = useState(vendorDetails.state);
//   const [stateOptions, setStateOptions] = useState([]);
//   const [regionOptions, setRegionOptions] = useState([]);
//   const [selectedRegion, setSelectedRegion] = useState();

//   const [formValues, setFormValues] = useState({
//     contact_person: "",
//     email: "",
//     mobile_phone: "",
//     address: "",
//     state: selectedState,
//     suburb: "",
//     postcode: "",
//   });

//   const navigate = useNavigate();

//   // userForm from rect-hook-form
//   const {
//     watch,
//     register,
//     handleSubmit,
//     formState: { errors, isValid, isSubmitted },
//     control,
//   } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

//   useEffect(() => {
//     setSelectedState(vendorDetails.state); // Set the default value
//   }, [vendorDetails.state]);

//   // common handleChange
//   const handleChange = (event) => {
//     if (event && event.target) {
//       setFormValues({ ...formValues, [event.target.name]: event.target.value });
//     }
//   };

//   const fieldConfig = [
//     {
//       name: "contact_person",
//       label: "Contact Name*",
//       type: "text",
//       defaultValue: vendorDetails.contact_person,
//     },
//     {
//       name: "email",
//       label: "Email*",
//       type: "text",
//       defaultValue: vendorDetails.email,
//     },
//     {
//       name: "mobile_phone",
//       label: "Phone/Mobile*",
//       type: "number",
//       defaultValue: vendorDetails.mobile_phone,
//     },
//     {
//       name: "address",
//       label: "Address",
//       type: "text",
//       defaultValue: vendorDetails.address,
//     },

//     {
//       name: "postcode",
//       label: "Postcode*",
//       type: "text",
//       defaultValue: vendorDetails.postcode,
//     },
//     {
//       name: "suburb",
//       label: "City/Region*",
//       type: "text",
//       defaultValue: vendorDetails.suburb,
//     },
//   ];

//   const fetchState = async () => {
//     try {
//       const response = await axios.get(apiurls.STATE_DROPDOWN);
//       if (response.status === 200) {
//         setStateOptions(response.data.result);
//       }
//     } catch (error) {
//       console.error("Error while fetching states:", error);
//     }
//   };

//   useEffect(() => {
//     fetchState();
//     if (selectedState) {
//       fetchRegion(selectedState);
//     } else {
//       setRegionOptions([]);
//     }
//   }, [selectedState]);

//   const fetchRegion = async () => {
//     try {
//       const response = await axios.get(apiurls.REGIONS_BY_STATE);
//       if (response.status === 200) {
//         setRegionOptions(response.data.result);
//         // console.log("Region resposne:", regionOptions);
//       }
//     } catch (error) {
//       console.error("Error while fetching states:", error);
//     }
//   };

//   const onSubmit = async (formData) => {
//     try {
//       const response = await fetch(MAIN_API["SETTINGS2"], formData);
//       if (response.status == 200) {
//         console.log("API Response:", response.data);
//       } else {
//         console.error("API Error:", response.status, response.statusText);
//       }
//     } catch (error) {
//       console.error("API Request Error:", error);
//     }
//   };
//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   return (
//     <div className="contact-details-container">
//       <div className="mt-[20px]">
//         <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
//           {fieldConfig.map((field) => (
//             <div key={field.name}>
//               <label className="font-semibold">{field.label}</label>
//               <div>
//                 <input
//                   type={field.type}
//                   name={field.name}
//                   defaultValue={field.defaultValue}
//                   className={`contactdetails-input-style ${
//                     errors[field.name] ? "contactdetails-error-border" : ""
//                   }`}
//                   {...register(field.name)}
//                 />

//                 {errors[field.name] && (
//                   <p className="text-[12px] text-red-500 font-semibold mt-1">
//                     {errors[field.name].message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           ))}
//           {/* state */}
//           <div>
//             <label className="font-semibold">State*</label>{" "}
//             <div className="relative lg:w-[52%] mylocation-primarylocaion-multiselect">
//               <Controller
//                 name="state"
//                 control={control}
//                 render={({ field }) => (
//                   <Select
//                     name="state"
//                     placeholder={selectedState}
//                     options={stateOptions.map((state) => ({
//                       value: state.value,
//                       label: state.label,
//                     }))}
//                     {...field}
//                     onChange={(selectedOption) => {
//                       const stateValue = selectedOption
//                         ? selectedOption.label
//                         : "";
//                       setSelectedState(stateValue);
//                       field.onChange(stateValue);
//                     }}
//                   />
//                 )}
//               />
//             </div>
//           </div>

//           <div className="relative space-y-3">
//             <button
//               className="submit-button"
//               disabled={!isValid || isSubmitted}
//               components={{
//                 DropdownIndicator: () => (
//                   <div>
//                     <FontAwesomeIcon
//                       icon={faCaretDown}
//                       className="dropDown-position"
//                       style={{ color: "#7c7c7c" }}
//                     />
//                   </div>
//                 ),
//               }}
//             >
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
