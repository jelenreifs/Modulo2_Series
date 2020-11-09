recibirSeries();

 
function recibirSeries() {
  fetch("/api/series")
    .then(res => res.json())
    .then(datos => {
    let series = "";
    
      for (let i = 0; i < datos.length; i++) {
        series += `
            <div class="serie">
                <h3>${datos[i].titulo}</h3>
                <p>Plataforma: ${datos[i].plataforma}</p>
                <p class="puntuacion">${datos[i].puntuacion}</p>
            </div>
        `;
      }
      document.getElementById("resultado").innerHTML = series;
    });
}


let serie = "";
function buscarSerie() {
    let tituloSearch = document.getElementById("serieSearch").value

      
  fetch("/api/serie")
  .then(res => res.json())
    .then(datos => {
        console.log(datos);
        if (titulo === tituloSearch) {
            for (let i = 0; i < datos.length; i++) {
                serie = `
                    <div class="serie">
                        <h3>${datos[i].titulo}</h3>
                        <p>Plataforma: ${datos[i].plataforma}</p>
                        <p class="puntuacion">${datos[i].puntuacion}</p>
                    </div>
                `;
            }
            document.getElementById("resultado").innerHTML = serie;
        }
        
    });
}

let plataforma = "";

function manageChange(event) {
  console.log(event.target.value);
  plataforma = event.target.value;
}



function addSerie() {
    const titulo = document.getElementById("tituloAdd").value;
    
  const plataforma = document.getElementById('plataformas');
    /*const plataformaSelected = plataforma.options[plataforma.selectedIndex].value;
    console.log(plataformaSelected); */

    const puntuacion = parseInt(document.getElementById("puntuacionAdd").value);

    const serie = {
        titulo,
        plataforma,
        puntuacion
    };

    fetch("/api/nuevaSerie", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(serie),
    })
    .then(res => res.json())
    .then(datos => {
        console.log(datos);
        recibirSeries();
        });
    }

