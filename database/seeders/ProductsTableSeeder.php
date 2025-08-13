<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductsTableSeeder extends Seeder
{
    public function run()
    {
        Product::insert([
            [
                'name' => 'Camiseta básica',
                'description' => 'Camiseta de algodón 100%. Cómoda y ligera.',
                'price' => 15.99,
                'stock' => 100,
                'image_url' => 'https://images.pexels.com/photos/991509/pexels-photo-991509.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pantalón vaquero',
                'description' => 'Vaqueros clásicos de corte recto.',
                'price' => 39.99,
                'stock' => 50,
                'image_url' => 'https://images.pexels.com/photos/4210864/pexels-photo-4210864.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Zapatillas deportivas',
                'description' => 'Zapatillas ligeras para running.',
                'price' => 59.99,
                'stock' => 70,
                'image_url' => 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Sudadera con capucha',
                'description' => 'Sudadera cálida y cómoda con capucha.',
                'price' => 29.99,
                'stock' => 80,
                'image_url' => 'https://images.pexels.com/photos/7479837/pexels-photo-7479837.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gorra de béisbol',
                'description' => 'Gorra ajustable para el sol.',
                'price' => 12.99,
                'stock' => 150,
                'image_url' => 'https://images.pexels.com/photos/1007804/pexels-photo-1007804.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Chaqueta impermeable',
                'description' => 'Chaqueta para lluvia ligera y resistente.',
                'price' => 49.99,
                'stock' => 40,
                'image_url' => 'https://images.pexels.com/photos/12503567/pexels-photo-12503567.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mochila urbana',
                'description' => 'Mochila espaciosa con múltiples compartimentos.',
                'price' => 35.99,
                'stock' => 60,
                'image_url' => 'https://images.pexels.com/photos/2081199/pexels-photo-2081199.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Reloj deportivo',
                'description' => 'Reloj con cronómetro y resistencia al agua.',
                'price' => 79.99,
                'stock' => 30,
                'image_url' => 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cinturón de cuero',
                'description' => 'Cinturón clásico de cuero genuino.',
                'price' => 22.99,
                'stock' => 90,
                'image_url' => 'https://images.pexels.com/photos/4937224/pexels-photo-4937224.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pantalones cortos deportivos',
                'description' => 'Pantalones cortos para actividades al aire libre.',
                'price' => 19.99,
                'stock' => 75,
                'image_url' => 'https://images.pexels.com/photos/8941651/pexels-photo-8941651.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Camisa formal',
                'description' => 'Camisa elegante para eventos formales.',
                'price' => 27.99,
                'stock' => 55,
                'image_url' => 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Botas de montaña',
                'description' => 'Botas resistentes para trekking.',
                'price' => 85.00,
                'stock' => 25,
                'image_url' => 'https://images.pexels.com/photos/167706/pexels-photo-167706.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Calcetines deportivos',
                'description' => 'Calcetines transpirables para deporte.',
                'price' => 9.99,
                'stock' => 120,
                'image_url' => 'https://images.pexels.com/photos/251454/pexels-photo-251454.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Bufanda de lana',
                'description' => 'Bufanda cálida para el invierno.',
                'price' => 14.99,
                'stock' => 70,
                'image_url' => 'https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Guantes táctiles',
                'description' => 'Guantes para usar dispositivos táctiles.',
                'price' => 11.50,
                'stock' => 100,
                'image_url' => 'https://images.pexels.com/photos/45057/pexels-photo-45057.jpeg',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
