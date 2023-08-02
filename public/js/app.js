window.addEventListener("DOMContentLoaded", () => {
    function init() {
        if (window.location.pathname === "/register") {
            const formRegister = document.querySelector("#FormRegister");

            formRegister.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(formRegister);
                const data = Object.fromEntries(formData.entries());

                if (!data.email || !data.password || !data.repeatPassword) {
                    Toastify({
                        text: "Todos los campos son obligatorios",
                        duration: 3000,
                        close: false,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "red",
                        stopOnFocus: true,
                    }).showToast();
                } else {
                    if (data.password !== data.repeatPassword) {
                        Toastify({
                            text: "Las contraseñas no coinciden",
                            duration: 3000,
                            close: false,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "red",
                            stopOnFocus: true,
                        }).showToast();
                    } else {
                        const response = await fetch("/register", {
                            method: "POST",
                            body: JSON.stringify(data),
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });

                        const responseData = await response.json();

                        if (responseData.status === "success") {
                            Toastify({
                                text: responseData.msg,
                                duration: 3000,
                                close: false,
                                gravity: "top",
                                position: "right",
                                backgroundColor: "green",
                                stopOnFocus: true,
                            }).showToast();

                            window.location.href = "/login";
                        } else {
                            Toastify({
                                text: responseData.msg,
                                duration: 3000,
                                close: false,
                                gravity: "top",
                                position: "right",
                                backgroundColor: "red",
                                stopOnFocus: true,
                            }).showToast();
                        }
                    }
                }
            });
        }

        if (window.location.pathname === "/login") {
            const formLogin = document.querySelector("#FormLogin");

            formLogin.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(formLogin);
                const data = Object.fromEntries(formData.entries());

                console.log(data);

                if (!data.email || !data.password) {
                    Toastify({
                        text: "Todos los campos son obligatorios",
                        duration: 3000,
                        close: false,
                        gravity: "top",
                        position: "right",
                        backgroundColor: "red",
                        stopOnFocus: true,
                    }).showToast();
                } else {
                    const response = await fetch("/login", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    const responseData = await response.json();

                    if (responseData.status === "success") {
                        Toastify({
                            text: responseData.msg,
                            duration: 3000,
                            close: false,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "green",
                            stopOnFocus: true,
                        }).showToast();

                        window.location.href = "/";
                    }

                    if (responseData.status === "error") {
                        Toastify({
                            text: responseData.msg,
                            duration: 3000,
                            close: false,
                            gravity: "top",
                            position: "right",
                            backgroundColor: "red",
                            stopOnFocus: true,
                        }).showToast();
                    }
                }
            });
        }
    }

    init();
});
