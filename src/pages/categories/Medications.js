import { useEffect } from "react";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import Footer from "../footer/Footer";
import AllItemsComponent from "./AllItems";
import axios from "axios";

const Medications = () => {
  const { allItems, dispatcho } = useFetchItemsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("http://localhost:4000/api/items/");
      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  return (
    <>
      <AllItemsComponent /*props={Itemss}*/ />
      <Footer />
    </>
  );
};

export default Medications;
