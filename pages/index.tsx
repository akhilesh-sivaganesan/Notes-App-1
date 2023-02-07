import Form from "../components/Form";
import TodoList from "../components/TodoList";
import SnapshotSet from "../components/SnapshotSet"
import SnapshotModal from "../components/SnapshotModal";
import ActivityModal from "../components/ActivityModal";
import ActivitySet from "../components/ActivitySet";
import { Button, Container, Grid } from "@mui/material"
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
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import TaskList from "../components/TaskList";
import TaskSet from "../components/TaskSet";
import TaskReportSet from "../components/TaskReportSet";
import TaskReportModal from "../components/TaskReportModal";

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
  const { user } = useAuth()


  if (loading) return null

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} className="flex flex-row items-center justify-between">
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
              <Tab label="Activity Log" {...a11yProps(0)} />
              <Tab label="Structured Journal" {...a11yProps(1)} />
              <Tab label="Current Queue" {...a11yProps(2)} />
            </Tabs>
            <div className="flex flex-row space-x-2 items-center">
              <Button onClick={logout}>
                Logout
                <ArrowLeftOnRectangleIcon
                  className="cursor-pointer rounded h-7 w-7"
                />
              </Button>

              <Typography variant="body2">{user?.email}</Typography>
            </div>
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
            <TaskList/>
            <TaskSet/>
            <TaskReportSet/>
            <TaskReportModal/>
          </TabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
