import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

const PageOneMobile = () => {
  const form = useForm();
  const { register } = form;

  return (
    <section className="register-container-1  relative">
      <div class=" register-page1-div1">
        <div className="register-mobile-input-section">
          <div className="register-counter">1/2</div>
          <br />
          <div className="register-signup-header">
            Let's get started.
            <span className="register-position-adjust">fef01</span>{" "}
          </div>
          <br />
          {/* business name */}
          <div>
            <label htmlFor="bname" className="text-[14px] font-bold">
              Business Name *
            </label>
            <input
              id="bname"
              type="text"
              className="signup-input-style"
              {...register("bname")}
            />
          </div>
          {/* Email */}
          <div>
            <label className="text-[14px] font-bold">
              Email*
              <span htmlFor="email" className="register-position-adjust">
                qwertyuuuu
              </span>
            </label>
            <input
              id="email"
              type="text"
              className="signup-input-style"
              {...register("email")}
            />
          </div>{" "}
          {/* Phone */}
          <div>
            <label htmlFor="phone" className="text-[14px] font-bold">
              Phone*
              <span className="register-position-adjust">qwertyuuuu</span>
            </label>
            <input
              id="phone"
              inputMode="tel"
              type="number"
              className="signup-input-style"
              {...register("phone")}
            />
          </div>{" "}
          {/* Webisite */}
          <div>
            <label htmlFor="website" className="text-[14px] font-bold">
              Wesbite*
              <span className="register-position-adjust">qwertyuuuu</span>
            </label>
            <input
              id="website"
              type="text"
              className="signup-input-style"
              {...register("website")}
            />
          </div>{" "}
          <div>
            <label htmlFor="cname" className="text-[14px] font-bold">
              Contact Name*
            </label>
            <input
              id="cname"
              type="text"
              className="signup-input-style"
              {...register("cname")}
            />
          </div>
          <br />
        </div>
        <br />
      </div>
    </section>
  );
};

export default PageOneMobile;
