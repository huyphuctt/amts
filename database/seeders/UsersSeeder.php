<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        //
        User::create(['name' => 'Phúc', 'email' => 'huyphuctt@gmail.com', 'email_verified_at' => now(),    'password' => bcrypt('01020304@2023')]);

        User::create(['name' => 'Dương Hồng Nguyên', 'email' => 'hoshivina@gmail.com', 'email_verified_at' => now(),    'password' => bcrypt('01020304@2023')]);
    }
}
