window.onload = function() {
    let mouse = false;
    const canvas = document.getElementById("canvas1");        
    const contenedor = document.getElementById("Contenedor");
        let cuadritos = [];
        let sizeCuadro = {ancho: 20, alto: 20};
        let color = "";
        const inputColor = document.getElementById("color");
        const inputSizeCuadros = document.getElementById("sizeCuadros");

    if (canvas && canvas.getContext) {            
 let ctx = canvas.getContext("2d");
            if (ctx) {
                function dibujaGrid(disX, disY, anchoLinea, color){
                    ctx.strokeStyle = color;
                    ctx.lineWidth = anchoLinea;
                    let columnas = [];
                    let filas = [];
                    for (i = disX; i < canvas.width; i += disX) {
                     ctx.beginPath();
                     ctx.moveTo(i, 0);
                     ctx.lineTo(i, canvas.height);
                      ctx.stroke();
                     columnas.push(i);
                      }
                      for (i = disY; i < canvas.height; i += disY) {
                        ctx.beginPath();
                        ctx.moveTo(0, i);
                        ctx.lineTo(ctx.canvas.width, i);
                        ctx.stroke();
                        filas.push(i);
                    }
                    columnas.push(0);
                    filas.push(0);
                    for (x = 0; x < columnas.length; x++) {
                        for (y = 0; y < filas.length; y++) {
                            cuadritos.push([columnas[x], filas[y], disX, disY]);
                        }
                    }
                }

                function fillCell(x, y) {
                    color = inputColor.value;
                    ctx.fillStyle = color;
                    for (i = 0; i < cuadritos.length; i++) {
                        let cuadro = cuadritos[i];
                        if (
                            x > cuadro[0] &&
                            x < cuadro[0] + cuadro[2] &&
                            y > cuadro[1] &&
                            y < cuadro[1] + cuadro[3]
                        ) {
                            ctx.fillRect(cuadro[0], cuadro[1], sizeCuadro.ancho, sizeCuadro.alto);
                        }
                    }
                    dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 0.6, "#44414B");
                }

                canvas.onmousemove = function(e) {
                    if(mouse){
                        let canvaspos = canvas.getBoundingClientRect();
                        fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top);
                    }
                };
    
                canvas.onclick = function(e){
                    let canvaspos = canvas.getBoundingClientRect();
                    fillCell(e.clientX - canvaspos.left, e.clientY - canvaspos.top)
                };
    
                canvas.onmousedown = function() {
                    mouse = true;
                };
    
                canvas.onmouseup = function() {
                    mouse = false;
                };

                inputSizeCuadros.addEventListener('change', function () {
                    cuadritos = [];
                    sizeCuadro.ancho = parseInt(this.value);
                    sizeCuadro.alto = parseInt(this.value);
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "#44414B");
                }, false);
    
                canvas.width = contenedor.offsetWidth - 800;
                dibujaGrid(sizeCuadro.ancho, sizeCuadro.alto, 1, "#44414B");



         }  
     }            
 }