
import * as apiService from "../../api/apiServices";
import * as reactUrls from "../../api/reactUrls";
import * as servicesPage from "../../services/vendor/businessServices";
import * as customValidator from "../Plugins/customValidator";

export const fetchbusiness = async (setInputs) => {
    let token       = localStorage.getItem("vendorToken");
    token           = JSON.parse(token);
    let userSession = (token && token.user) ? token.user : null;
    let userId      = (userSession && userSession.id) ? userSession.id : null;

    await servicesPage.editData(userId).then(function (response) {
        if (response.statuscode == 200) {
          Object.entries(response.result).map(([key, val]) => {
            if(key!='created_at' && key!='updated_at'){
                if (typeof val != "string"){
                    setInputs(values => ({...values, [key]: (val!='' && val!=null ? val : 0 )}))
                }else{
                    setInputs(values => ({...values, [key]: (val!='' && val!=null ? val : '')}))
                }
            } 
          })
        }
    });
  };