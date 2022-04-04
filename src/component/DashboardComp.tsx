import React from 'react'
import WightCard from '../reusable/WightCard';
import Hb from "../reusable/Hb";

const DashboardComp = () => {
  return (
    <div>
        <Hb text="Dash Board" />
        <div className="row">
          <div className="col-md-3">
            <WightCard number={100} text="Doctors" />
          </div>
          <div className="col-md-3">
            <WightCard number={100} text="Patients" />
          </div>
          <div className="col-md-6"></div>
          <div className="col-md-3">
            <WightCard number={100} text="In Ward" />
          </div>
          <div className="col-md-3">
            <WightCard number={100} text="Total Visited today" />
          </div>

        </div>
    </div>
  )
}

export default DashboardComp