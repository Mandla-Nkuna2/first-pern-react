import React, { useContext, useEffect } from "react";
import RestaurantFinder from "../apis/RestaurantFinder.js";
import { RestaurantsContext } from "../context/RestaurantsContext";
import { useNavigate } from "react-router-dom";

const RestaurantList = (props) => {
  const { restaurants, setRestaurants } = useContext(RestaurantsContext);
  let navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await RestaurantFinder.get("/");
        setRestaurants(resp.data.rows);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await RestaurantFinder.delete(`/${id}`);
      setRestaurants(
        restaurants.filter((restaurant) => {
          return restaurant.team_id !== id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async (id) => {
    navigate(`/restaurants/${id}/update`);
  };

  return (
    <div>
      <table className="table table-dark table-hover">
        <thead>
          <tr className="bg-primary">
            <th scope="col">#</th>
            <th scope="col">Team</th>
            <th scope="col">Pl</th>
            <th scope="col">Pts</th>
            <th scope="col">GD</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {restaurants.map((restaurant, i) => {
            return (
              <tr key={restaurant.team_id}>
                <th scope="row">{i + 1}</th>
                <td> {restaurant.team_name} </td>
                <td> {restaurant.played} </td>
                <td> {restaurant.points} </td>
                <td> {restaurant.goal_d} </td>
                <td>
                  <button
                    onClick={() => handleEdit(restaurant.team_id)}
                    className="btn btn-warning"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(restaurant.team_id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RestaurantList;
