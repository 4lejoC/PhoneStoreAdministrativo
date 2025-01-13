<template>
    <HelloWorld :showMainContent="false" />
    <div class="main-content">
        <h1 class="text-center mb-4">Detalles de Facturas</h1>
        <button @click="toggleForm()" class="btn btn-primary mb-4">
            {{ form.FAC_NUMERO && form.PRD_ID ? "Editar Registro" : "Agregar" }}
        </button>

        <form v-if="showForm" @submit.prevent="handleSubmit" class="p-4 border rounded bg-light">
            <!-- Contenido del formulario -->
            <div class="mb-3">
                <label for="FAC_NUMERO" class="form-label">Número de Factura:</label>
                <input v-model="form.FAC_NUMERO" type="text" id="FAC_NUMERO" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_ID" class="form-label">ID del Producto:</label>
                <input v-model="form.PRD_ID" type="text" id="PRD_ID" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_CANTIDAD" class="form-label">Cantidad:</label>
                <input v-model="form.PRD_CANTIDAD" type="number" id="PRD_CANTIDAD" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_SUBTOTAL" class="form-label">Subtotal:</label>
                <input v-model="form.PRD_SUBTOTAL" type="number" step="0.01" id="PRD_SUBTOTAL" class="form-control" required />
            </div>
            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>

        <h2 class="mt-4">Lista de Detalles de Facturas</h2>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Factura</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in detalleFactura" :key="`${item.FAC_NUMERO}-${item.PRD_ID}`">
                        <td>{{ item.FAC_NUMERO }}</td>
                        <td>{{ item.PRD_ID }}</td>
                        <td>{{ item.PRD_CANTIDAD }}</td>
                        <td>{{ item.PRD_SUBTOTAL }}</td>
                        <td>
                            <button @click="editDetalleFactura(item)" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteDetalleFactura(item.FAC_NUMERO, item.PRD_ID)" class="btn btn-sm btn-danger">
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
    name: "DetalleFactura",
    components: {
        HelloWorld,
    },
    data() {
        return {
            apiUrl: "api/Detalle_Factura",
            detalleFactura: [],
            showForm: false,
            form: {
                FAC_NUMERO: "",
                PRD_ID: "",
                PRD_CANTIDAD: null,
                PRD_SUBTOTAL: null,
            },
        };
    },
    methods: {
        loadDetalleFactura() {
            axios
                .get(this.apiUrl)
                .then((response) => {
                    this.detalleFactura = response.data.sort((a, b) => {
                        if (a.FAC_NUMERO !== b.FAC_NUMERO) {
                            return a.FAC_NUMERO.localeCompare(b.FAC_NUMERO); // Ordenar por FAC_NUMERO
                        }
                        return a.PRD_ID.localeCompare(b.PRD_ID); // Ordenar por PRD_ID si FAC_NUMERO es igual
                    });
                })
                .catch((error) => {
                    console.error("Error al cargar los detalles de facturas:", error);
                });
        },
        toggleForm() {
            this.resetForm();
            this.showForm = !this.showForm;
        },
        handleSubmit() {
            // Verificar si ya existe un registro con las claves FAC_NUMERO y PRD_ID
            const existingRecord = this.detalleFactura.find(
                (item) => 
                    item.FAC_NUMERO === this.form.FAC_NUMERO && 
                    item.PRD_ID === this.form.PRD_ID
            );

            if (existingRecord) {
                // Si el registro existe, se actualiza
                this.updateDetalleFactura();
            } else {
                // Si el registro no existe, se crea uno nuevo
                this.createDetalleFactura();
            }
        },
        createDetalleFactura() {
            axios
                .post(this.apiUrl, this.form)
                .then(() => {
                    alert("Registro agregado con éxito.");
                    this.resetForm();
                    this.loadDetalleFactura();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al agregar detalle de factura:", error);
                });
        },
        updateDetalleFactura() {
            const { FAC_NUMERO, PRD_ID } = this.form;
            axios
                .put(`${this.apiUrl}?FAC_NUMERO=${FAC_NUMERO}&PRD_ID=${PRD_ID}`, this.form)
                .then(() => {
                    alert("Registro actualizado con éxito.");
                    this.resetForm();
                    this.loadDetalleFactura();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al actualizar detalle de factura:", error);
                });
        },
        editDetalleFactura(item) {
            this.form = { ...item };
            this.showForm = true;
        },
        deleteDetalleFactura(FAC_NUMERO, PRD_ID) {
            if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
                axios
                    .delete(`${this.apiUrl}?numFac=${FAC_NUMERO}&prdNombre=${PRD_ID}`)
                    .then(() => {
                        alert("Registro eliminado con éxito.");
                        this.loadDetalleFactura();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar detalle de factura:", error);
                    });
            }
        },
        resetForm() {
            this.form = {
                FAC_NUMERO: "",
                PRD_ID: "",
                PRD_CANTIDAD: null,
                PRD_SUBTOTAL: null,
            };
        },
    },
    mounted() {
        this.loadDetalleFactura();
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