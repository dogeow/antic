import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ImgList from "components/ImgList";
import Upload from "components/Upload";
import React from "react";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Grid
      item
      container
      spacing={2}
      xs={12}
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

const EmojiCreate = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2} justify="center" alignItems="flex-end">
      <Grid item xs={12}>
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
      </Grid>
      <TabPanel value={value} index={0}>
        <Upload keyName="goods" />
        <Grid container justify="space-between">
          <Grid item xs>
            <TextField label="分类" />
          </Grid>
          <Grid item xs>
            <TextField label="名字" />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            添加
          </Button>
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
    </Grid>
  );
};

export default EmojiCreate;
