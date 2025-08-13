<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    // Obtener pedidos del usuario autenticado
    public function index(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->id)
            ->with('items.product') // Opcional: traer detalles de productos
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($orders);
    }

    // Guardar nuevo pedido (ejemplo básico)
    public function store(Request $request)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $data = $request->validate([
            'items' => 'required|array',
            'items.*.id' => 'required|integer',
            'items.*.quantity' => 'required|integer',
            'items.*.price' => 'required|numeric',
            'total' => 'required|numeric',
        ]);

        $order = new Order();
        $order->user_id = $user->id;
        $order->total = $data['total'];
        $order->save();

        // Guardar items del pedido
        foreach ($data['items'] as $item) {
            $order->items()->create([
                'product_id' => $item['id'],
                'quantity' => $item['quantity'],
                'price' => $item['price'],
            ]);
        }

        return response()->json(['message' => 'Pedido creado', 'order' => $order], 201);
    }
}
