import React, {FC} from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {ForgotPasswordInput, LoginPopoverInputs} from './index'
import {HandlerClose, TabPanelProps} from '../Types'



function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Box>{children}</Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SimpleTabs: FC<HandlerClose> = ({handlerClose}) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Login" {...a11yProps(0)}/>
          <Tab label="Forgot Password" {...a11yProps(1)} />
        </Tabs>
      <TabPanel value={value} index={0}>
        <LoginPopoverInputs  handlerClose={handlerClose}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ForgotPasswordInput handlerClose={handlerClose}/>
      </TabPanel>
    </div>
  );
}

export default SimpleTabs