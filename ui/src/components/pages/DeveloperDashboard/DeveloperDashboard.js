import React, { useEffect, useState } from "react";
import { Paper, Typography, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import StarIcon from "@material-ui/icons/Stars";
import TrophyIcon from "@material-ui/icons/EmojiEvents";
import CalanderIcon from "@material-ui/icons/CalendarToday";
import InfoOutlinedIcon from "@material-ui/icons/Info";
import { useCookies } from "react-cookie";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    marginBottom: theme.spacing(3),
    fontWeight: 600,
  },
  boxContainer: {
    display: "flex",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#eaeaea",
    height: "auto",
    flexShrink: 0,
    width: `calc((70vw - ${theme.spacing(6)}px) / 3)`,
    margin: theme.spacing(1),
    padding: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0px 0px 12px rgba(0, 0, 0, 0.5)",
    },
  },
  boxTitle: {
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(4),
    fontWeight: 600,
    textAlign: "center",
  },
  boxValue: {
    fontSize: "2rem",
    fontWeight: 700,
    textAlign: "center",
    wordWrap: "break-word",
  },
  boxDescription: {
    paddingTop: theme.spacing(5),
  },
  icon: {
    paddingBottom: theme.spacing(4),
    fontSize: "3.5rem",
  },
  infoIcon: {
    marginLeft: theme.spacing(2),
    cursor: "default",
    color: "#2196f3",
    transition: "opacity 0.3s ease-in-out",
    "&:hover": {
      opacity: 0.8,
    },
  },
  infoBox: {
    padding: theme.spacing(2),
  },
}));

export default function DeveloperDashboard() {
  const classes = useStyles();
  const [hoveredBox, setHoveredBox] = useState(null);

  const [cookies] = useCookies();
  const [user, setUser] = useState();
  const [currentStarCount, setCurrentStarCount] = useState();
  const [totalStarsAchieved, setTotalStarsAchieved] = useState();
  const [latestPullRequestStatus, setLatestPullRequestStatus] = useState();
  const [latestPullRequest, setLatestPullRequest] = useState();

  // Renders all data on page load
  useEffect(() => {
    getUserByEmail();
    getUsersCurrentStarCount();
    getUsersTotalStarsAchieved();
    getUsersLatestPullRequestStatus();
  });

  // Use email provided by cookie to get the whole user object for the user that is currently logged in
  const getUserByEmail = async () => {
    const res = await axios.get(
      `http://localhost:8000/management/users/email/${cookies.user}`
    );
    // Set user object to state
    setUser(res.data);
  };

  // Gets user's current star count
  const getUsersCurrentStarCount = async () => {
    setCurrentStarCount(user.stars);
  };

  // Gets user's total star count
  const getUsersTotalStarsAchieved = async () => {
    setTotalStarsAchieved(user.totalStarsEarned);
  };

  // Gets status of user's most recent pull request
  const getUsersLatestPullRequestStatus = async () => {
    try {
      // Passes userId of currently logged in user to my API which gets their most recent pull request
      const res = await axios.get(
        `http://localhost:8000/dashboard/recent-pull-request/${user._id}`
      );

      // Condition for if the user has not got a pull request stored in our database
      if (!res.data) {
        console.log(
          "No pull requests were found on the system for user: " + user.name
        );
      }

      // Storing pull request to state so more information can be displayed in the description
      setLatestPullRequest(res.data);

      if (latestPullRequest.rating_complete === true) {
        // If the "rating_complete" value is true, this means the pull request has been reviewed
        setLatestPullRequestStatus("Reviewed");
      } else if (latestPullRequest.rating_complete === false) {
        // If the "rating_complete" value is false, this means the pull request is pending a review
        setLatestPullRequestStatus("Pending");
      } else {
        // Else, user has no pull requests in our system
        setLatestPullRequestStatus("You Have No Pull Requests");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Dashboard
      </Typography>
      <div className={classes.boxContainer}>
        <div>
          <Paper
            elevation={3}
            className={classes.box}
            // More information is displayed when user hovers over box
            onMouseEnter={() => setHoveredBox("currentStarCount")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <StarIcon className={classes.icon} />
            <Typography variant="h6" className={classes.boxTitle}>
              Current Star Count
              <Tooltip
                title={
                  <div className={classes.infoBox}>
                    <Typography variant="body2">
                      This is the number of stars you have available to spend on
                      rewards
                      <br /> <br />
                      Visit the rewards page to claim a reward
                    </Typography>
                  </div>
                }
                placement="right"
              >
                <span className={classes.infoIcon}>
                  <InfoOutlinedIcon />
                </span>
              </Tooltip>
            </Typography>
            <Typography variant="h4" className={classes.boxValue}>
              {currentStarCount}
            </Typography>
            {/* Content displayed when hovering */}
            {hoveredBox === "currentStarCount" && (
              <Typography variant="body1" className={classes.boxDescription}>
                Description of current star count
              </Typography>
            )}
          </Paper>
        </div>

        <div>
          <Paper
            elevation={3}
            className={classes.box}
            // More information is displayed when user hovers over box
            onMouseEnter={() => setHoveredBox("totalStarsAchieved")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <TrophyIcon className={classes.icon} />
            <Typography variant="h6" className={classes.boxTitle}>
              Total Stars Achieved
              <Tooltip
                title={
                  <div className={classes.infoBox}>
                    <Typography variant="body2">
                      This is the number of stars you have achieved in total
                      <br /> <br />
                      Your manager can view your total stars on their
                      leaderboard page
                    </Typography>
                  </div>
                }
                placement="right"
              >
                <span className={classes.infoIcon}>
                  <InfoOutlinedIcon />
                </span>
              </Tooltip>
            </Typography>
            <Typography variant="h4" className={classes.boxValue}>
              {totalStarsAchieved}
            </Typography>
            {/* Content displayed when hovering */}
            {hoveredBox === "totalStarsAchieved" && (
              <Typography variant="body1" className={classes.boxDescription}>
                Description of total stars achieved
              </Typography>
            )}
          </Paper>
        </div>

        <div>
          <Paper
            elevation={3}
            className={classes.box}
            // More information is displayed when user hovers over box
            onMouseEnter={() => setHoveredBox("latestPullRequestStatus")}
            onMouseLeave={() => setHoveredBox(null)}
          >
            <CalanderIcon className={classes.icon} />
            <Typography variant="h6" className={classes.boxTitle}>
              Status of Latest Pull Request
              <Tooltip
                title={
                  <div className={classes.infoBox}>
                    <Typography variant="body2">
                      This is the status of your most recently submitted pull
                      request on GitHub
                      <br /> <br />
                      It will display a status of 'Reviewed' if your pull
                      request has been rated, or 'Pending' if it hasn't been
                      rated yet
                    </Typography>
                  </div>
                }
                placement="right"
              >
                <span className={classes.infoIcon}>
                  <InfoOutlinedIcon />
                </span>
              </Tooltip>
            </Typography>
            <Typography variant="h4" className={classes.boxValue}>
              {latestPullRequestStatus}
            </Typography>
            {/* Content displayed when hovering */}
            {hoveredBox === "latestPullRequestStatus" && (
              <Typography variant="body1" className={classes.boxDescription}>
                Click here to view your latest pull request
              </Typography>
            )}
          </Paper>
        </div>
      </div>
    </div>
  );
}
