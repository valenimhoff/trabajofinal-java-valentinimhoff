$(document).ready(function () {
    $("#subtotal").text(calcularTotalCarrito());
    $("#metodo-envio").on("change", calcularEnvio);
    $("#metodo-pago").on("change", validarPago);
    validarFormulario();
});

function validarFormulario() {
    $("#form-carrito").submit(function (e) {
        if ($("#nombre").val() == "") {
            e.preventDefault();
            $("#error-nombre").fadeIn();
            $("#nombre").change(function () {
                $("#error-nombre").fadeOut();
            });
        } else if ($("#email").val() == "") {
            e.preventDefault();
            $("#error-email").fadeIn();
            $("#email").change(function () {
                $("#error-email").fadeOut();
            });
        } else if ($("#telefono").val() == "") {
            e.preventDefault();
            $("#error-tel").fadeIn();
            $("#telefono").change(function () {
                $("#error-tel").fadeOut();
            });
        } else if ($("#direccion").val() == "") {
            e.preventDefault();
            $("#error-direccion").fadeIn();
            $("#direccion").change(function () {
                $("#error-direccion").fadeOut();
            })
        } else if ($("#metodo-envio").val() == "defecto") {
            e.preventDefault();
            $("#error-envio").fadeIn();
            $("#metodo-envio").on("change", calcularEnvio);
        } else if ($("#metodo-pago").val() == "defecto") {
            e.preventDefault();
            $("#error-pago").fadeIn();
            $("#metodo-pago").on("change", validarPago);
        } else if ($("#metodo-pago").val() == "debito" || $("#metodo-pago").val() == "credito") {
            e.preventDefault();
            if (($("#num-tarjeta").val() == "") || ($("#num-tarjeta").val().length != 16)) {
                e.preventDefault();
                $("#error-numtarj").fadeIn();
                $("#num-tarjeta").change(function () {
                    $("#error-numtarj").fadeOut();
                });
            } else if (($("#cod-seguridad").val() == "") || ($("#cod-seguridad").val().length != 3)) {
                e.preventDefault();
                $("#error-codseg").fadeIn();
                $("#cod-seguridad").change(function () {
                    $("#error-codseg").fadeOut();
                });
            } else {
                e.preventDefault();

                let datosCompra = [];
                datosCompra.push($("#nombre").val());
                datosCompra.push($("#email").val());
                datosCompra.push($("#telefono").val());
                datosCompra.push($("#direccion").val());
                datosCompra.push($("#metodo-envio").val());
                datosCompra.push($("#metodo-pago").val());
                datosCompra.push($("#num-tarjeta").val());
                datosCompra.push($("#cod-seguridad").val());

                let datosCompraJSON = JSON.stringify(datosCompra);
                enviarDatos(datosCompraJSON);

                Swal.fire({
                    icon: 'success',
                    title: '¡Compra confirmada!',
                    text: 'Vas a recibir un mail de confirmación con el detalle de la compra en tu casilla',
                    confirmButtonColor: "#444444"
                });

                vaciarCarrito();

                $(".entrada-pago").val('');
                $("#metodo-envio option[value='defecto']").attr("selected", true);
                $("#metodo-pago option[value='defecto']").attr("selected", true);
            };
        } else {
            e.preventDefault();

            let datosCompra = [];
            datosCompra.push($("#nombre").val());
            datosCompra.push($("#email").val());
            datosCompra.push($("#telefono").val());
            datosCompra.push($("#direccion").val());
            datosCompra.push($("#metodo-envio").val());
            datosCompra.push($("#metodo-pago").val());

            let datosCompraJSON = JSON.stringify(datosCompra);
            enviarDatos(datosCompraJSON);

            Swal.fire({
                icon: 'success',
                title: '¡Compra confirmada!',
                text: 'Vas a recibir un mail de confirmación con el detalle de la compra en tu casilla',
                confirmButtonColor: "#444444"
            });

            vaciarCarrito();

            $(".entrada-pago").val('');
            $("#metodo-envio option[value='defecto']").attr("selected", true);
            $("#metodo-pago option[value='defecto']").attr("selected", true);
        };
    });
};

function calcularEnvio() {
    let envio;
    let metodoEnvio = $("#metodo-envio").val();
    if (metodoEnvio == "caba") {
        envio = 800;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
    if (metodoEnvio == "retiro") {
        envio = 0;
        $("#envio").text(envio);
        $("#total").text(calcularTotalCompra(envio));
        $("#error-envio").hide();
    };
};

function calcularTotalCompra(envio) {
    let total = 0;
    for (const producto of carrito) {
        total += producto.precio * producto.cantidad;
    }
    return total + envio;
};

function validarPago() {
    let metodoPago = $("#metodo-pago").val();
    if (metodoPago == "debito" || metodoPago == "credito") {
        $(".pago-tarjeta").fadeIn();
        $("#error-pago").fadeOut();
    };
    if (metodoPago == "efectivo") {
        $(".pago-tarjeta").fadeOut();
        $("#error-pago").fadeOut();
        $("#error-numtarj").fadeOut();
        $("#error-codseg").fadeOut();
    };
};

function vaciarCarrito() {
    $("#gastoTotal").text("Total: $0");
    $("#cantidad-compra").text("0");
    $(".tabla-carrito").remove();
    localStorage.clear();
    carrito = [];
}

function enviarDatos(datos) {
    const URLPOST = "https://jsonplaceholder.typicode.com/posts";

    $.post(URLPOST, datos).done(function (respuesta, estado) {
        console.log(respuesta);
        console.log(estado);
    })
}