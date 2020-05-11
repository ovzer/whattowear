import React, { useEffect, useState } from 'react';
import { Box, Typography, makeStyles, Paper, SvgIcon, fade } from '@material-ui/core';

import { CustomPaper } from '../uiComponents/CustomPaper';
import { RunningMan } from '../assets/RunningMan';
import { clothes } from '../clothes';

interface IClothesProps {
  apparentTemperature: number | undefined;
}

interface IClothObject {
  [name: string]: {
    range: number[];
    text: string;
    shouldWear: boolean;
  };
}

export interface IClothes {
  head: IClothObject;
  upperBody: IClothObject;
  lowerBody: IClothObject;
}

interface IRenderClothes {
  clothObject: IClothObject;
}

const useStyles = makeStyles((theme) => ({
  smallPaper: {
    padding: theme.spacing(3),
    margin: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.1),
  },
  largePaper: {
    padding: theme.spacing(3),
    minWidth: 600,
  },
}));

const RenderClothes: React.FC<IRenderClothes> = (props) => {
  const { clothObject } = props;

  if (!Object.entries(clothObject).some((cloth) => cloth[1].shouldWear)) {
    return null;
  }
  return (
    <Box margin={1}>
      <CustomPaper>{
        Object.entries(clothObject).map((cloth) => {
          if (cloth[1].shouldWear) {
            return (
              <Typography key={cloth[0]}>{cloth[1].text}</Typography>
            );
          }
        })}
      </CustomPaper>
    </Box>
  );
};

export const Clothes: React.FC<IClothesProps> = (props) => {
  const { apparentTemperature } = props;
  const [currentClothes, setCurrentClothes] = useState<IClothes>(clothes);

  useEffect(() => {
    const setShouldWear = (clothObject: IClothObject) => {
      const newClothObject: IClothObject = {};
      for (const [key, cloth] of Object.entries(clothObject)) {
        newClothObject[key] = {
          ...cloth,
          shouldWear: apparentTemperature !== undefined && cloth.range[0] < apparentTemperature && cloth.range[1] > apparentTemperature,
        };
      }
      return newClothObject;
    };

    setCurrentClothes({
      head: setShouldWear(clothes.head),
      upperBody: setShouldWear(clothes.upperBody),
      lowerBody: setShouldWear(clothes.lowerBody),
    });

  }, [apparentTemperature]);

  return (
    <Box display="flex" flexDirection="row" justifyContent="space-between" alignItems="center" mt={2}>
      {/* <Box flex={1}>
          <RunningMan currentClothes={currentClothes} />
        </Box> */}
      <Box display="flex" flexDirection="column">
        <RenderClothes clothObject={currentClothes.head} />
        <RenderClothes clothObject={currentClothes.upperBody} />
        <RenderClothes clothObject={currentClothes.lowerBody} />
      </Box>
    </Box>
  );
};
