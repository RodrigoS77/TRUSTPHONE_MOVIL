# TrustPhone Mobile

Aplicación móvil desarrollada con **React Native y Expo** para la plataforma **TrustPhone**, orientada a la visualización y gestión de teléfonos disponibles.

La aplicación cuenta con funcionalidades relacionadas con la autenticación de usuarios, registro, visualización de productos, carrito de compras y gestión del perfil del usuario.

---

## Características principales

* Inicio de sesión de usuarios.
* Registro de nuevos usuarios.
* Visualización de teléfonos disponibles.
* Consulta de información de productos.
* Carrito de compras.
* Visualización y gestión del perfil del usuario.
* Gestión de información personal.
* Interfaz adaptable para dispositivos móviles.
* Compatibilidad con Android, iOS y Web mediante Expo.

---

## Tecnologías utilizadas

El proyecto fue desarrollado utilizando las siguientes tecnologías:

* **React Native**
* **React**
* **Expo**
* **Expo Router**
* **JavaScript**
* **React Navigation**
* **Expo Vector Icons**

---

## Estructura del proyecto

```text
TRUSTPHONE_MOVIL
│
├── app/
│   ├── _layout.jsx
│   ├── index.jsx
│   └── register.jsx
│
├── assets/
│   └── images/
│
├── src/
│   │
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Divider.jsx
│   │   ├── HeaderLogo.jsx
│   │   ├── HeaderRegisterLogo.jsx
│   │   ├── Input.jsx
│   │   └── SocialButton.jsx
│   │
│   ├── hooks/
│   │   ├── useAuthForm.js
│   │   ├── useCustomData.js
│   │   ├── usePhones.js
│   │   └── useRegisterForm.js
│   │
│   ├── screens/
│   │   ├── CartScreen.jsx
│   │   ├── DashboardScreen.jsx
│   │   ├── LoginScreen.jsx
│   │   ├── PersonalInfoScreen.jsx
│   │   ├── ProfileScreen.jsx
│   │   └── RegisterScreen.jsx
│   │
│   └── styles/
│       ├── cartStyles.js
│       ├── dashboardStyles.js
│       ├── loginStyles.js
│       ├── profileStyles.js
│       └── theme.js
│
├── App.js
├── app.json
├── package.json
└── README.md
```

---

## Instalación

Para ejecutar el proyecto de manera local, sigue los siguientes pasos.

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

### 2. Acceder a la carpeta del proyecto

```bash
cd TRUSTPHONE_MOVIL
```

### 3. Instalar las dependencias

```bash
npm install
```

---

## Ejecutar la aplicación

Para iniciar el servidor de desarrollo de Expo:

```bash
npm start
```

También puedes utilizar:

```bash
npx expo start
```

Una vez iniciado el proyecto, podrás ejecutarlo en diferentes plataformas.

### Android

```bash
npm run android
```

### iOS

```bash
npm run ios
```

### Web

```bash
npm run web
```

---

## Pantallas principales

### Login

Permite a los usuarios iniciar sesión dentro de la aplicación.

La pantalla utiliza componentes reutilizables como:

* Inputs personalizados.
* Botones.
* Logo de la aplicación.
* Botones sociales.
* Validaciones de formulario.

---

### Registro

Permite registrar nuevos usuarios dentro de la plataforma.

Incluye validaciones mediante hooks personalizados para facilitar el manejo de la información ingresada por el usuario.

---

### Dashboard

Muestra los teléfonos disponibles dentro de TrustPhone.

La información de los productos es gestionada mediante hooks personalizados, facilitando la separación entre la lógica de datos y la interfaz de usuario.

---

### Carrito de compras

Permite visualizar los productos agregados al carrito.

---

### Perfil

Muestra la información relacionada con el usuario y proporciona acceso a diferentes opciones de configuración y gestión de cuenta.

---

### Información personal

Permite consultar y gestionar la información personal del usuario.

---

## Componentes reutilizables

El proyecto utiliza diferentes componentes reutilizables para mantener una estructura organizada y facilitar el mantenimiento de la aplicación.

Entre ellos se encuentran:

* `Button`
* `Input`
* `Divider`
* `HeaderLogo`
* `HeaderRegisterLogo`
* `SocialButton`

---

## Custom Hooks

La lógica de diferentes funcionalidades se encuentra separada mediante hooks personalizados.

### useAuthForm

Gestiona la lógica relacionada con el inicio de sesión.

### useRegisterForm

Gestiona la información y validaciones del formulario de registro.

### usePhones

Se encarga de obtener y gestionar la información relacionada con los teléfonos.

### useCustomData

Permite gestionar información y datos personalizados dentro de la aplicación.

---

## Sistema de estilos

La aplicación cuenta con archivos de estilos separados según cada módulo o pantalla:

* `loginStyles.js`
* `dashboardStyles.js`
* `cartStyles.js`
* `profileStyles.js`

Además, el archivo `theme.js` contiene configuraciones generales relacionadas con:

* Colores.
* Tamaños de fuente.
* Espaciados.
* Bordes.
* Sombras.

Esto permite mantener una apariencia visual consistente en toda la aplicación.

---

## Scripts disponibles

### Iniciar el proyecto

```bash
npm start
```

### Ejecutar en Android

```bash
npm run android
```

### Ejecutar en iOS

```bash
npm run ios
```

### Ejecutar en Web

```bash
npm run web
```

### Ejecutar el linter

```bash
npm run lint
```

---

## Configuración de la aplicación

La configuración principal del proyecto se encuentra en el archivo:

```text
app.json
```

El proyecto utiliza Expo Router para gestionar la navegación basada en archivos.

---

## Desarrollo

TrustPhone Mobile fue desarrollado como una aplicación móvil utilizando React Native y Expo, aplicando conceptos como:

* Componentización.
* Reutilización de código.
* Custom Hooks.
* Manejo de formularios.
* Navegación entre pantallas.
* Organización modular del proyecto.
* Separación entre lógica, componentes y estilos.

---

## Licencia

Este proyecto fue desarrollado con fines académicos y de aprendizaje.
