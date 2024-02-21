  {/* {item.CategorySettings.map(
                            (categorySetting, index) => {
                              return (
                                <React.Fragment key={index}>
                                  {categorySetting.min_max === "1" ? (
                                    <p>{categorySetting.head_title}</p>
                                  ) : categorySetting.head_titletype === "1" ? (
                                    <React.Fragment>
                                      {/* price per head */}
                                      {categorySetting.head_title ===
                                      "Price per head" ? (
                                        <>
                                          <div className="mt-[10px] relative">
                                            <h5 className="font-semibold flex flex-col">
                                              {categorySetting.head_title}
                                            </h5>
                                            <div className="">
                                              <span className="dollar-icon"></span>
                                              <input
                                                name="pricepp"
                                                type="number"
                                                required
                                                className="pricing-input-style"
                                                onChange={(e) =>
                                                  handlePricingInputChange(
                                                    item.Categoryid,
                                                    e.target.value
                                                  )
                                                }
                                              />
                                            </div>
                                          </div>

                                          <div className="myprofile-button-group relative">
                                            <div>
                                              <h5 className="font-semibold">
                                                Display Price ?
                                              </h5>
                                              <div className="mt-[10px] space-x-2">
                                                <button
                                                  className={`yes-button ${
                                                    pricingDisplayStates[
                                                      item.Categoryid
                                                    ]
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    handleDisplayChange(
                                                      item.Categoryid,
                                                      1
                                                    )
                                                  }
                                                >
                                                  Yes
                                                </button>
                                                <button
                                                  className={`no-button ${
                                                    pricingDisplayStates[
                                                      item.Categoryid
                                                    ] === 0
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    handleDisplayChange(
                                                      item.Categoryid,
                                                      0
                                                    )
                                                  }
                                                >
                                                  No
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      ) : null}
                                      {/* Seated style */}
                                      {categorySetting.head_title ===
                                      "Enable Seated" ? (
                                        <div className="pricing-addons-container">
                                          <div className="pricing-addon-label ">
                                            <h5 className="l">Seated Style</h5>
                                          </div>
                                          <input
                                            type="number"
                                            required
                                            className="capacity-input-style"
                                            onChange={(e) =>
                                              handleSeatedStyleChange(
                                                item.Categoryid,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      ) : null}
                                      {/* Capacity */}
                                      {categorySetting.head_title ===
                                      "Capacity" ? (
                                        <div className="pricing-addons-container">
                                          <div className="pricing-addon-label ">
                                            <h5 className="l">Capacity:</h5>
                                          </div>
                                          <input
                                            name="capacity"
                                            type="number"
                                            required
                                            className="capacity-input-style"
                                            onChange={(e) =>
                                              handleCapacityChange(
                                                item.Categoryid,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      ) : null}
                                      {/* Accomodation */}
                                      {categorySetting.head_title ===
                                      "Accomodation Availability" ? (
                                        <div className="myprofile-button-group relative">
                                          <div className="mt-[15px]">
                                            <h5 className="font-semibold">
                                              Accomodation Availability
                                            </h5>
                                            <div className="mt-[15px] space-x-2">
                                              <button
                                                className={`yes-button ${
                                                  accomState[item.Categoryid]
                                                    ? "selected"
                                                    : ""
                                                }`}
                                                onClick={() =>
                                                  handleAccomodationChange(
                                                    item.Categoryid,
                                                    1
                                                  )
                                                }
                                              >
                                                Yes
                                              </button>
                                              <button
                                                className={`no-button ${
                                                  accomState[
                                                    item.Categoryid
                                                  ] === 0
                                                    ? "selected"
                                                    : ""
                                                }`}
                                                onClick={() =>
                                                  handleAccomodationChange(
                                                    item.Categoryid,
                                                    0
                                                  )
                                                }
                                              >
                                                No
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      ) : null}
                                      {categorySetting.head_title ===
                                      "Cocktail" ? (
                                        <div className="pricing-addons-container">
                                          <div className="pricing-addon-label ">
                                            <h5 className="l">Cocktail:</h5>
                                          </div>
                                          <input
                                            name="cockTail"
                                            type="number"
                                            required
                                            className="capacity-input-style"
                                            onChange={(e) =>
                                              handleCocktailChange(
                                                item.Categoryid,
                                                e.target.value
                                              )
                                            }
                                          />
                                        </div>
                                      ) : null}
                                    </React.Fragment>
                                  ) : categorySetting.head_titletype === "2" ? (
                                    <p>{categorySetting.head_title}</p>
                                  ) : null}
                                </React.Fragment>
                              );
                            }
                          )}