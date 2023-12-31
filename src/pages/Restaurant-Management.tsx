import React, { useEffect, useState } from "react";
import { Customer, Promotion, Restaurant } from "../features/types";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";
// @ts-ignore
import doki from "../../assets/doki.png";
// @ts-ignore
import burgerking from "../../assets/burgerking.png";
// @ts-ignore
import dominoPizza from "../../assets/dominoPizza.png";
// @ts-ignore
import hana from "../../assets/hana.png";
// @ts-ignore
// @ts-ignore
import kichi from "../../assets/kichi.png";
// @ts-ignore
import vietkitchen from "../../assets/vietkitchen.png";
import ConfirmDeleteTable from "../components/dialogs/confirm-delete-table";
import AddTableDialog from "../components/dialogs/add-table-dialog";
import RestaurantManagementBottom from "../components/Restaurant-management-bottom";
import BookTableDialog from "../components/dialogs/book-table-dialog";
import RestaurantDishesTop from "../components/RestaurantDishes-Top";

const getRestaurantImage = () => {
  const arr = [doki, burgerking, dominoPizza, hana, kichi, vietkitchen];
  const index = Math.floor(Math.random() * arr.length);
  return index >= 0 && index < arr.length ? arr[index] : arr[0];
};

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [deletedRestaurant, setDeletedRestaurant] = useState<
    Restaurant | undefined
  >(undefined);
  const [insertedTableRestaurant, setInsertedTableRestaurant] = useState<
    Restaurant | undefined
  >(undefined);
  const [bookedTableRestaurant, setBookedTableRestaurant] = useState<
    Restaurant | undefined
  >(undefined);
  const [currentCustomer, setCurrentCustomer] = React.useState<
    Customer | undefined
  >(undefined);

  useEffect(() => {
    const setup = async () => {
      const [responseRes] = await Promise.all([
        axios.get(`${BACKEND_URL}/restaurant`),
      ]);

      const objRes: { data: Restaurant[]; success: boolean } | undefined =
        responseRes.data;
      const newRestaurants = objRes && objRes.data ? objRes.data : [];

      setRestaurants(newRestaurants);
    };
    setup();
  }, []);

  return (
    <div className="w-full h-[90vh] px-36 py-14 mb-10 overflow-auto">
      <RestaurantDishesTop
        setCurrentCustomer={setCurrentCustomer}
        currentCustomer={currentCustomer}
        isPageBill={false}
        handleOnClickCreateBill={() => {}}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-10 border-t border-gray-200 md:gap-8">
        {restaurants.map((restaurant, i) => {
          const srcImage = getRestaurantImage();

          return (
            <div key={`${restaurant.res_id}_${i}`}>
              <div className="overlay-container">
                <img
                  src={srcImage}
                  alt="restaurant"
                  className="relative w-full min-h-[180px] overflow-hidden aspect-video object-cover block rounded-md"
                />
                <div className="overlay w-full rounded-md p-2 px-3 ">
                  <p className="text-xl font-bold flex gap-2 flex-wrap"></p>
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <h2 className="text-lg font-semibold mt-2 text-zinc-800">
                  {restaurant.res_name}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-zinc-800 font-medium">Restaurant ID:</p>
                <p className="text-zinc-600">{restaurant.res_id}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-zinc-800 font-medium">Table count:</p>
                <p className="text-zinc-600">{restaurant.table_count}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-zinc-800 font-medium">Total slot:</p>
                <p className="text-zinc-600">{restaurant.total_slot}</p>
              </div>

              <div className="flex items-center gap-2 h-fit mt-1">
                <button
                  className="bg-orange-400 hover:bg-orange-400/90 py-2 rounded w-full"
                  onClick={() => {
                    setInsertedTableRestaurant(restaurant);
                  }}
                >
                  Insert 1 table
                </button>
                <button
                  className={`bg-orange-400 py-2 rounded w-full ${
                    restaurant.table_count <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-orange-400/90"
                  }`}
                  disabled={restaurant.table_count <= 0}
                  onClick={() => {
                    setDeletedRestaurant(restaurant);
                  }}
                >
                  Delete 1 table
                </button>
              </div>
              {currentCustomer && (
                <button
                  className={`bg-orange-400 py-2 rounded w-full mt-2 ${
                    restaurant.table_count <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:bg-orange-400/90"
                  }`}
                  disabled={restaurant.table_count <= 0}
                  onClick={() => {
                    setBookedTableRestaurant(restaurant);
                  }}
                >
                  Book table
                </button>
              )}
            </div>
          );
        })}
      </div>

      <div className="w-full h-[50vh] border-t border-gray-200 my-10 py-5">
        <RestaurantManagementBottom restaurants={restaurants} />
      </div>

      {bookedTableRestaurant && currentCustomer && (
        <BookTableDialog
          customer={currentCustomer}
          isOpen={
            bookedTableRestaurant !== undefined && currentCustomer !== undefined
          }
          handleClose={() => {
            setBookedTableRestaurant(undefined);
          }}
          restaurant={bookedTableRestaurant}
        />
      )}

      {deletedRestaurant && (
        <ConfirmDeleteTable
          isOpen={deletedRestaurant !== undefined}
          handleClose={() => {
            setDeletedRestaurant(undefined);
          }}
          restaurant={deletedRestaurant}
        />
      )}
      {insertedTableRestaurant && (
        <AddTableDialog
          isOpen={insertedTableRestaurant !== undefined}
          handleClose={() => {
            setInsertedTableRestaurant(undefined);
          }}
          restaurant={insertedTableRestaurant}
        />
      )}
    </div>
  );
};

export default RestaurantManagement;
