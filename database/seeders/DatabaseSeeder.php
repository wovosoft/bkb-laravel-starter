<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        $user = \App\Models\User::factory()->create([
            'name' => 'Narayan Adhikary',
            'email' => 'narayanadhikary24@gmail.com',
            "password" => bcrypt("123456789")
        ]);

        foreach (["admin", "customer", "checker", "maker", "finalizer"] as $roleName) {
            Role::create(['name' => $roleName]);
        }

        //permissions
        foreach (["add_role", "edit role", "delete role"] as $permissionName) {
            Permission::create(["name" => $permissionName]);
        }
    }
}
