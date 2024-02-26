import React, { useEffect, useState } from "react";
import { TfiEmail } from "react-icons/tfi";
import { BlackLargeButton, BlackSmallButton, } from "../../../components/FormStyle";

import DetailedEnquiry from "./DetailedEnquiry";

function RenderEnquiries(props) {
    const data                                = props.data;
    const archieved                           = props.archieved ? props.archieved : false;
    const [detailOpen, setDetailOpn]          = useState(false);
    const [clickedEnquiry, setClickedEnquiry] = useState({});

    const toggleOpen = (clickEnq) => {
        /* setDetailOpn((prevState) => ({
          ...prevState,
          [vendorId]: !prevState[vendorId],
        })); */
        setDetailOpn(!detailOpen)
        setClickedEnquiry(clickEnq)
    };

    return (
        <>
            {data?.map((enquiry) => {
                return (
                    <div className="active-enquiry-mobile">
                        <div
                            className=" flex justify-between items-center gap-[1rem]"
                            onClick={() => toggleOpen(enquiry)}
                        >
                            {/* image section and Heading */}
                            <div className="flex items-center gap-[1rem]">
                                <img
                                    src={enquiry.imageUrl}
                                    className="enquiry-vendor-image"
                                />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-[#000]">{enquiry.vname}</h3>
                                    <div>
                                        <h5>{enquiry.category}</h5>
                                    </div>
                                </div>
                            </div>

                            {/* Reply button */}
                            {archieved!="1" && (
                             <div className="cursor-pointer">
                                <BlackSmallButton>
                                    {enquiry.status === "0" ? (
                                        <h6>View </h6>
                                    ) : (
                                        <h6>Reply</h6>
                                    )}
                                </BlackSmallButton>
                            </div>           
                            )}
                        </div>
                        {/* Status */}
                        <div className="mt-[0.5rem]">
                            <div className="enquiry-status-mobile">
                                <div className="flex items-center gap-3">
                                    <TfiEmail />
                                    <div className="flex gap-[1rem]">
                                        <h6>{enquiry.last_contact}</h6>
                                        <h6>{enquiry.vendorStatus}</h6>
                                    </div>
                                </div>
                                {archieved!="1" && (
                                 <div className="text-red-600 font-bold">
                                    {enquiry.status === "0" ? (
                                        <h6> </h6>
                                    ) : (
                                        <h6>Reply Needed</h6>
                                    )}
                                </div>       
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}


            {/* Active Desktop */}
            <div className="active-enquiry-desktop">
                <table className="enquiry-table">
                    <thead className="enquiry-table-header">
                        <tr>
                            <th>Vendor Name</th>
                            <th>Vendor Type</th>
                            <th>Status</th>
                            {archieved!="1" && (<th>Actions</th>)}
                        </tr>
                    </thead>
                    {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
                    <tbody>
                        {data?.map((enquiry) => {
                            return (
                                <tr
                                    className="enquiry-body-row cursor-pointer"
                                    key={enquiry.id}
                                >
                                    {/* Vendor image and Name */}
                                    <td onClick={() => toggleOpen(enquiry)}>
                                        <div className="flex gap-[1rem] justify-start items-center">
                                            <img
                                                src={enquiry.imageUrl}
                                                className="enquiry-vendor-image"
                                                alt="Vendor"
                                            />
                                            <h6 className="font-bold">{enquiry.vname}</h6>
                                        </div>
                                    </td>

                                    {/* Vendor Category */}
                                    <td onClick={() => toggleOpen(enquiry)}>
                                        <div className="flex justify-start items-center">
                                            <h6>{enquiry.category}</h6>
                                        </div>
                                    </td>
                                    {/* Status */}
                                    <td onClick={() => toggleOpen(enquiry)}>
                                        <div className="enquiry-status">
                                            <TfiEmail />
                                            <div className="flex whitespace-nowrap">
                                                <h6>{enquiry.last_contact}</h6>
                                                <h6 className="pl-[1rem] pr-[1rem] w-[7rem]">
                                                    {enquiry.vendorStatus}
                                                </h6>
                                            </div>
                                            {archieved!="1" && (
                                            <div className="text-red-600 font-bold whitespace-nowrap">
                                                {enquiry.status === "0" ? (
                                                    <h6> </h6>
                                                ) : (
                                                    <h6>Reply Needed</h6>
                                                )}
                                            </div>
                                            )}
                                        </div>
                                    </td>
                                    {/* Actions */}
                                    {archieved!="1" && (
                                      <td>
                                        <BlackLargeButton>
                                            {enquiry.status === "0" ? (
                                                <h6>View Enquiry</h6>
                                            ) : (
                                                <h6>Reply to Vendor</h6>
                                            )}
                                        </BlackLargeButton>
                                    </td>  
                                    )}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            {detailOpen && (<DetailedEnquiry enquiry={clickedEnquiry} open={detailOpen} setOpen={setDetailOpn} />)}
        </>
    );
}

export default RenderEnquiries;