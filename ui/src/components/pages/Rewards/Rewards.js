import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Paper,
  Divider
} from "@material-ui/core";
import ClaimIcon from "@material-ui/icons/Redeem";
import { useCookies } from "react-cookie";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useStyles } from "../../styles/tableStyle";
import { Badges } from "./Badges";


function TabPanel(props) {
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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const classes = useStyles();


  const [cookies] = useCookies();
  const [rewards, setRewards] = useState(null);
  const [stars, setStars] = useState(null);
  const [remainingStarsForReward, setRemainingStarsForReward] = useState({});
  const [level, setLevel] = useState(null);
  const [totalStarsEarned, setTotalStarsEarned] = useState(null);
  const [levelList, setLevelList] = useState(null);

  // Gets rewards and stars on page load
  useEffect(() => {
    getRewards();
    getStars();
    getLevels();
    console.log(classes);
  }, []);

  const getLevels = async () => {
    const levels = await axios.get(process.env.REACT_APP_API_ENDPOINT + `/level/all`);
    setLevelList(levels.data);
  };


  const getRewards = async () => {
    // Get rewards
    const res = await axios.get("http://localhost:8000/management/rewards");

    // Calculates remaining stars needed for reward
    const remainingStarsData = {};
    res.data.forEach((reward) => {
      const remainingStars = Math.max(reward.starsRequired - stars, 0);
      remainingStarsData[reward._id] = remainingStars;
      if (remainingStars === 0) {
        remainingStarsData[reward._id] = "Reward can now be claimed";
      }
    });

    // Set to state
    setRewards(res.data);
    setRemainingStarsForReward(remainingStarsData);
  };

  // Gets user's star count
  const getStars = async () => {
    // Get user object via getUserByEmail method
    const res = await axios.get(
      `http://localhost:8000/management/users/email/${cookies.user}`
    );

    setTotalStarsEarned(res.data.totalStarsEarned);
    setLevel(res.data.level);
    
    // Set the star count
    setStars(res.data.stars);
  };

  // Logic for claiming a reward when user clicks "Claim Reward" button
  const claimReward = async (reward) => {
    // Gets user object via getUserByEmail method (uses email stored in cookies)
    const res = await axios.get(
      `http://localhost:8000/management/users/email/${cookies.user}`
    );
    // Sets response data to user
    const user = res.data;

    // Checks if the user has enough stars to claim the reward
    if (reward.starsRequired <= stars) {
      // Subtracts the cost of the reward from the users star count
      const newStars = stars - reward.starsRequired;

      // Updates user object with their new star count
      await axios.patch(
        `http://localhost:8000/management/users/update/${user._id}`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          stars: newStars, // Updated
          totalStarsEarned: user.totalStarsEarned,
        }
      );

      toast.success("Congratulations, you have claimed a reward!");

      // Update star count on page
      getStars();

      // Save reward and user to claimedRewards table with the current date
      const currentDate = moment().format("DD/MM/YYYY, HH:mm:ss");
      await axios.post(
        "http://localhost:8000/management/rewards/claimed/save",
        {
          rewardId: reward._id,
          rewardName: reward.rewardName,
          userId: user._id,
          userEmail: user.email,
          dateClaimed: currentDate,
        }
      );
    } else {
      console.log("User does not have enough stars to claim the reward");
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
    <Box style ={{"paddingBottom":"10px"}}>
        <Typography variant="h4" style ={{"paddingBottom":"20px", "paddingLeft":"20px"}}><b>Rewards</b> </Typography>
        <Divider />
    </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Rewards" {...a11yProps(0)} style ={{"fontSize":"18px"}}/>
          <Tab label="Badges" {...a11yProps(1)} style ={{"fontSize":"18px"}}/>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
            <div className={classes.tableContainer}>
            <ToastContainer />
            <Paper className={classes.paper}>
                <Typography variant="h4">
                <b>Rewards</b>
                </Typography>
                <Box>
                <Typography className={classes.starCountBox}>
                    <b>You have {stars} stars</b>
                </Typography>
                </Box>
                <Box>
                {/* Get all rewards from database and display in a table */}
                {rewards && (
                    <TableContainer>
                    <Table>
                        <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHeaders}>
                            <b>Name</b>
                            </TableCell>
                            <TableCell className={classes.tableHeaders}>
                            <b>Stars Required</b>
                            </TableCell>
                            <TableCell className={classes.tableHeaders}>
                            <b>Stars Remaining</b>
                            </TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rewards.map((reward) => (
                            <TableRow key={reward._id}>
                            <TableCell className={classes.tableContent}>
                                {reward.rewardName}
                            </TableCell>
                            <TableCell className={classes.tableContent}>
                                {reward.starsRequired} <br />
                            </TableCell>
                            <TableCell className={classes.tableContent}>
                                {remainingStarsForReward[reward._id]}
                            </TableCell>
                            <TableCell>
                                <Button
                                onClick={() => claimReward(reward)}
                                // Disable button if user doesn't have enough stars to claim reward
                                disabled={reward.starsRequired > stars}
                                variant="contained"
                                color="primary"
                                startIcon={<ClaimIcon />}
                                >
                                Claim Reward
                                </Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
                )}
                </Box>
            </Paper>
            </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Badges style={useStyles()} levelList={levelList} level={level} current={totalStarsEarned} />
      </TabPanel>
    </Box>
  );
}