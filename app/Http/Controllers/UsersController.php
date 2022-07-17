<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Throwable;
use Wovosoft\LaravelCommon\Helpers\Data;
use Wovosoft\LaravelCommon\Helpers\Messages;

class UsersController extends Controller
{
    public function index(Request $request): LengthAwarePaginator
    {
        return Data::paginate(User::query(), $request);
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
                "email" => ["email", "required"],
            ]);
            $Role = new User();
            $Role->forceFill($data);
            $Role->saveOrFail();
            DB::commit();
            return Messages::success();
        } catch (\Throwable $exception) {
            DB::rollBack();
            return Messages::failed($exception);
        }
    }

    public function show(User $user)
    {
        return $user;
    }

    /**
     * @throws \Throwable
     */
    public function update(Request $request, User $user)
    {
        DB::beginTransaction();
        try {
            $data = $request->validate([
                "name" => ["string", "required"],
                "email" => ["email", "required"],
            ]);
            $user->forceFill($data);
            $user->saveOrFail();
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
    public function destroy(User $user)
    {
        return Data::destroy($user);
    }

    public function permissions(User $user)
    {
        return $user->getPermissionNames();
    }

    public function storePermissions(Request $request, User $user)
    {
        try {
            $user->syncPermissions($request->permissions);
            return Messages::success();
        } catch (Throwable $exception) {
            return Messages::failed($exception);
        }
    }

    public function roles(User $user)
    {
        return $user->getRoleNames();
    }

    public function storeRoles(Request $request, User $user)
    {
        try {
            $user->syncRoles($request->roles);
            return Messages::success();
        } catch (Throwable $exception) {
            return Messages::failed($exception);
        }
    }
}
