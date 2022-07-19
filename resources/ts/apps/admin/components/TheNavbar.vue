<template>
    <Navbar brand="BKB eAccounts" bg-variant="dark" variant="dark" fluid brand-url="/admin">
        <template #default="{collapsed}">
            <Collapse is-nav :visible="collapsed">
                <Nav class="me-auto mb-2 mb-lg-0" navs>
                    <NavItemDropdown text="User Management">
                        <NavItemLink :to="{name:'users.index'}">
                            Users
                        </NavItemLink>
                        <NavItemLink :to="{name:'roles.index'}">
                            Roles
                        </NavItemLink>
                        <NavItemLink :to="{name:'permissions.index'}">
                            Permissions
                        </NavItemLink>
                    </NavItemDropdown>

                    <NavItemDropdown text="Configuration">
                        <NavItemLink :to="{name:'offices.index'}">
                            Offices
                        </NavItemLink>
                        <NavItemLink :to="{name:'geocode.index'}">
                            Addresses
                        </NavItemLink>
                    </NavItemDropdown>
                </Nav>
                <Nav>
                    <NavItem v-if="loading">
                        <Spinner size="sm" variant="light"/>
                    </NavItem>
                </Nav>
            </Collapse>
        </template>

    </Navbar>
</template>

<script lang="ts" setup>
import {loading} from "../shared/globalLoader";
import {Navbar, Collapse, Nav, NavItem, NavItemDropdown, Spinner} from "@wovosoft/wovoui";
import NavItemLink from "./NavItemLink.vue";
</script>
