<template>
    <HelloWorld :showMainContent="false" />
    <div class="main-content">
        <h1 class="text-center mb-4">Datos del Producto</h1>
        <button @click="toggleForm()" class="btn btn-primary mb-4">
            {{ form.PRD_ID ? "Editar Registro" : "Agregar Producto" }}
        </button>

        <form v-if="showForm" @submit.prevent="handleSubmit" class="p-4 border rounded bg-light">
            <div class="mb-3">
                <label for="PRD_ID" class="form-label">ID:</label>
                <input v-model="form.PRD_ID" type="text" id="PRD_ID" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_NOMBRE" class="form-label">Nombre:</label>
                <input v-model="form.PRD_NOMBRE" type="text" id="PRD_NOMBRE" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_DESC" class="form-label">Descripción:</label>
                <input v-model="form.PRD_DESC" type="text" id="PRD_DESC" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_MARCA" class="form-label">Marca:</label>
                <input v-model="form.PRD_MARCA" type="text" id="PRD_MARCA" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_STOCK" class="form-label">Stock:</label>
                <input v-model="form.PRD_STOCK" type="number" id="PRD_STOCK" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_PRECIO" class="form-label">Precio:</label>
                <input v-model="form.PRD_PRECIO" type="number" id="PRD_PRECIO" class="form-control" required />
            </div>
            <div class="mb-3">
                <label for="PRD_IMAGEN" class="form-label">Imagen (URL):</label>
                <input v-model="form.PRD_IMAGEN" type="text" id="PRD_IMAGEN" class="form-control" />
            </div>

            <button type="submit" class="btn btn-primary">Guardar</button>
        </form>

        <h2 class="mt-4">Lista de Productos</h2>
        <div class="table-responsive">
            <table class="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Marca</th>
                        <th>Stock</th>
                        <th>Precio</th>
                        <th>Imagen</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in productos" :key="item.PRD_ID">
                        <td>{{ item.PRD_ID }}</td>
                        <td>{{ item.PRD_NOMBRE }}</td>
                        <td>{{ item.PRD_DESC }}</td>
                        <td>{{ item.PRD_MARCA }}</td>
                        <td>{{ item.PRD_STOCK }}</td>
                        <td>{{ item.PRD_PRECIO }}</td>
                        <td>{{ item.PRD_IMAGEN }}</td>
                        <td>
                            <button @click="editProducto(item)" class="btn btn-sm btn-warning">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                            <button @click="deleteProducto(item.PRD_ID)" class="btn btn-sm btn-danger">
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
    name: "Productos",
    components: {
        HelloWorld,
    },
    data() {
        return {
            apiUrl: "api/Producto",
            productos: [],
            showForm: false,
            form: {
                PRD_ID: null,
                PRD_NOMBRE: '',
                PRD_DESC: '',
                PRD_MARCA: '',
                PRD_STOCK: null,
                PRD_PRECIO: null,
                PRD_IMAGEN: '',
            },
        };
    },
    methods: {
        loadProductos() {
            axios.get(this.apiUrl)
                .then((response) => {
                    this.productos = response.data;
                })
                .catch((error) => {
                    console.error("Error al cargar productos:", error);
                });
        },
        toggleForm() {
            this.resetForm();
            this.showForm = !this.showForm;
        },
        handleSubmit() {
            const existingRecord = this.productos.find(
                (item) => item.PRD_ID === this.form.PRD_ID
            );

            if (existingRecord) {
                this.updateProducto();
            } else {
                this.createProducto();
            }
        },
        createProducto() {
            axios.post(this.apiUrl, this.form)
                .then(() => {
                    alert("Producto agregado con éxito.");
                    this.resetForm();
                    this.loadProductos();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al agregar producto:", error);
                });
        },
        updateProducto() {
            axios.put(`${this.apiUrl}/${this.form.PRD_ID}`, this.form)
                .then(() => {
                    alert("Producto actualizado con éxito.");
                    this.resetForm();
                    this.loadProductos();
                    this.showForm = false;
                })
                .catch((error) => {
                    console.error("Error al actualizar producto:", error);
                });
        },
        editProducto(item) {
            this.form = { ...item };
            this.showForm = true;
        },
        deleteProducto(prdId) {
            if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                axios.delete(`${this.apiUrl}?PrdNombre=${prdId}`)
                    .then(() => {
                        alert("Producto eliminado con éxito.");
                        this.loadProductos();
                    })
                    .catch((error) => {
                        console.error("Error al eliminar producto:", error);
                    });
            }
        },
        resetForm() {
            this.form = {
                PRD_ID: null,
                PRD_NOMBRE: '',
                PRD_DESC: '',
                PRD_MARCA: '',
                PRD_STOCK: null,
                PRD_PRECIO: null,
                PRD_IMAGEN: '',
            };
        },
    },
    mounted() {
        this.loadProductos();
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
    