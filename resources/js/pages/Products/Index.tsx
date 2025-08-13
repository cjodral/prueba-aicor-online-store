import React, { useState, useEffect } from "react";
import { ShoppingCart, Trash } from "lucide-react";
import Orders from "./Orders";

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image_url: string;
};

type Props = {
  products: Product[];
};

type CartItem = Product & {
  quantity: number;
};

type Order = {
  id: number;
  items: { id: number; quantity: number; price: number }[];
  total: number;
  date: string;
};

const Index: React.FC<Props> = ({ products }) => {
  const [showOrders, setShowOrders] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [purchaseConfirmed, setPurchaseConfirmed] = useState(false);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    setPurchaseConfirmed(false);
  };

  const confirmPurchase = async () => {
    if (cartItems.length === 0) return;

    const total = totalPrice;
    const orderData = {
      id: Date.now(), // ID único temporal
      items: cartItems.map(({ id, quantity, price }) => ({ id, quantity, price })),
      total,
      date: new Date().toISOString(),
    };

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
      const response = await fetch("/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": token || "",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Error al guardar el pedido");

      setPurchaseConfirmed(true);
      setOrders((prev) => [...prev, orderData]);
      setCartItems([]);
      localStorage.removeItem("cartItems");
    } catch (error) {
      alert("No se pudo confirmar la compra. Inténtalo más tarde.");
      console.error(error);
    }
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-indigo-100 p-8 relative">
      <div className="flex justify-between items-center mb-8">
        <p
          onClick={() => setShowOrders(!showOrders)}
          className="text-indigo-600 font-bold px-4 py-2 rounded hover:text-indigo-700 transition cursor-pointer"
        >
          {showOrders ? "Volver a la tienda" : "Ver mis compras"}
        </p>

        <h1 className="text-2xl font-bold text-indigo-600 text-center">
          Aicor Online Store Laravel-React
        </h1>

        {!showOrders && (
          <div className="relative cursor-pointer" onClick={toggleCart}>
            <ShoppingCart size={32} className="text-indigo-600" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full px-2 text-xs font-bold">
                {cartCount}
              </span>
            )}
          </div>
        )}
      </div>

      {showOrders ? (
        <Orders orders={orders} />
      ) : (
        <>
          {isCartOpen && (
            <div className="fixed top-0 right-0 w-80 h-full bg-indigo-50 shadow-lg rounded-l-lg p-4 overflow-auto z-60">
              <h2 className="text-xl font-bold mb-4 text-black">Resumen del pedido:</h2>
              {purchaseConfirmed && (
                <p className="mb-4 p-3 bg-green-200 text-green-800 rounded">
                  ¡Compra confirmada! Gracias por tu pedido.
                </p>
              )}
              {cartItems.length === 0 && !purchaseConfirmed ? (
                <p className="font-bold mb-4 text-black">Tu carrito está vacío.</p>
              ) : (
                <ul>
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center border-b border-gray-200 py-2"
                    >
                      <div>
                        <p className="font-semibold text-black">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} × {item.price}€
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <p className="text-sm text-gray-600">
                          {(item.quantity * item.price).toFixed(2)}€
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800 transition-colors cursor-pointer"
                          aria-label={`Eliminar una unidad de ${item.name}`}
                        >
                          <Trash size={20} />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-4 border-t pt-4 flex justify-between text-sm text-gray-600">
                <span>IVA:</span>
                <span>{(totalPrice * 0.21).toFixed(2)}€</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Gastos envio:</span>
                <span>{totalPrice === 0 ? '0.00' : totalPrice >= 50 ? '0.00' : '3.95'}€</span>
              </div>
              <div className="font-bold flex justify-between text-black">
                <span>Total:</span>
                <span>{totalPrice === 0 ? totalPrice.toFixed(2) : totalPrice >= 50 ? totalPrice.toFixed(2) : (totalPrice + 3.95).toFixed(2)}€</span>
              </div>

              <button
                onClick={confirmPurchase}
                disabled={cartItems.length === 0}
                className={`mt-4 w-full py-2 rounded text-white transition-colors cursor-pointer ${
                  cartItems.length === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                Confirmar compra
              </button>

              <button
                onClick={toggleCart}
                className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition-colors cursor-pointer"
              >
                Cerrar
              </button>
              <div className="mt-4 flex justify-between text-sm text-gray-600">
                <span>*Para pedidos iguales o superiores a 50€ el envío es gratuito.</span>
              </div>
            </div>
          )}

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <li
                key={product.id}
                className="bg-indigo-50 shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                  <p className="text-lg text-indigo-500 font-bold">{product.price}€</p>
                  <p className="text-gray-600 mt-2 flex-1">{product.description}</p>

                  <button
                    onClick={() => addToCart(product)}
                    className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer"
                  >
                    <ShoppingCart size={20} />
                    Añadir al carrito
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default Index;
