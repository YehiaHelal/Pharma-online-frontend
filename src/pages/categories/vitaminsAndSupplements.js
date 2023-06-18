import { useEffect } from "react";
import { useFetchItemsContext } from "../../hooks/useFetchItemsContext";
import Footer from "../footer/Footer";
import AllItemsComponent from "./AllItems";

const VitaminsAndSupplements = () => {
  const { allItems, dispatcho } = useFetchItemsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch(
        "https://pharmacyonline.onrender.com/api/items/"
      );
      const json = await response.json();

      if (response.ok) {
        dispatcho({ type: "FETCHED-ALL", payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatcho]);

  // const Items = allItems.slice(15, 35);

  return (
    <>
      <AllItemsComponent /*props={Items}*/ />
      <Footer />
    </>
  );
};

export default VitaminsAndSupplements;
