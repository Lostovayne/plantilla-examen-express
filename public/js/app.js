window.addEventListener("DOMContentLoaded", () => {
    function init() {
        if (window.location.pathname === "/api/users/register") {
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
                        const response = await fetch("/api/users/register", {
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

                            window.location.href = "/api/users/login";
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

        if (window.location.pathname === "/api/users/login") {
            const formLogin = document.querySelector("#FormLogin");

            formLogin.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(formLogin);
                const data = Object.fromEntries(formData.entries());

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
                    const response = await fetch("/api/users/login", {
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

                        window.location.href = "/api/users/";
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

        if (window.location.pathname === "/api/users/perfil") {
            const formUpdate = document.querySelector("#FormUpdate");

            formUpdate.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(formUpdate);
                const data = Object.fromEntries(formData.entries());
                console.log(data);
                const response = await fetch(`/api/users/${data.id}`, {
                    method: "PUT",
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
            });
        }

        if (window.location.pathname === "/api/events/all") {
            const FormEvent = document.querySelector("#FormEvent");
            FormEvent.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(FormEvent);
                const data = Object.fromEntries(formData.entries());

                const response = await fetch("/api/events/all", {
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
            });
        }

        if (window.location.pathname === "/api/donations") {
            const FormDonation = document.querySelector("#FormDonation");
            FormDonation.addEventListener("submit", async (e) => {
                e.preventDefault();
                const formData = new FormData(FormDonation);
                const data = Object.fromEntries(formData.entries());

                const response = await fetch("/api/donations", {
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
            });
        }
    }

    init();
});
