<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    public function addToCart(Request $request)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1'
        ]);

        $user = Auth::user();

        $cartItem = CartItem::where('user_id', $user->id)
            ->where('product_id', $request->product_id)
            ->first();

        if ($cartItem) {
            $cartItem->quantity += $request->quantity;
            $cartItem->save();
        } else {
            CartItem::create([
                'user_id' => $user->id,
                'product_id' => $request->product_id,
                'quantity' => $request->quantity,
            ]);
        }

        return response()->json(['message' => 'Producto añadido al carrito']);
    }

    public function viewCart()
    {
        $user = Auth::user();

        $cartItems = CartItem::with('product')->where('user_id', $user->id)->get();

        return response()->json($cartItems);
    }

    public function removeFromCart($id)
    {
        $user = Auth::user();

        $cartItem = CartItem::where('user_id', $user->id)->where('id', $id)->first();

        if (!$cartItem) {
            return response()->json(['message' => 'Elemento no encontrado en el carrito'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Producto eliminado del carrito']);
    }

    public function confirmPurchase(Request $request)
    {
        $user = $request->user();

        $cartItems = CartItem::with('product')->where('user_id', $user->id)->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['error' => 'El carrito está vacío.'], 400);
        }

        DB::beginTransaction();

        try {
            $total = 0;

            // Verificar stock y calcular total
            foreach ($cartItems as $item) {
                $product = $item->product;

                if ($product->stock < $item->quantity) {
                    DB::rollBack();
                    return response()->json(['error' => "Stock insuficiente para el producto: {$product->name}"], 400);
                }

                $total += $product->price * $item->quantity;
            }

            // Crear orden
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
            ]);

            // Crear order_items y descontar stock
            foreach ($cartItems as $item) {
                $product = $item->product;

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $product->id,
                    'quantity' => $item->quantity,
                    'price' => $product->price,
                ]);

                $product->stock -= $item->quantity;
                $product->save();
            }

            // Vaciar carrito tras la compra
            CartItem::where('user_id', $user->id)->delete();

            DB::commit();

            return response()->json(['message' => 'Compra confirmada correctamente.', 'order_id' => $order->id]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al confirmar la compra.', 'details' => $e->getMessage()], 500);
        }
    }

}
