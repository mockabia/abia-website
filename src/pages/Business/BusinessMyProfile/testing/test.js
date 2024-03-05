// import React, { useEffect, useState } from "react";
// import BusinessProfile1 from "./BusinessProfile-1";
// import * as BusinessJS from "../Business/Business";

// export const test = () => {
//   const [vendorinputs, setVendorInputs] = useState("");
//   const [previewSet, setpreviewSet] = useState(false);
//   const vendorID = vendorinputs.vid;

//   useEffect(() => {
//     const fetchData = async () => {
//       await BusinessJS.fetchbusiness(setVendorInputs, setpreviewSet);
//     };
//     fetchData(); // Initial data fetch
//     // Fetch data whenever vendorID changes
//     return () => fetchData(); // Cleanup function to refetch data on vendorID change
//   }, [vendorID]);

//   return (
//     <div>
//       <BusinessProfile1 vendorID={vendorID} />
//     </div>
//   );
// };
