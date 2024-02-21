import { Identity } from "@mui/base";
import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/vendor/businessServices";
import * as customValidator from "../Plugins/customValidator";

export const logout = async (setLoginStatus, navigate) => {
  await servicesPage.logout().then(function (response) {
    if (response) {
      if (response.statuscode == 200) {
        apiService.setAuthToken(null);
        localStorage.removeItem("vendorToken");
        localStorage.removeItem("user");
        setLoginStatus(false);
        navigate(window.HOME);
      }
    }
  });
};

export const fetchbusiness = async (setInputs, setpreviewSet) => {
  let token = localStorage.getItem("vendorToken");
  token = JSON.parse(token);
  let userSession = token && token.user ? token.user : null;
  let userId = userSession && userSession.id ? userSession.id : null;
  await servicesPage.editData(userId).then(function (response) {
    if (response.statuscode == 200) {
      setInputs(response.result);
      setpreviewSet(true);
    }
  });
};

export const handleChange = (e, setInputs, setInputsErrors) => {
  const name = e.target.name;
  const value = e.target.value;
  setInputs((values) => ({ ...values, [name]: value }));
  setInputsErrors({});
};
// state
export const fetchState = async (setStateOptions) => {
  await servicesPage.stateDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setStateOptions(response.result);
    }
  });
};
export const fetchBookingsPerYear = async (setRegisterBooking) => {
  await servicesPage.bookingsPerYearDropdown().then(function (response) {
    if (response.statuscode == 200) {
      setRegisterBooking(response.result);
    }
  });
};

export const fetchFindUS = async (setRegisterFindUs) => {
  await servicesPage.findUsDropdown().then(function (response) {
    if (response.statuscode == 200) {
      setRegisterFindUs(response.result);
    }
  });
};

//services
export const fetchBusinessServices = async (setCategoryOptions, id) => {
  await servicesPage.Businessservices(id).then(function (response) {
    if (response.statuscode === 200) {
      setCategoryOptions(response.result);
    }
  });
};
//category
export const fetchCategory = async (setCategoryOption) => {
  await servicesPage.categoryDropdown().then(function (response) {
    if (response.statuscode === 200) {
      setCategoryOption(response.result);
    }
  });
};
// addtional category
export const fetchAddCategory = async (ids, setAddCategoryOption) => {
  await servicesPage.addCategoryDropdown(ids).then(function (response) {
    if (response.statuscode === 200) {
      setAddCategoryOption(response.result);
    }
  });
};

// state + region
export const fetchRegion = async (selectedStates, setRegions) => {
  await servicesPage
    .stateRegionDropdwon(selectedStates)
    .then(function (response) {
      if (response.statuscode === 200) {
        setRegions(response.result);
      }
    });
};

//VENDOR SIGNUP
export const vendorBusinessSubmit = async (formValues, setInputsErrors, setSuccess) => {
  await servicesPage.business_signup(formValues).then(function (response) {
    if (response.statuscode == 200) {
      setSuccess(response.statusmessage);
      console.log("response:", response.result);
    } else {
      if (response.errors) {
        setInputsErrors(response.errors);
      } else if (response.statusmessage) {
        setInputsErrors(response.statusmessage);
      }
    }
  });
};

// BUSINESS SETTINGS

export const updateBusiness = async (settings, formValues, setInputsErrors) => {
  await servicesPage
    .update_settings(settings, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};

// **********BUSINESS - MY-PROFILE  *********/

export const vendorView = async (setPreviewListing, vendorID, setDataSet) => {
  await servicesPage.businessViewData(vendorID).then(function (response) {
    if (response.statuscode == 200) {
      setPreviewListing(response.result);
      setDataSet(true);
    }
  });
};

export const viewProfileSettings = async (vendorID, setViewProfile) => {
  await servicesPage
    .businessViewProfileSettings(vendorID)
    .then(function (response) {
      if (response.statuscode == 200) {
        setViewProfile(response.result);
        // console.log("View Profile d:", response.result)
      }
    });
};
// Photo gallery view
export const V_viewPhotoGallery = async (setViewProfile, vendorID) => {
  await servicesPage.view_photogallery(vendorID).then(function (response) {
    if (response.statuscode == 200) {
      setViewProfile(response.result);
    }
  });
};
// delete photo
export const V_deletePhotoGallery = async (
  setDeletePhoto,
  vendorID,
  pid,
  option
) => {
  await servicesPage
    .delete_vendorPhotoGallery(vendorID, pid, option)
    .then(function (response) {
      if (response.statuscode == 200) {
        setDeletePhoto(response.result);
      }
    });
};

//View Vide0 gallery
export const V_viewVideoGallery = async (setViewProfile, vendorID) => {
  await servicesPage.view_videoGallery(vendorID).then(function (response) {
    if (response.statuscode == 200) {
      setViewProfile(response.result);
    }
  });
};

export const V_deleteVideo = async (setDeleteVideo, vendorID, vgid, option) => {
  await servicesPage
    .delete_vendorVideo(vendorID, vgid, option)
    .then(function (response) {
      if (response.statuscode == 200) {
        setDeleteVideo(response.result);
      }
    });
};

export const updateBusinessMyProfile = async (
  formValues,
  id,
  option,
  setInputsErrors,
  setVendorInputs,
  setDataSet
) => {
  await servicesPage
    .businessDescriotion1(id, option, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
        // setDataSet(true);
        console.log("Submited values:", response.result);
        setVendorInputs((values) => ({
          ...values,
          ["profile_short_desc"]: response.result.profile_short_desc,
          ["profile_long_desc"]: response.result.profile_long_desc,
          // ["team_owner_details"]: response.result.team_owner_details,
          // ["team_type"]: response.result.team_type,
        }));
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
          console.log("Team input error:", response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};

// for packages
export const updateBusinessMyProfile_Package = async (
  formValues,
  id,
  option,
  setInputsErrors,
  setViewFile,
  setDataSet
) => {
  await servicesPage
    .businessDescriotion_2(id, option, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
        // setDataSet(true);
        // console.log("Submited values:", response.packageFile);
        setViewFile(response);
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
          console.log("Team input error:", response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};
//question and Answer
export const updateQandAProfile = async (
  formValues,
  id,
  option,
  setInputsErrors,
  setQuestionRes,
  setDataSet
) => {
  await servicesPage
    .businessDescriotion1(id, option, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
        setQuestionRes(response.result);
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
          // console.log("Team input error:", response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};

export const viewVendorQandA = async (vendorID, setViewQandA) => {
  await servicesPage.view_QandA(vendorID).then(function (response) {
    if (response.statuscode == 200) {
      setViewQandA(response.result);
    }
  });
};

export const V_deeletePackages = async (vendorID, setDelPackages) => {
  await servicesPage.delete_package(vendorID).then(function (response) {
    if (response.statuscode == 200) {
      setDelPackages(response.result);
    }
  });
};

export const V_deeleteQA = async (vendorID, qid, setDelPackages) => {
  await servicesPage.delete_qandA(vendorID, qid).then(function (response) {
    if (response.statuscode == 200) {
      setDelPackages(response.result);
    }
  });
};

// GET REVIEWS/MANAGE WEDDING
export const updateManageWedding = async (
  options,
  formValues,
  setInputsErrors
) => {
  await servicesPage
    .manage_wedding(options, formValues)
    .then(function (response) {
      if (response.statuscode == 200) {
      } else {
        if (response.errors) {
          setInputsErrors(response.errors);
        } else if (response.statusmessage) {
          setInputsErrors(response.statusmessage);
        }
      }
    });
};

// LIST OF VENDOR SERVICES
export const fetchVServices = async (setServices) => {
  await servicesPage.vendor_services().then(function (response) {
    if (response.statuscode === 200) {
      setServices(response.result);
    }
  });
};

//LIST OF VENDORS
export const fetchVendors = async (setServices) => {
  await servicesPage.list_vendors().then(function (response) {
    if (response.statuscode === 200) {
      setServices(response.result);
    }
  });
};
