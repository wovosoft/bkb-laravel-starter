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
            </Collapse>
        </template>
    </Navbar>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {Navbar, Collapse, Nav, NavItem, NavItemDropdown, DropdownItem, Input, Button} from "@wovosoft/wovoui";
import NavItemLink from "./NavItemLink.vue";

export default defineComponent({
    components: {
        Navbar, Collapse, Nav, NavItem, NavItemDropdown, DropdownItem, Input, Button,
        NavItemLink
    }
})

</script>
