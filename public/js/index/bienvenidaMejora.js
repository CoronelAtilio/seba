            // Este script se ejecuta antes de que se muestre el contenido
            document.addEventListener('DOMContentLoaded', function () {
                // Restaurar el estado del sidebar desde localStorage
                const sidebar = document.getElementById('sidebar');
                if (localStorage.getItem('sidebar-state') === 'hidden') {
                    sidebar.classList.add('hide');
                }
                
                // Restaurar el estado del modo oscuro desde localStorage
                const switchMode = document.getElementById('switch-mode');
                if (localStorage.getItem('dark-mode') === 'enabled') {
                    document.body.classList.add('dark');
                    switchMode.checked = true;
                }
    
                // Mostrar el contenido del cuerpo después de restaurar el estado
                document.body.classList.remove('hidden');
            });