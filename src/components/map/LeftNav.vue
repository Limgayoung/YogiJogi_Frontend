<script setup>

</script>

<template>
    <div>
        <v-card>
            <v-layout>
                <v-navigation-drawer theme="light" permanent rail>
                    <!-- <v-divider></v-divider> -->

                    <v-list nav>
                        <!-- <v-list-item prepend-icon="mdi-view-dashboard" value="dashboard"></v-list-item> -->
                        <v-list-item title="추천테마" value=""></v-list-item>   
                        <v-divider></v-divider>                
                        <v-list-item title="여행코스" value=""></v-list-item>                   
                        <v-divider></v-divider>
                        <v-list-item title="나의여행" value=""></v-list-item>                   
                        <v-divider></v-divider>
                        <v-list-item title="인기 여행지" value=""></v-list-item>    
                        <v-divider></v-divider>                            
                        <!-- <v-list-item prepend-icon="mdi-forum" value="messages"></v-list-item> -->
                    </v-list>
                </v-navigation-drawer>

                <v-navigation-drawer permanent>
                    <v-list>
                        <v-list-item title="Home" value="home"></v-list-item>

                        <v-list-item title="Contacts" value="contacts"></v-list-item>

                        <v-list-item title="Settings" value="settings"></v-list-item>
                    </v-list>
                </v-navigation-drawer>

                <!-- <v-main style="height: 500px"></v-main> -->
            </v-layout>
        </v-card>
    </div>
</template>

<style scoped>
div{
    width: 300px;
}
</style>