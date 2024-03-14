import React, { useEffect, useState } from "react";

import Rating from "@mui/material/Rating";
import { ReactComponent as PriceTag } from "../../../icons/price-tag.svg";
import { RatingComponent } from "../../../components/FormStyle";
import { ThemeProvider } from "@mui/material/styles";
import "../../Style/GeneralDirectory.css";
import RequestPricing from "./RequestPricing";
import HeartButton from "./HeartButton";
import * as GeneralJS from "../General";

const RenderList = (props) => {
  const formvalues                      = props.formvalues;
  const stateOptions                    = props.stateOptions;
  const [data, setData]                 = useState([]);
  
  useEffect(() => {
    GeneralJS.fetchDirectoryList(formvalues,setData);
  }, [formvalues.sort]);

  return (
    <div className="cards-grid-container">
   {/*  <pre>{JSON.stringify(stateOptions, null, 2)}</pre> */}
        {data?.map((card,i) => {
            
            const isPlural                        = card.special !== (0 || 1);
            const formattedVotes                  = card.votes.toLocaleString();

            return (
                <div className=" relative">
                    <HeartButton stateOptions={stateOptions} vid={card.id}/>
                    <img src={card.imgSrc} className="dircard-image" />
                    <div className="dircard-info  space-y-[5px]">
                        <h5 className="direcard-location text-[#8e8e8e]">{card.region},{card.state}</h5>
                        <h2 className="header font-[500]">{card.vname}</h2>

                        {/* Rating info */}
                        <ThemeProvider theme={RatingComponent}>
                        <div className="rating-ifno-div space-x-2">
                            <h5 className="font-semibold text-[16px] ">{card.rating}</h5>
                            <Rating
                            name="half-rating-read"
                            size="medium"
                            precision={0.25}
                            value={card.rating}
                            readOnly
                            />
                            <span className="text-[#8e8e8e]  ">({formattedVotes})</span>
                        </div>
                        </ThemeProvider>

                        {/* Special Tag */}
                        <div className="flex justify-start items-end space-x-2">
                        <PriceTag style={{ width: "22px", height: "22px" }} />
                        <div className="font-semibold">
                            <span>
                            <span className="font-source-pro">{card.special}</span>{" "}
                            <span className="small-x">x</span> Special{isPlural ? "s" : ""}
                            </span>
                        </div>
                        </div>
                        <RequestPricing stateOptions={stateOptions} vid={card.id} vname={card.vname} />
                    </div>
                    </div>
            );
        })}
    </div>
  );
};

export default RenderList;
