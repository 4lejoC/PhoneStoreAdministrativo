<template>
    <HelloWorld :showMainContent="false" />
    <div class="main-content">
        <h1 class="text-center mb-4">Datos Generales</h1>
        <button @click="toggleForm()" class="btn btn-primary mb-4">
            {{ form.EMP_ID ? "Editar Registro" : "Agregar" }}
        </button>

        <form v-if="showForm" @submit.prevent="handleSubmit" class="p-4 border rounded bg-light">
            <!-- Contenido del formulario -->
            <div class="mb-3">
                <label for="EMP_ID" class="form-label">ID de Empresa (EMP_ID)</label>
                <input type="number" id="EMP_ID" v-model="form.EMP_ID" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="EMP_NCUENTA" class="form-label">Número de Cuenta (EMP_NCUENTA)</label>
                <input type="number" id="EMP_NCUENTA" v-model="form.EMP_NCUENTA" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="IVA" class="form-label">IVA</label>
                <input type="number" step="0.01" id="IVA" v-model="form.IVA" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="NUM_FAC" class="form-label">Número de Factura (NUM_FAC)</label>
                <input type="number" step="0.01" id="NUM_FAC" v-model="form.NUM_FAC" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>

        <h2 class="mt-4">Lista de Datos Generales</h2>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>EMP_ID</th>
                        <th>EMP_NCUENTA</th>
                        <th>IVA</th>
                        <th>NUM_FAC</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in datosGenerales" :key="item.EMP_ID">
                        <td>{{ item.EMP_ID }}</td>
                        <td>{{ item.EMP_NCUENTA }}</td>
                        <td>{{ item.IVA }}</td>
                        <td>{{ item.NUM_FAC }}</td>
                        <td>
                            <button @click="editDatosGenerales(item)" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteDatosGenerales(item.EMP_ID)" class="btn btn-sm btn-danger">
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
    name: "DatosGenerales",
    components: {
        HelloWorld,
    },
    data() {
        return {
            apiUrl: "http://phonestore.runasp.net/api/DatosGenerales",
            datosGenerales: [],
            showForm: false,
            form: {
                EMP_ID: null,
                EMP_NCUENTA: null,
                IVA: null,
                NUM_FAC: null,
            },
        };
    },
    methods: {
        loadDatosGenerales() {
            axios.get(this.apiUrl)
                .then((response) => {
                    this.datosGenerales = response.data;
                })
                .catch((error) => {
                    console.error("Error al cargar datos generales:", error);
                });
        },
        toggleForm() {
            // Siempre resetea el formulario al abrirlo
            this.resetForm();
            this.showForm = !this.showForm;
        },
        handleSubmit() {
            const existingRecord = this.datosGenerales.find(
                (item) => item.EMP_ID === this.form.EMP_ID
            );

            if (existingRecord) {
                // Si el registro existe, actualizarlo
                this.updateDatosGenerales();
            } else {
                // Si no existe, crear uno nuevo
                this.createDatosGenerales();
            }
        },
        createDatosGenerales() {
            axios.post(this.apiUrl, this.form)
                .then(() => {
                    alert("Registro agregado con éxito.");
                    this.resetForm();
                    this.loadDatosGenerales();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al agregar datos generales:", error);
                });
        },
        updateDatosGenerales() {
            axios.put(`${this.apiUrl}/${this.form.EMP_ID}`, this.form)
                .then(() => {
                    alert("Registro actualizado con éxito.");
                    this.resetForm();
                    this.loadDatosGenerales();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al actualizar datos generales:", error);
                });
        },
        editDatosGenerales(item) {
            this.form = { ...item }; // Cargar el item a editar
            this.showForm = true; // Mostrar el formulario para editar
        },
        deleteDatosGenerales(empId) {
            if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
                axios.delete(`${this.apiUrl}?empID=${empId}`)
                    .then(() => {
                        alert("Registro eliminado con éxito.");
                        this.loadDatosGenerales();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar datos generales:", error);
                    });
            }
        },
        resetForm() {
            this.form = { EMP_ID: null, EMP_NCUENTA: null, IVA: null, NUM_FAC: null }; // Reiniciar el formulario
        },
    },
    mounted() {
        this.loadDatosGenerales();
    },
};
</script>


<style scoped>
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css";
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";

/* Estilo adicional para centrar la tabla */
.table-responsive {
    max-width: 800px;
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