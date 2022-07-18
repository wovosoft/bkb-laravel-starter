<?php

use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::middleware("auth")->group(function () {
    \Wovosoft\BdGeocode\BdGeocode::routes();
    BkbOffices::routes();
});

Route::prefix("admin")
    ->name("admin.")
    ->middleware("auth")
    ->group(function () {
        Route::view("/", "admin");

        Route::prefix("roles")
            ->name("roles.")
            ->controller(RolesController::class)
            ->group(function () {
                Route::post("/", "index")->name("index");
                Route::put("/store", "store")->name("store");
                Route::put("/update/{role}", "update")->name("update");
                Route::post("/show/{role}", "show")->name("show");
                Route::delete("/destroy/{role}", "destroy")->name("destroy");
                Route::post("/{role}/permissions", "permissions")->name("permissions");
                Route::put("/{role}/storePermissions", "storePermissions")->name("storePermissions");
                Route::post("/list", "list")->name("list");
            });

        Route::prefix("permissions")
            ->name("permissions.")
            ->controller(PermissionsController::class)
            ->group(function () {
                Route::post("/", "index")->name("index");
                Route::post("/list", "list")->name("list");
                Route::put("/store", "store")->name("store");
                Route::put("/update/{permission}", "update")->name("update");
                Route::post("/show/{permission}", "show")->name("show");
                Route::delete("/destroy/{permission}", "destroy")->name("destroy");
            });

        Route::prefix("users")
            ->name("users.")
            ->controller(UsersController::class)
            ->group(function () {
                Route::post("/", "index")->name("index");
                Route::put("/store", "store")->name("store");
                Route::put("/update/{user}", "update")->name("update");
                Route::post("/show/{user}", "show")->name("show");
                Route::delete("/destroy/{user}", "destroy")->name("destroy");

                Route::post("/{user}/permissions", "permissions")->name("permissions");
                Route::put("/{user}/storePermissions", "storePermissions")->name("storePermissions");

                Route::post("/{user}/roles", "roles")->name("roles");
                Route::put("/{user}/storeRoles", "storeRoles")->name("storeRoles");
            });
    });


require __DIR__ . '/auth.php';
