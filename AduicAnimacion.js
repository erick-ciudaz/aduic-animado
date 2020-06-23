export default class AduicAnimacion{
	

	constructor( opcionesDeDirectiva ){

		this.opciones = opcionesDeDirectiva
		this.tipoDeAnimaciones = {
			'ping-pong': [
				'estado-inicial',
				'en-animacion',
				'animado',
				'en-animacion-reversa'
			]
		}

		this.prefijo = null
		this.tipoAnimacion = null
		this.prefijoDeAnimacion = null
		this.secuenciaDeAnimacion = null
		this.estiloActual = null
		this.estadoDeAnimacionActual = null
		this.posicionEstiloActual = null
		this.nodoHtml = null
	}

	identificarSecuenciaDeAnimacion( )
	{	
		this.tipoAnimacion = this.opciones.value.tipoAnimacion
		this.secuenciaDeAnimacion = this.tipoDeAnimaciones[this.tipoAnimacion]
		this.prefijo = this.opciones.value.prefijo 

		if (typeof this.secuenciaDeAnimacion  === 'undefined') {
			throw `El tipo de animacion ${this.tipoAnimacion} no existe`
		}
		
	}

	comprobarSiEstilosEstanDeclarados( ){

		let hojasDeEstilos = document.styleSheets
		
		for (var pos = 0; pos < this.secuenciaDeAnimacion.length; pos++) {

				
			let estiloAnimacion = `.${this.prefijo}-${this.secuenciaDeAnimacion[pos]}`
			let estiloExiste = false
			for (let i = 0; i < hojasDeEstilos.length; i++) {
				
				let hoja = hojasDeEstilos[i]
				
				for (let k = 0; k < hoja.rules.length; k++) {
					
					//console.log( hoja.rules[k].selectorText );
					
					let selector = hoja.rules[k].selectorText
					if ( selector === estiloAnimacion ){
						estiloExiste = true
						break
					}
				}

				if ( estiloExiste )
					break				
			}

			if ( estiloExiste === false )
				throw `Falta declarar el selector ${estiloAnimacion}`
		}
	}

	identificarEstiloCorrespondiente(){

		switch( this.tipoAnimacion ) {
			case 'ping-pong':

				if (this.prefijoDeAnimacion === null) {
					this.prefijoDeAnimacion = 'estado-inicial'
					this.estiloActual = `${this.prefijo}-estado-inicial`
				}	
				break
		}


	}

	colocarEstiloDeAnimacion( nodoHtml ){
		
		nodoHtml.classList.add( this.estiloActual )
	}

	actualizarEstiloDeAnimacion( nuevoPrefijoDeAnimacion ){
		this.nodoHtml.classList.remove( this.estiloActual )

		this.estiloActual = `${this.prefijo}-${nuevoPrefijoDeAnimacion}`
		this.prefijoDeAnimacion = nuevoPrefijoDeAnimacion
		this.nodoHtml.classList.add( this.estiloActual )
	}

	actualizarNodoHtml( nuevoNodoHtml ){
		this.nodoHtml = nuevoNodoHtml
	}

	actualizarEstiloActual( nuevoEstiloActual){
		this.estiloActual = nuevoEstiloActual
	}

	extraerPrefijoDeAnimacionActual(){
		return this.prefijoDeAnimacion
	}

	actualizarPrefijoDeAnimacionActual( nuevoPrefijoDeAnimacion ){
		this.prefijoDeAnimacion = nuevoPrefijoDeAnimacion
	}

	extraerPrefijo(){
		return this.prefijo
	}


}