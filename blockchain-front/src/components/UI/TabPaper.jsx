import { useState, cloneElement } from "react";
import { Paper, Box, Tabs, Tab } from "@mui/material";

function TabPaper(props) {
  const [tabValue, setTabValue] = useState(0);

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Paper elevation={3}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          {props.labels.map((l) => (
            <Tab key={l.level} label={l.name} {...a11yProps(l.level)} />
          ))}
        </Tabs>
      </Box>
      {/* utilizo o cloneElement para enriquecer o elemento com o value: tabValue */}
      {props.children.map(child => cloneElement(child, { value: tabValue }))}
    </Paper>
  );
}

export default TabPaper;
