import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";

import axios from "../../instance/axios";

const useStyles = makeStyles(() => ({
  ul: {
    "& > li": {
      listStyleType: "decimal",
    },
  },
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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
        <Box sx={{ p: 1.5 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function ControlledAccordions() {
  const classes = useStyles();
  const [bookmarks, setBookmarks] = useState([]);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    axios.get("/bookmarks").then((res) => {
      setBookmarks(res.data);
    });
  }, []);

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    // 切换不同的 panel，tab 设置为 0
    setValue(0);
    setExpanded(isExpanded ? panel : false);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div style={{ width: "100%" }}>
      {Object.keys(bookmarks).map((category, index) => {
        const bookmark = bookmarks[category];
        const subCategoryCount = Object.keys(bookmark).length;
        const count = Object.values(bookmark).reduce((acc, cur) => acc + cur.length, 0);

        return (
          <Accordion
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
            key={index}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}bh-content`}
              id={`panel${index + 1}bh-header`}
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>{category}</Typography>
              <Typography sx={{ color: "text.secondary" }}>{`${subCategoryCount} 分类 ｜ ${count} 链接`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ bgcolor: "background.paper" }}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="scrollable auto tabs example"
                >
                  {Object.keys(bookmark).map((subCategory, index) => {
                    return <Tab label={subCategory} key={index} {...a11yProps} />;
                  })}
                </Tabs>
              </Box>
              {Object.keys(bookmark).map((subCategory, index) => {
                const items = bookmark[subCategory];
                return (
                  <TabPanel value={value} index={index} key={index}>
                    <ul className={classes.ul}>
                      {items.map((item, index) => (
                        <li key={index}>
                          <a href={item["url"]} target="_blank" rel="noopener noreferrer">
                            {item["title"]}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </TabPanel>
                );
              })}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
}
