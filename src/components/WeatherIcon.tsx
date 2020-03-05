import React from 'react';
import Icon from '@mdi/react';
import {
  mdiWeatherSunny,
  mdiWeatherPartlyCloudy,
  mdiWeatherCloudy,
  mdiWeatherPartlyRainy,
  mdiWeatherLightningRainy,
  mdiWeatherPartlySnowyRainy,
  mdiWeatherPartlySnowy,
  mdiWeatherRainy,
  mdiWeatherSnowyRainy,
  mdiWeatherSnowy,
  mdiWeatherFog,
  mdiWeatherPartlyLightning,
  mdiWeatherLightning,
  mdiWeatherPouring,
  mdiWeatherSnowyHeavy,
  mdiWeatherNight,
  mdiWeatherNightPartlyCloudy,
} from '@mdi/js';

interface IWeatherIconProps {
  symbol: number;
  night: boolean;
  color?: string;
}

interface ISymbolDefinition {
  [name: number]: {
    name: string;
    icon: string;
    nightIcon?: string;
  };
}

const symbolDefinition: ISymbolDefinition = {
  1 : {
    name: 'Sun',
    icon: mdiWeatherSunny,
    nightIcon: mdiWeatherNight,
  },
  2 : {
    name: 'LightCloud',
    icon: mdiWeatherPartlyCloudy,
    nightIcon: mdiWeatherNightPartlyCloudy,
  },
  3 : {
    name: 'PartlyCloud',
    icon: mdiWeatherPartlyCloudy,
    nightIcon: mdiWeatherNightPartlyCloudy,
  },
  4 : {
    name: 'Cloud',
    icon: mdiWeatherCloudy,
  },
  5 : {
    name: 'LightRainSun',
    icon: mdiWeatherPartlyRainy,
    nightIcon: mdiWeatherRainy,
  },
  6 : {
    name: 'LightRainThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  7 : {
    name: 'SleetSun',
    icon: mdiWeatherPartlySnowyRainy,
    nightIcon: mdiWeatherSnowyRainy,
  },
  8 : {
    name: 'SnowSun',
    icon: mdiWeatherPartlySnowy,
    nightIcon: mdiWeatherSnowy,
  },
  9 : {
    name: 'LightRain',
    icon: mdiWeatherPartlyRainy,
    nightIcon: mdiWeatherRainy,
  },
  10 : {
    name: 'Rain',
    icon: mdiWeatherRainy,
    nightIcon: mdiWeatherRainy,
  },
  11 : {
    name: 'RainThunder',
    icon: mdiWeatherLightningRainy,
  },
  12 : {
    name: 'Sleet',
    icon: mdiWeatherSnowyRainy,
  },
  13 : {
    name: 'Snow',
    icon: mdiWeatherSnowy,
  },
  14 : {
    name: 'SnowThunder',
    icon: mdiWeatherSnowy,
  },
  15 : {
    name: 'Fog',
    icon: mdiWeatherFog,
  },
  20 : {
    name: 'SleetSunThunder',
    icon: mdiWeatherPartlyLightning,
    nightIcon: mdiWeatherLightning,
  },
  21 : {
    name: 'SnowSunThunder',
    icon: mdiWeatherPartlyLightning,
    nightIcon: mdiWeatherLightning,
  },
  22 : {
    name: 'LightRainThunder',
    icon: mdiWeatherLightningRainy,
  },
  23 : {
    name: 'SleetThunder',
    icon: mdiWeatherLightning,
  },
  24 : {
    name: 'DrizzleThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  25 : {
    name: 'RainThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  26 : {
    name: 'LightSleetThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  27 : {
    name: 'HeavySleetThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  28 : {
    name: 'LightSnowThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  29 : {
    name: 'HeavySnowThunderSun',
    icon: mdiWeatherLightningRainy,
  },
  30 : {
    name: 'DrizzleThunder',
    icon: mdiWeatherLightningRainy,
  },
  31 : {
    name: 'LightSleetThunder',
    icon: mdiWeatherLightningRainy,
  },
  32 : {
    name: 'HeavySleetThunder',
    icon: mdiWeatherLightningRainy,
  },
  33 : {
    name: 'LightSnowThunder',
    icon: mdiWeatherLightningRainy,
  },
  34 : {
    name: 'HeavySnowThunder',
    icon: mdiWeatherLightningRainy,
  },
  40 : {
    name: 'DrizzleSun',
    icon: mdiWeatherPartlyRainy,
    nightIcon: mdiWeatherRainy,
  },
  41 : {
    name: 'RainSun',
    icon: mdiWeatherPartlyRainy,
    nightIcon: mdiWeatherRainy,
  },
  42 : {
    name: 'LightSleetSun',
    icon: mdiWeatherPartlySnowyRainy,
    nightIcon: mdiWeatherSnowyRainy,
  },
  43 : {
    name: 'HeavySleetSun',
    icon: mdiWeatherPartlySnowyRainy,
    nightIcon: mdiWeatherSnowyRainy,
  },
  44 : {
    name: 'LightSnowSun',
    icon: mdiWeatherPartlySnowy,
    nightIcon: mdiWeatherSnowy,
  },
  45 : {
    name: 'HeavysnowSun',
    icon: mdiWeatherPartlySnowy,
    nightIcon: mdiWeatherSnowy,
  },
  46 : {
    name: 'Drizzle',
    icon: mdiWeatherRainy,
  },
  47 : {
    name: 'LightSleet',
    icon: mdiWeatherRainy,
  },
  48 : {
    name: 'HeavySleet',
    icon: mdiWeatherPouring,
  },
  49 : {
    name: 'LightSnow',
    icon: mdiWeatherSnowy,
  },
  50 : {
    name: 'HeavySnow',
    icon: mdiWeatherSnowyHeavy,
  },
};

export const WeatherIcon: React.FC<IWeatherIconProps> = (props) => {
  const { symbol, night, color } = props;

  if (!(symbol in symbolDefinition)) {
    return null;
  }

  const icon = (): string => {
    if (night) {
      const { nightIcon } = symbolDefinition[symbol];
      if (nightIcon !== undefined) {
        return nightIcon;
      }
    }
    return symbolDefinition[symbol].icon;
  };

  return (
    <Icon
      path={icon()}
      size={4}
      horizontal
      vertical
      rotate={180}
      color={color ? color : 'inherit'}
    />
  );
};
