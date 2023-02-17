import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Select,
  Typography,
  MenuItem,
  Chip,
} from "@material-ui/core";
import axios from "axios";

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [selectedRepository, setSelectedRepository] = useState("");
  const [pullRequests, setPullRequests] = useState([]);

  const getPullRequests = async (repositoryName) => {
    // Requires access token as it's a private repository (generated on GitHub)
    const token = "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";
    const headers = {
      Authorization: `Token ${token}`,
    };

    // Calls GitHub API to get pull requests from a repository
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${repositoryName}/pulls?state=all`,
        { headers }
      );
      setPullRequests(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Event handler to show the correct data depending on which repository is selected
  const handleRepositoryChange = (event) => {
    setSelectedRepository(event.target.value);
    getPullRequests(event.target.value);
  };

  useEffect(() => {
    async function getRepositories() {
      // Sends GET request to API to get all repositories and sets to state variable
      try {
        const response = await axios.get(
          "http://localhost:8000/management/repositories"
        );
        setRepositories(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    getRepositories();
  }, []);

  // Event handler to navigate to GitHub page for a specific pull request when user clicks the pull request
  const handlePullRequestClick = (pullRequestUrl) => {
    window.open(pullRequestUrl, "_blank");
  };

  // Helper function to determine the status of a pull request based on its "merged_at" property
  const getPullRequestStatus = (pullRequest) => {
    if (pullRequest.merged_at) {
      return "Merged";
    } else {
      return "Pending";
    }
  };

  return (
    <div>
      <Typography variant="h4">
        <b>All Pull Requests</b>
      </Typography>
      <Select value={selectedRepository} onChange={handleRepositoryChange}>
        <MenuItem value="" disabled>
          Select a repository
        </MenuItem>

        {repositories.map((repository) => (
          <MenuItem key={repository.id} value={repository.full_name}>
            {repository.name}
          </MenuItem>
        ))}
      </Select>
      {pullRequests.length > 0 && (
        <List>
          {pullRequests.map((pullRequest) => (
            <ListItem
              key={pullRequest.id}
              button
              onClick={() => handlePullRequestClick(pullRequest.html_url)}
            >
              <ListItemText
                primary={pullRequest.title}
                secondary={`#${pullRequest.number} opened by ${pullRequest.user.login}`}
              />
              <Chip
                label={getPullRequestStatus(pullRequest)}
                color={
                  getPullRequestStatus(pullRequest) === "Pending"
                    ? "secondary"
                    : "primary"
                }
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default RepositoryList;
