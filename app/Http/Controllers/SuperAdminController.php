<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use FFI;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Log;

class SuperAdminController extends Controller
{
    // Super Admin Dashboard
    public function index()
    {
        //1 - Get the list of all the roles
        $roles = Role::all();
        //2 - Get the list of all the users
        $users = User::all();
        /*3 - Get the list of all role assignations to all users
        use this example as help guide : $roles = $user->getRoleNames(); */
        $roleAssignations = [];
        foreach ($users as $user) {
            $key = $user->id . '-' . $user->name;
            $roleAssignations[$key] = $user->getRoleNames(); //is a collection
        }
        //4 - Get the list of all the direct permissions
        $permissions = Permission::all();
        //5 - Get the list of all the permissions assignations to all roles
        $permissionAssignations = [];
        foreach ($roles as $role) {
            $permissionAssignations[$role->name] = $role->getPermissionNames(); //is a collection
        }
        //curent user id name and email in basic json format
        $user = auth()->user();
        $user = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email
        ];
        //6 - make inertia render the page (don't forget to pass the variables)
        return Inertia::render('SuperAdmin/Manager', [
            'roles' => $roles,
            'users' => $users,
            'roleAssignations' => $roleAssignations,
            'permissions' => $permissions,
            'permissionAssignations' => $permissionAssignations,
            'user' => $user
        ]);
    }
    //add a role to a user (assignation)
    public function addRoleToUser(Request $request)
    // rember it gets data = { role_id,user_id};
    {
        $user = User::find($request->data['user_id']);
        $role = Role::find($request->data['role_id']);
        // log what role is being added to what user
        Log::info('SuperAdminController@addRoleToUser: ' . $role->name . ' to ' . $user->name);
        //log the curent roles of the user
        Log::info('SuperAdminController@addRoleToUser: ' . $user->getRoleNames());
        $user->assignRole($role);
        //if the role was added log it
        if ($user->hasRole($role->name)) {
            Log::info('SuperAdminController@addRoleToUser: ' . $role->name . ' added to ' . $user->name);
        } else {
            Log::error('SuperAdminController@addRoleToUser: ' . $role->name . ' not added to ' . $user->name);
            return Inertia::render('Error', ['message' => 'Role not added to user.']);
        }
        return redirect()->route('superadmin.index');
    }

    //remove a role from a user (deassignation)
    public function removeRoleFromUser(Request $request)
    {

        Log::info($request->data);
        $user = User::find($request->data['user_id']);
        $role = Role::find($request->data['role_id']);
        // log what role is being removed from what user
        Log::info('SuperAdminController@removeRoleFromUser: ' . $role->name . ' from ' . $user->name);
        //log the curent roles of the user
        Log::info('SuperAdminController@removeRoleFromUser: ' . $user->getRoleNames());
        $user->removeRole($role);
        //if the role was removed log it
        if (!$user->hasRole($role->name)) {
            Log::info('SuperAdminController@removeRoleFromUser: ' . $role->name . ' removed from ' . $user->name);
        } else {
            Log::error('SuperAdminController@removeRoleFromUser: ' . $role->name . ' not removed from ' . $user->name);
            //return to page with status error
            return Inertia::render('Error', ['message' => 'Role not remover from user']);
        }
        //return index function
        return redirect()->route('superadmin.index');
    }
}
