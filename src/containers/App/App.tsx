import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { getWeather } from '../../functions/getWeather'
import { Menu } from '../../components/Menu'

const App = () => {
  useEffect(()=> {
    getWeather();
  }, []);

  return (
    <>
    <Menu></Menu>
    <Button variant="contained" color="primary">
      Hello World
    </Button>
    </>
  );
}

export default App;
