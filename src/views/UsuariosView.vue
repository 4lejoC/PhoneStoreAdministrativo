<template>
    <HelloWorld :showMainContent="false" />
    <div class="main-content">
        <h1 class="text-center mb-4">Datos del Usuario</h1>
        <button @click="toggleForm()" class="btn btn-primary mb-4">
            {{ form.USU_DNI ? "Editar Registro" : "Agregar Usuario" }}
        </button>

        <form v-if="showForm" @submit.prevent="handleSubmit" class="p-4 border rounded bg-light">
            <div class="form-group col-md-4">
                <label for="USU_DNI">DNI</label>
                <input v-model="form.USU_DNI" type="text" class="form-control" id="USU_DNI" placeholder="Ingrese DNI" required>
            </div>
            <div class="form-group col-md-4">
                <label for="USU_NOMBRE">Nombre</label>
                <input v-model="form.USU_NOMBRE" type="text" class="form-control" id="USU_NOMBRE" placeholder="Ingrese Nombre" required>
            </div>
            <div class="form-group col-md-4">
                <label for="USU_CONTRASENA">Contraseña</label>
                <input v-model="form.USU_CONTRASENA" type="password" class="form-control" id="USU_CONTRASENA" placeholder="Ingrese Contraseña" required>
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>

        <h2 class="mt-4">Lista de Usuarios</h2>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>DNI</th>
                        <th>Nombre</th>
                        <th>Contraseña</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in usuarios" :key="item.USU_DNI">
                        <td>{{ item.USU_DNI }}</td>
                        <td>{{ item.USU_NOMBRE }}</td>
                        <td>{{ item.USU_CONTRASENA }}</td>
                        <td>
                            <button @click="editUsuario(item)" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteUsuario(item.USU_DNI)" class="btn btn-sm btn-danger">
                                <i class="fas fa-trash"></i> Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import HelloWorld from '../components/HelloWorld.vue';

export default {
    name: "Usuarios",
    components: {
        HelloWorld,
    },
    data() {
        return {
            apiUrl: "api/Usuario",
            usuarios: [],
            showForm: false,
            form: {
                USU_DNI: '',
                USU_NOMBRE: '',
                USU_CONTRASENA: '',
            },
        };
    },
    methods: {
        loadUsuarios() {
            axios.get(this.apiUrl)
                .then((response) => {
                    this.usuarios = response.data;
                })
                .catch((error) => {
                    console.error("Error al cargar usuarios:", error);
                });
        },
        toggleForm() {
            this.resetForm();
            this.showForm = !this.showForm;
        },
        handleSubmit() {
            const existingRecord = this.usuarios.find(
                (item) => item.USU_DNI === this.form.USU_DNI
            );

            if (existingRecord) {
                this.updateUsuario();
            } else {
                this.createUsuario();
            }
        },
        createUsuario() {
            axios.post(this.apiUrl, this.form)
                .then(() => {
                    alert("Usuario agregado con éxito.");
                    this.resetForm();
                    this.loadUsuarios();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al agregar usuario:", error);
                });
        },
        updateUsuario() {
            axios.put(`${this.apiUrl}/${this.form.USU_DNI}`, this.form)
                .then(() => {
                    alert("Usuario actualizado con éxito.");
                    this.resetForm();
                    this.loadUsuarios();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al actualizar usuario:", error);
                });
        },
        editUsuario(item) {
            this.form = { ...item };
            this.showForm = true;
        },
        deleteUsuario(usuDNI) {
            if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
                axios.delete(`${this.apiUrl}/Usuario?DNI=${usuDNI}`)
                    .then(() => {
                        alert("Usuario eliminado con éxito.");
                        this.loadUsuarios();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar usuario:", error);
                    });
            }
        },
        resetForm() {
            this.form = {
                USU_DNI: '',
                USU_NOMBRE: '',
                USU_CONTRASENA: '',
            };
        },
    },
    mounted() {
        this.loadUsuarios();
    },
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

.table-responsive {
    max-width: 800px;
    margin: auto;
}

form {
    background-color: #f8f9fa;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar {
    width: 250px;
    position: fixed;
    height: 100%;
    overflow-y: auto;
}

.main-content {
    margin-left: 250px;
    padding: 20px;
    width: calc(100% - 250px);
}

.vh-100 {
    min-height: 100vh;
}

h2 {
    text-align: center;
}
</style>