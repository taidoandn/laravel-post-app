<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
        <div class="container">
            <router-link class="navbar-brand" :to="{ name: 'home' }">
                Laravel
            </router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- Left Side Of Navbar -->
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'about' }">
                            About
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" :to="{ name: 'posts' }">
                            Posts
                        </router-link>
                    </li>
                </ul>

                <!-- Right Side Of Navbar -->
                <ul class="navbar-nav ml-auto">
                    <!-- Authentication Links -->
                    <template v-if="!authenticated">
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'login' }"
                            >
                                Login
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link"
                                :to="{ name: 'register' }"
                            >
                                Register
                            </router-link>
                        </li>
                    </template>

                    <template v-else>
                        <li class="nav-item dropdown">
                            <a
                                id="navbarDropdown"
                                class="nav-link dropdown-toggle"
                                href="#"
                                role="button"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                {{ user.name }}
                            </a>

                            <div
                                class="dropdown-menu dropdown-menu-right"
                                aria-labelledby="navbarDropdown"
                            >
                                <router-link
                                    class="dropdown-item"
                                    href="#"
                                    :to="{ name: 'logout' }"
                                >
                                    Logout
                                </router-link>
                            </div>
                        </li>
                    </template>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    export default {
        computed: {
            ...mapGetters({
                authenticated: 'auth/authenticated',
                user: 'auth/user',
            }),
        },
    };
</script>

<style scoped></style>
