import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  InputLabel,
  Input,
  Button,
  Card,
  CardContent,
} from "@material-ui/core";

export default function UpdateReward() {
  const [updateForm, setUpdateForm] = useState({
    rewardName: "",
    starsRequired: "",
  });

  const { id } = useParams(); // Get reward ID from URL
  const navigate = useNavigate();

  useEffect(() => {
    getReward();
  }, []);

  const getReward = async () => {
    // Get reward by id
    const res = await axios.get(
      `http://localhost:8000/management/rewards/${id}`
    );

    // Set to state (fills in textboxes)
    setUpdateForm({
      rewardName: res.data.rewardName,
      starsRequired: res.data.starsRequired,
    });
  };

  const updateEditFormField = (e) => {
    const { name, value } = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    });
  };

  const updateReward = async (e) => {
    e.preventDefault();

    // Update reward
    await axios.patch(
      `http://localhost:8000/management/rewards/update/${id}`,
      updateForm
    );

    navigate("/management/rewards");
  };

  return (
    <div>
      <div>
        <Typography style={{ marginTop: "100px" }} variant="h4">
          Update Reward
        </Typography>
      </div>
      <div>
        <Card
          style={{
            maxWidth: 600,
            minHeight: 250,
            padding: "20px 5px",
            margin: "0 auto",
            marginTop: "20px",
          }}
        >
          <CardContent>
            <form onSubmit={updateReward}>
              <div>
                <InputLabel>Reward Name</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.rewardName}
                  name="rewardName"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <InputLabel>Stars Required</InputLabel>
                <Input
                  onChange={updateEditFormField}
                  value={updateForm.starsRequired}
                  name="starsRequired"
                />
              </div>
              <div style={{ marginTop: "20px" }}>
                <Button
                  onClick={() => navigate("/management/rewards")}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  style={{ marginLeft: "30px" }}
                  variant="contained"
                  color="primary"
                >
                  Update Reward
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
