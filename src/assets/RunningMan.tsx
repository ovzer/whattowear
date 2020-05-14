import React from 'react';
import { SvgIcon } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { IClothes } from '../components/Clothes';

interface IRunningMan {
  currentClothes: IClothes;
}

export const RunningMan: React.FC<IRunningMan> = (props) => {
  const { currentClothes } = props;
  const theme = useTheme();
  return (
    <SvgIcon viewBox="215.833 539.793 146.596 176.81" style={{ fontSize: 300 }}>
      <path
        fill={theme.palette.common.white}
        d="M299.017,580.318c25.508,2.61,52.751,15.069,63.413-5.089c-3.519,28.037-26.632,29.404-55.596,26.388
	c-9.156,22.938-12.053,29.541-17.982,40.064c63.198,7.135,13.981,50.152-0.667,74.921c7.983-35.39,31.251-56.959-9.435-53.507
	c-18.583,27.738-41.916,42.071-62.916,51.738c44.333-47.667,46.272-66.454,61.457-113.762c-20.333-0.137-39.846,5.5-52.787,28.091
	C238.537,586.687,273.509,577.708,299.017,580.318z"
      />
      <ellipse fill={theme.palette.common.white} transform="matrix(0.9848 0.1736 -0.1736 0.9848 101.4322 -44.3708)" cx="304.294" cy="557.497" rx="12.833" ry="17.833" />
    // Votter
      <path
        fill={theme.palette.secondary.main} d="M229,612.501c-0.667,3.5-5.333,7.667-6.333,12s3.163,11.167,5.915,6.5s2.919-8.333,4.752-10.5
		s3.654-3.363,2.5-4S229.53,609.718,229,612.501z"
      />
      <path
        fill={theme.palette.secondary.main} d="M356.333,580.167c1.667-0.5,3.834-2.666,4.334-5.666s1.763-3.501,1.763,3.166s-0.931,7.167-1.097,9.167
		S354.666,580.667,356.333,580.167z"
      />
    // Lue
      <path
        fill={theme.palette.secondary.main} visibility={currentClothes.head.lue.shouldWear ? 'visible' : 'hidden'} d="M318.528,555.144c-0.372-8.179-4.645-14.824-10.884-15.925
		c-6.802-1.198-13.65,4.595-16.435,13.347C303.879,554.485,312.582,555.116,318.528,555.144z"
      />
    //Pannebånd
      <path
        fill={theme.palette.secondary.main} visibility={currentClothes.head.panneband.shouldWear ? 'visible' : 'hidden'} d="M296.612,543.174c-2.318,2.338-4.226,5.497-5.402,9.195
		c12.669,1.921,21.373,2.552,27.319,2.578c-0.163-3.565-1.067-6.839-2.551-9.488C311.687,545.225,305.87,544.675,296.612,543.174z"
      />
    // Supertrøye
      <path
        fill={theme.palette.secondary.main} d="M299.017,580.318c-20.995-2.148-48.391,3.573-65.257,29.344
		c0.84,1.002,1.868,1.939,3.77,3.656c11.504-9.56,25.427-12.343,39.761-12.246c-4.818,15.011-8.303,27.148-12.232,38.25
		c10.208,1.567,5.065,0.919,23.793,2.359c5.93-10.523,8.826-17.126,17.982-40.064c20.952,2.183,38.838,2.063,48.464-8.78
		c-1.108-1.912-1.771-2.402-4.847-7.569C337.107,589.34,317.605,582.221,299.017,580.318z"
      />
    // Bukser
      <path
        fill={theme.palette.secondary.main} visibility={currentClothes.lowerBody.tights.shouldWear ? 'visible' : 'hidden'} d="M237.724,703.048c14.387-9.145,28.744-21.619,41.026-39.952
		c35.23-2.989,22.51,12.784,13.281,40.044c1.965-0.117,3.898-0.229,5.785-0.333c18.398-24.435,43.6-55.19-8.964-61.125
		c-12.584-1.131-17.909-1.696-23.755-2.466c-7.075,20.021-15.582,36.657-35.91,60.633
		C231.275,701.277,234.196,702.313,237.724,703.048z"
      />
    // Overtrekkstrøye
      <path
        fill={theme.palette.secondary.main} d="M289.132,577.5c-12.465,0.167-26.965,4.666-32.632,7s-10,6.333-13,10s-8.598,8.933-11.167,13.882
		s2.848,6.156,4.5,7.119c2,1.166,6.833-6.452,10.833-7.119s6.833-3.048,11.5-4.381s7.667-1.501,10.667-0.834s5.476-0.119,2.81,5.215
		S268.5,621.5,267.5,625.5s-6.091,9.635-3.667,10s25.667,3.334,29,3.667s2,0.001,3.333-4.333s7.254-15,8.127-19
		s3.873-12.334,10.873-11.334s16,0.334,21.333-0.666s15.334-5,18.667-8s6.5-4,5-6.667c-1.585-2.818-4.241-8.438-6.908-8.104
		s-1.092,1.104-6.092,3.104s-12.334,1.667-18.334,0S315.5,581.166,311.5,580.5S301.598,577.333,289.132,577.5z"
      />
    // Overtrekksbukse
      <path
        fill={theme.palette.secondary.main} visibility={currentClothes.lowerBody.overtrekksbukse.shouldWear ? 'visible' : 'hidden'} d="M261.526,644.555c-1.071,2.666-6.026,14.279-9.36,20.779c-1.725,3.362-8.719,9.568-11.333,15.667
		c-3,7-8.5,13.332-11.5,16.666s3.666,9.666,7.833,7s13.301-7.449,18.833-13.5c5.333-5.833,15.667-16.167,19-20.5
		s3.667-7.499,7.833-6.166S297.5,663,299.5,666.334c2,3.334-0.167,10.833-2.333,15c-2.167,4.167-3.555,11.334-5.888,16.167
		s7.785,7.166,10.721,3.333s12.619-19.834,15.31-23.667s6.024-15.666,3.857-20.333s-7.834-11.166-14.167-12.833
		s-10.942-3.001-15.721-3.334s-22.636-2.033-25.802-2.533S262.597,641.889,261.526,644.555z"
      />
    // Buff
      <path
        fill={theme.palette.secondary.main} visibility={currentClothes.head.buff.shouldWear ? 'visible' : 'hidden'} d="M291.279,571.501c-0.241,2.022-0.279,4.166-1.279,5.666s-2.942,3.333,1.279,3.5s11.888,0.667,14.888,1.667
		s5.332,0.167,4.666-2.5s-0.271-2.762,0.114-4.631s1.052-4.868-2.114-3.702s-12.889-1.62-14.667-2.667
		S291.52,569.479,291.279,571.501z"
      />
    </SvgIcon>
  );
};