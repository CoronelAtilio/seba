function updateTable(data) {

    const atributos = document.querySelector('.atributos');
    const valores = document.querySelector('.valores');
    atributos.innerHTML = '';
    valores.innerHTML = '';

    // Suponiendo que todos los objetos tienen las mismas claves
    const keys = Object.keys(data.data[0]);

    // Agregar los nombres de los atributos a la cabecera
    keys.forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        atributos.appendChild(th);
    });

    // Agregar los valores de los objetos al cuerpo de la tabla
    data.data.forEach(item => {
        const tr = document.createElement('tr'); // Nueva fila para cada objeto
        keys.forEach(key => {
            const td = document.createElement('td');
            td.textContent = item[key];
            tr.appendChild(td); // Agregar cada valor a la fila
        });
        valores.appendChild(tr); // Agregar la fila completa a la tabla
    });

    //cambio nombre al seleccionar categoría
    const nombreCategoria = document.getElementById('categoria_nombre')
    nombreCategoria.textContent = data.meta.table_name
}


document.addEventListener('DOMContentLoaded', function () {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    // TOGGLE SIDEBAR
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');

    // Restaurar el estado del sidebar desde localStorage
    if (localStorage.getItem('sidebar-state') === 'hidden') {
        sidebar.classList.add('hide');
    }

    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
        // Guardar el estado del sidebar en localStorage
        if (sidebar.classList.contains('hide')) {
            localStorage.setItem('sidebar-state', 'hidden');
        } else {
            localStorage.setItem('sidebar-state', 'visible');
        }
    });

    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    searchButton.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
            if (!searchForm.classList.contains('show')) {
                e.preventDefault();
                searchForm.classList.add('show');
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchForm.submit();
            }
        }
    });

    const switchMode = document.getElementById('switch-mode');

    // Restaurar el estado del modo oscuro desde localStorage
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark');
        switchMode.checked = true;
    }

    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
            localStorage.setItem('dark-mode', 'enabled');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('dark-mode', 'disabled');
        }
    });

    // Selecciona todos los botones de categoría
    const categoryButtons = document.querySelectorAll('.category-button');
    console.log(categoryButtons);
    // Agrega un event listener a cada botón
    categoryButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            console.log(event.target.innerText);
            fetch(`/api/index/${event.target.innerText}`)
                .then(response => response.json())
                .then(alumnos => {
                    updateTable(alumnos);
                })
                .catch(error => console.error('Error:', error));
        });
    });

});

// Evento para manejar el cambio de tamaño de la ventana
window.addEventListener('resize', function () {
    const sidebar = document.getElementById('sidebar');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');

    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
        localStorage.setItem('sidebar-state', 'hidden');
    } else if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }
});
