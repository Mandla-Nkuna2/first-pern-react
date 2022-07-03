import React, { useContext, useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantsContext } from "../context/RestaurantsContext";

const AddRestaurant = () => {
  const { addRestaurant } = useContext(RestaurantsContext);
  const [team_name, setTeamName] = useState("");
  // const [played, setPlayed] = useState("Price Range");
  const [played, setPlayed] = useState(0);
  const [points, setPoints] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await RestaurantFinder.post("/", {
        team_name,
        played,
        points,
      });
      addRestaurant(resp.data[0]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit} action="">
        <div className="container">
          <div className="row">
            <div className="col">
              <input
                type="text"
                value={team_name}
                onChange={(e) => setTeamName(e.target.value)}
                className="form-control"
                placeholder="team name"
              />
            </div>
            <div className="col">
              <select
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
            <div className="col">
              <input
                type="text"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                className="form-control"
                placeholder="points"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Add
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;
