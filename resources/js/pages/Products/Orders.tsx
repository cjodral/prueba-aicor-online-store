import React, { useEffect, useState } from "react";
import axios from "axios";

interface Order {
  id: number;
  total: number;
  created_at: string;
  items: {
    id: number;
    product_id: number;
    quantity: number;
    price: number;
    product?: {
      name: string;
    };
  }[];
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true); // nuevo estado

  useEffect(() => {
    axios.get("/orders")
      .then(res => setOrders(res.data))
      .catch(err => console.error("Error al cargar órdenes:", err))
      .finally(() => setLoading(false)); // se actualiza cuando termina la petición
  }, []);

  if (loading) {
    return <p className="font-bold flex text-black">Cargando compras...</p>;
  }

  return (
    <div>
      <h2 className="pb-4 text-2xl font-bold flex text-black">Mis compras:</h2>
      {orders.length === 0 ? (
        <p className="font-bold flex text-black">No tienes compras registradas.</p>
      ) : (
        orders.map(order => (
          <div className="p-2" key={order.id}>
            <p className="text-xl font-bold flex text-black">Fecha: {new Date(order.created_at).toLocaleDateString()}</p>
            <p className="font-bold flex text-black">Total: {order.total} €</p>
            <ul>
              {order.items.map(item => (
                <li key={item.id} className="flex text-black">
                  {item.product?.name || "Producto"} - {item.quantity} x {item.price} €
                </li>
              ))}
            </ul>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
