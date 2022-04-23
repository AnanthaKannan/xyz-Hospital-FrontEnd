// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';
import Icons from './Icons';
import { widgetType } from '../type/type'
// utils
// import { fShortenNumber } from '../../../utils/formatNumber';
// components
// import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));


export default function AppWidgetSummary({ title, total, icon='users', color='primary' }:widgetType) {
  return (
   
    <div className="dashboard-card ">
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
              theme.palette[color].dark,
              0.24
            )} 100%)`,
        }}
      >
        <Icons icon={icon} />
      </IconWrapperStyle>

      <Typography variant="h3">{ total }</Typography>

      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        {title}
      </Typography>
      </div>
   
  );
}
