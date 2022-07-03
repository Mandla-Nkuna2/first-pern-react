import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const [team_name, setTeamName] = useState("");
  // const [played, setPlayed] = useState("Price Range");
  const [played, setPlayed] = useState(0);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await RestaurantFinder.get(`/${id}`);
        setTeamName(resp.data[0].team_name);
        setPlayed(resp.data[0].played);
        setPoints(resp.data[0].points);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await RestaurantFinder.put(`/${id}`, {
        team_name,
        played,
        points,
      });
      navigate(`/`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} action="">
        <div className="container">
          <div className="form-group">
            <label htmlFor="txtTeamName">Team Name</label>
            <input
              id="txtTeamName"
              type="text"
              value={team_name}
              onChange={(e) => setTeamName(e.target.value)}
              className="form-control"
              placeholder="team name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="sel_Played">Played</label>
            <select
              id="sel_Played"
              value={played}
              onChange={(e) => setPlayed(e.target.value)}
              className="custom-select my-1 mr-sm-2"
            >
              <option disabled>Price Range</option>
              <option value="1">$</option>
              <option value="2">$$</option>
              <option value="3">$$$</option>
              <option value="4">$$$$</option>
              <option value="5">$$$$$</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="txtPoints">Points</label>
            <input
              id="txtPoints"
              type="number"
              value={points}
              onChange={(e) => setPoints(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRestaurant;
