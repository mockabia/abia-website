import axios from "axios";
import * as apiServices from "../api/apiServices";
import * as apiUrls from "../api/apiUrls";
import * as servicePage from "../services/signupPageService";

export  const fetchState = async () => {
  await servicePage.stateDropdown();
};

// export const fetchState = async () => {
//   try {
//     const response = await axios.get(
//       "https://abia.abia-test.com/web/WebStateDropdown"
//     );
//     if (response.status === 200) {
//       return response.data.result.map((item) => ({
//         value: item.url,
//         label: item.label,
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching options from the API:", error);
//     return []; // Return an empty array in case of an error
//   }
// };

// export const fetchServices = async () => {
//   try {
//     const response = await axios.get(
//       "https://abia.abia-test.com/web/WebVCategoryDropdown"
//     );
//     if (response.status === 200) {
//       return response.data.result.map((item) => ({
//         value: item.value,
//         label: item.label,
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching options from the API:", error);
//     return []; // Return an empty array in case of an error
//   }
// };

// export const fetchBookings = async () => {
//   try {
//     const response = await axios.get(
//       "https://abia.abia-test.com/web/WebServiceperyearDropdown"
//     );
//     if (response.status === 200) {
//       return response.data.result.map((item) => ({
//         value: item.value,
//         label: item.label,
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching options from the API:", error);
//     return []; // Return an empty array in case of an error
//   }
// };

// export const fetchFindUs = async () => {
//   try {
//     const response = await axios.get(
//       "https://abia.abia-test.com/web/WebFindUsDropdown"
//     );
//     if (response.status === 200) {
//       return response.data.result.map((item) => ({
//         value: item.value,
//         label: item.label,
//       }));
//     }
//   } catch (error) {
//     console.error("Error fetching options from the API:", error);
//     return []; // Return an empty array in case of an error
//   }
// };
