import { useState } from "react";
import Toast from "./Toast";
import ItemList from "./ItemList";

export default function ItemListWithToast({ items }) {
  const [notification, setNotification] = useState(null);

  return (
    <>
      <Toast notification={notification} />
      <ItemList items={items} setNotification={setNotification} />
    </>
  );
}
