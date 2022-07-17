<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Http\JsonResponse;
use Wovosoft\LaravelCommon\Helpers\Data;
use Wovosoft\LaravelCommon\Helpers\Messages;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Permission;


class PermissionsController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        return Data::paginate(Permission::query(), $request);
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
            $permission = new Permission();
            $permission->forceFill($data);
            $permission->saveOrFail();
            DB::commit();
            return Messages::success();
        }
        catch (\Throwable $exception) {
            DB::rollBack();
            return Messages::failed($exception);
        }
    }

    public function show(Permission $permission)
    {
        return $permission;
    }

    /**
     * @throws \Throwable
     */
    public function update(Request $request, Permission $permission)
    {
        DB::beginTransaction();
        try {
            $data = $request->validate([
                "name" => ["string", "required"],
            ]);
            $permission->forceFill($data);
            $permission->saveOrFail();
            DB::commit();
            return Messages::success();
        }
        catch (\Throwable $exception) {
            DB::rollBack();
            return Messages::failed($exception);
        }
    }

    /**
     * @throws \Throwable
     */
    public function destroy(Permission $permission)
    {
        return Data::destroy($permission);
    }
    public function list()
    {
        return Permission::query()->select(['name'])->get()->pluck('name');
    }
}
