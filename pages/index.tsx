import Form from "../components/Form";
import TodoList from "../components/TodoList";
import SnapshotSet from "../components/SnapshotSet"
import SnapshotModal from "../components/SnapshotModal";
import ActivityModal from "../components/ActivityModal";
import ActivitySet from "../components/ActivitySet";
import { Container, Grid } from "@mui/material"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState } from "react";
import TabPanel from "../components/TabPanel";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "../styles/themes";
import { activityModalState, activityReportModalState, snapshotModalState } from "../atoms/recoil_state";
import { useRecoilState } from "recoil";
import ActivityReport from "../components/ActivityReport";
import useAuth from '../hooks/useAuth'

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = useState(0);
  const [showModal, setShowModal] = useRecoilState(snapshotModalState)
  const [showActivityModal, setShowActivityModal] = useRecoilState(activityModalState)
  const [showActivityReportModal, setShowActivityReportModal] = useRecoilState(activityReportModalState)
  const { loading } = useAuth()
  const { logout } = useAuth()

  if (loading) return null

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Activity Log" {...a11yProps(0)} />
              <Tab label="Structured Journal" {...a11yProps(1)} />
              <Tab label="Current Queue" {...a11yProps(2)} />
            </Tabs>
            <img
              src="https://occ-0-1190-2774.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABbme8JMz4rEKFJhtzpOKWFJ_6qX-0y5wwWyYvBhWS0VKFLa289dZ5zvRBggmFVWVPL2AAYE8xevD4jjLZjWumNo.png?r=a41"
              alt=""
              className="cursor-pointer rounded absolute top-2 right-2"
              onClick={logout}
            />
          </Box>
          <TabPanel value={value} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <TodoList />
              </Grid>
              <Grid item xs={12} md={8}>
                <ActivitySet />
              </Grid>
              <Grid item xs={12} md={6}>
                {showActivityModal && <ActivityModal />}
                {showActivityReportModal && <ActivityReport />}
              </Grid>
            </Grid>

          </TabPanel>
          <TabPanel value={value} index={1}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Form />
              </Grid>
              <Grid item xs={12} md={8}>
                <SnapshotSet />
              </Grid>
              <Grid item xs={12} md={6}>
                {showModal && <SnapshotModal />}
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={2}>
            Write down what is going to happen here.
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
