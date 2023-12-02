import React from 'react'
import CoupleTopbar from '../Couples/Sidebar/CoupleTopbar'

const LayoutCouple = (props) => {
  return (
    // <div>LayoutCouple</div>
    <div className="relative flex">
      <CoupleTopbar />
      <div className="flex flex-1">
        <main className="rootLayout">{props.children}</main>
      </div>
    </div>
  );
}

export default LayoutCouple