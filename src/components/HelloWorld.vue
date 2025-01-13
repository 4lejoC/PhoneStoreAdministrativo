<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
  <div class="d-flex">
    <!-- Sidebar -->
    <nav class="bg-dark text-white sidebar vh-100">
      <div class="sidebar-header p-4">
        <h3><i class="fas fa-cogs"></i> Gestión</h3>
      </div>
      <ul class="list-unstyled px-2">
        <li>
          <RouterLink to="/" class="text-white nav-link">
            <i class="fas fa-home"></i> Inicio
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/DatosGeneralesView" class="text-white nav-link">
            <i class="fas fa-database"></i> Datos Generales
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/DetalleFacturaView" class="text-white nav-link">
            <i class="fas fa-file-invoice"></i> Detalle Factura
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/FacturasView" class="text-white nav-link">
            <i class="fas fa-file"></i> Facturas
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/ProductosView" class="text-white nav-link">
            <i class="fas fa-box"></i> Productos
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/UsuariosView" class="text-white nav-link">
            <i class="fas fa-users"></i> Usuarios
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Main Content -->
    <div v-if="showMainContent" class="main-content p-4 w-100">
      <h1 class="text-center mb-4">Gestión del Sistema</h1>
      <p class="text-center">Selecciona una sección en el menú lateral para gestionar los datos.</p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'HelloWorld',
  props: {
    msg: String,
    showMainContent: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
}

.sidebar {
  min-width: 250px;
  height: 100vh;
  position: fixed;
}

.main-content {
  margin-left: 250px;
}

.sidebar-header {
  background: #212529;
  text-align: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  text-decoration: none;
}
</style>
