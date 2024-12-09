    this.equiposService.getEquipos().subscribe((data) => {
        if (jugadorSeleccionado) {
            

            this.equipo = data.filter(
            (item) =>
                item.nombre.toLowerCase() ===
                jugadorSeleccionado.idEquipo.toLowerCase()
            );
        console.log(this.equipo);
        
        this.partidosService.getEquipos().subscribe((data) => {
          if (this.equipo) {
            this.partidos = data
              .filter(
                (item) =>
                  item.idEquipo.toLowerCase() ===
                  jugadorSeleccionado.idEquipo.toLowerCase()
              )
              .map((item) => ({
                ...item,
                fecha: formatDate(item.fecha, 'dd/MM/yyyy', 'en-US'), // Formatear la fecha
              }));
          }
        });
       const goles = this.golesService.getGoles().subscribe((data) => {
          this.goles = data.filter((gol) => gol.idJugador == this.selectedJugador);
        }); 
        const datajugador = [jugadorSeleccionado,this.equipo,this.goles,this.partidos]
        console.log(goles);
        

      }
    });
// const datajugador =  [this.equipo]

// console.log(datajugador);
