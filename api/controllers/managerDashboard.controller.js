const PullRequest = require("../models/pullRequest.model");

// Gets the number of pull requests that are pending (i.e. not been rated yet)
const getNumberOfPendingPullRequests = async (req, res) => {
  try {
    const pendingPullRequestCount = await PullRequest.countDocuments({
      rating_complete: false,
    });
    res.status(200).json({ pendingPullRequestCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getNumberOfPendingPullRequests };
