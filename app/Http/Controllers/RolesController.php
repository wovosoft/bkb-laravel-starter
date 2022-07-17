<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;
use Throwable;
use Wovosoft\LaravelCommon\Helpers\Data;
use Wovosoft\LaravelCommon\Helpers\Messages;

class RolesController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        return Data::paginate(Role::query(), $request);
    }

    /**
     * @throws \Throwable
     */
    public function store(Request $request): JsonResponse
    {
        DB::beginTransaction();
        try {
            $data = $request->validate([
                "name" => ["string", "required"],
            ]);
            $Role = new Role();
            $Role->forceFill($data);
            $Role->saveOrFail();
            DB::commit();
            return Messages::success();
        } catch (\Throwable $exception) {
            DB::rollBack();
            return Messages::failed($exception);
        }
    }

    public function show(Role $role)
    {
        return $role;
    }

    /**
     * @throws \Throwable
     */
    public function update(Request $request, Role $Role)
    {
        DB::beginTransaction();
        try {
            $data = $request->validate([
                "name" => ["string", "required"],
            ]);
            $Role->forceFill($data);
            $Role->saveOrFail();
            DB::commit();
            return Messages::success();
        } catch (\Throwable $exception) {
            DB::rollBack();
            return Messages::failed($exception);
        }
    }

    /**
     * @throws \Throwable
     */
    public function destroy(Role $role)
    {
        return Data::destroy($role);
    }

    public function permissions(Role $role)
    {
        return $role->getPermissionNames();
    }

    public function storePermissions(Request $request, Role $role)
    {
        try {
            $role->syncPermissions($request->permissions);
            return Messages::success();
        } catch (Throwable $exception) {
            return Messages::failed($exception);
        }
    }

    public function list(): array
    {
        return Role::select(['name'])->pluck('name')->toArray();
    }
}
