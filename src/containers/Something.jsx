import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import ImgList from "components/ImgList";
import Upload from "components/Upload";
import produce from "immer";
import React, { useCallback, useState } from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </Grid>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default () => {
  const [value, setValue] = useState(0);
  const [item, setItem] = useState({
    category: "",
    name: "",
    place: "",
    placeFloor: "",
    at: "",
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeItem = useCallback((event, name) => {
    setItem(
      produce((draft) => {
        draft[name] = event.target.value;
      })
    );
  }, []);

  return (
    <>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="基础信息" {...a11yProps(0)} />
          <Tab label="更多信息" {...a11yProps(0)} />
          <Tab label="交易信息" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <Grid item container justifyItems="center" spacing={1}>
          <Grid item xs={12}>
            <Upload keyName="goods" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="分类"
              value={item.category}
              onChange={(e) => handleChangeItem(e, "category")}
            />
            <TextField
              label="地点"
              value={item.place}
              onChange={(e) => handleChangeItem(e, "place")}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">楼层</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="楼层"
                value={item.placeFloor}
                onChange={(e) => handleChangeItem(e, "placeFloor")}
              >
                <MenuItem value={1}>一楼</MenuItem>
                <MenuItem value={2}>二楼</MenuItem>
                <MenuItem value={3}>三楼</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="放在"
              value={item.at}
              onChange={(e) => handleChangeItem(e, "at")}
            />
            <TextField
              label="名字"
              value={item.name}
              onChange={(e) => handleChangeItem(e, "name")}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              添加
            </Button>
          </Grid>
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid item xs={12}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography> 更多照片？</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ImgList />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12}>
          <TextField label="标签" />
        </Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
        交易
      </TabPanel>
    </>
  );
};
