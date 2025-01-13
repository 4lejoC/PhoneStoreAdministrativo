<template>
    <HelloWorld :showMainContent="false" />
    <div class="main-content">
        <h1 class="text-center mb-4">Facturas</h1>
        <button @click="toggleForm()" class="btn btn-primary mb-4">
            {{ form.FAC_NUMERO ? "Editar Registro" : "Agregar" }}
        </button>

        <form v-if="showForm" @submit.prevent="handleSubmit" class="p-4 border rounded bg-light">
            <!-- Contenido del formulario -->
            <div class="mb-3">
                <label for="FAC_NUMERO" class="form-label">Número de Factura:</label>
                <input v-model="form.FAC_NUMERO" type="text" id="FAC_NUMERO" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="USU_DNI" class="form-label">DNI del Usuario:</label>
                <input v-model="form.USU_DNI" type="text" id="USU_DNI" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="USU_NOMBRE" class="form-label">Nombre del Usuario:</label>
                <input v-model="form.USU_NOMBRE" type="text" id="USU_NOMBRE" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="FAC_TOTAL" class="form-label">Total:</label>
                <input v-model="form.FAC_TOTAL" type="number" step="0.01" id="FAC_TOTAL" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="FAC_ESTADO" class="form-label">Estado:</label>
                <input v-model="form.FAC_ESTADO" type="text" id="FAC_ESTADO" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="FAC_DIRECCION" class="form-label">Dirección:</label>
                <input v-model="form.FAC_DIRECCION" type="text" id="FAC_DIRECCION" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="FAC_TELEFONO" class="form-label">Teléfono:</label>
                <input v-model="form.FAC_TELEFONO" type="text" id="FAC_TELEFONO" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="FAC_FECHA" class="form-label">Fecha:</label>
                <input v-model="form.FAC_FECHA" type="datetime-local" id="FAC_FECHA" class="form-control" required />
            </div>

            <div class="mb-3">
                <label for="USU_CORREO" class="form-label">Correo:</label>
                <input v-model="form.USU_CORREO" type="email" id="USU_CORREO" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>

        <h2 class="mt-4">Lista de Facturas</h2>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Número</th>
                        <th>DNI Usuario</th>
                        <th>Nombre Usuario</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Dirección</th>
                        <th>Teléfono</th>
                        <th>Fecha</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in facturas" :key="item.FAC_NUMERO">
                        <td>{{ item.FAC_NUMERO }}</td>
                        <td>{{ item.USU_DNI }}</td>
                        <td>{{ item.USU_NOMBRE }}</td>
                        <td>{{ item.FAC_TOTAL }}</td>
                        <td>{{ item.FAC_ESTADO }}</td>
                        <td>{{ item.FAC_DIRECCION }}</td>
                        <td>{{ item.FAC_TELEFONO }}</td>
                        <td>{{ item.FAC_FECHA }}</td>
                        <td>{{ item.USU_CORREO }}</td>
                        <td>
                            <button @click="editFactura(item)" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteFactura(item.FAC_NUMERO)" class="btn btn-sm btn-danger">
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
import HelloWorld from "../components/HelloWorld.vue";

export default {
    name: "Factura",
    components: {
        HelloWorld,
    },
    data() {
        return {
            apiUrl: "http://phonestore.runasp.net/api/Factura",
            facturas: [],
            showForm: false,
            form: {
                FAC_NUMERO: "",
                USU_DNI: "",
                USU_NOMBRE: "",
                FAC_TOTAL: null,
                FAC_ESTADO: "",
                FAC_DIRECCION: "",
                FAC_TELEFONO: "",
                FAC_FECHA: "",
                USU_CORREO: "",
            },
        };
    },
    methods: {
        loadFacturas() {
            axios
                .get(this.apiUrl)
                .then((response) => {
                    this.facturas = response.data;
                })
                .catch((error) => {
                    console.error("Error al cargar facturas:", error);
                });
        },
        toggleForm() {
            this.resetForm();
            this.showForm = !this.showForm;
        },
        handleSubmit() {
            const existingRecord = this.facturas.find(
                (item) => item.FAC_NUMERO === this.form.FAC_NUMERO
            );

            if (existingRecord) {
                this.updateFactura();
            } else {
                this.createFactura();
            }
        },
        createFactura() {
            axios
                .post(this.apiUrl, this.form)
                .then(() => {
                    alert("Factura agregada con éxito.");
                    this.resetForm();
                    this.loadFacturas();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al agregar factura:", error);
                });
        },
        updateFactura() {
            axios
                .put(`${this.apiUrl}/${this.form.FAC_NUMERO}`, this.form)
                .then(() => {
                    alert("Factura actualizada con éxito.");
                    this.resetForm();
                    this.loadFacturas();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al actualizar factura:", error);
                });
        },
        editFactura(item) {
            this.form = { ...item };
            this.showForm = true;
        },
        deleteFactura(FAC_NUMERO) {
            if (confirm("¿Estás seguro de que deseas eliminar esta factura?")) {
                axios
                    .delete(`${this.apiUrl}?FacNumero=${FAC_NUMERO}`)
                    .then(() => {
                        alert("Factura eliminada con éxito.");
                        this.loadFacturas();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar factura:", error);
                    });
            }
        },
        resetForm() {
            this.form = {
                FAC_NUMERO: "",
                USU_DNI: "",
                USU_NOMBRE: "",
                FAC_TOTAL: null,
                FAC_ESTADO: "",
                FAC_DIRECCION: "",
                FAC_TELEFONO: "",
                FAC_FECHA: "",
                USU_CORREO: "",
            };
        },
    },
    mounted() {
        this.loadFacturas();
    },
};
</script>

<style scoped>
    @import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
    @import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

    /* Estilo adicional para centrar la tabla */
    .table-responsive {
        max-width: auto;
        /* Ancho máximo de la tabla */
        margin: auto;
        /* Centrar horizontalmente */
    }

    /* Estilos para el formulario */
    form {
        background-color: #f8f9fa;
        /* Color de fondo del formulario */
        padding: 20px;
        /* Espaciado interno */
        border-radius: 8px;
        /* Bordes redondeados */
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        /* Sombra */
    }

    /* Puedes añadir aquí estilos personalizados adicionales */
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