import React, { useEffect } from 'react'
import Hb from "../reusable/Hb";
import AppWidgetSummary from '../reusable/AppWidgetSummary';
import AppWebsiteVisits from './AppWebsiteVisits';
import AppCurrentVisits from './AppCurrentVisits';
import { get } from '../service/curd.service'
import { useTheme } from '@mui/material/styles';
import config from "../config";

const DashboardComp = () => {

  const { patient } = config; 

  useEffect(() => {
    onInit();
  }, [])

  const onInit = async() => {
    // get last 30 days details
    console.log('first-data', new Date(new Date().setDate(new Date().getDate() - 3)).toISOString())
    const visited = await get(patient, `createdAt:lt:${new Date(new Date().setDate(new Date().getDate() - 3)).toISOString()}`);
    console.log('visited', visited);
  }


  const theme = useTheme();
  return (
    <div>
      <Hb text="Dash Board" />
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <AppWidgetSummary title="New Patients This month" total="71K" icon='users' />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <AppWidgetSummary title="In Hospital Patient" total="15" icon='stethoscope' />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <AppWidgetSummary title="Weekly Sales" total="20" icon='users' />
        </div>
        <div className="col-md-3 col-sm-6 col-xs-12">
          <AppWidgetSummary title="Weekly Sales" total="31" icon='users' />
        </div>


        <div className="col-md-8 col-sm-6 col-xs-12 mt-3">
          <AppWebsiteVisits
            title="Website Visits"
            subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2003',
              '02/01/2003',
              '03/01/2003',
              '04/01/2003',
              '05/01/2003',
              '06/01/2003',
              '07/01/2003',
              '08/01/2003',
              '09/01/2003',
              '10/01/2003',
              '11/01/2003',
            ]}
            chartData={[
              {
                name: 'Team A',
                type: 'column',
                fill: 'solid',
                data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
              },
              {
                name: 'Team B',
                type: 'area',
                fill: 'gradient',
                data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
              },
              {
                name: 'Team C',
                type: 'line',
                fill: 'solid',
                data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
              },
            ]}
          />
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12 mt-3">
          <AppCurrentVisits
            title="Current Visits"
            chartData={[
              { label: 'America', value: 4344 },
              { label: 'Asia', value: 5435 },
              { label: 'Europe', value: 1443 },
              { label: 'Africa', value: 4443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.secondary.main,
              theme.palette.error.main,
              theme.palette.info.main,
            ]} 
            subheader="(+43%) than last year"
            />
        </div>
      </div>
    </div>
  )
}

export default DashboardComp