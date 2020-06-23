import AduicAnimacion from './AduicAnimacion'

export const AduicAnimadoPlugin = {
	install(Vue) {
		
		let elementosAnimados = {}

		let agregarElementoAnimado = ( prefijo , elemento )=>{
			elementosAnimados[ prefijo ] = elemento
		}

		let extraerElementoAnimado = ( prefijo ) => {
			if ( typeof elementosAnimados[ prefijo ] != 'undefined' ){
				return elementosAnimados[ prefijo ]
			}else{
				throw `El prefijo ${prefijo} no esta asociado con ningun nodo html`
			}
		}

		
		Vue.directive ('aduicAnimado',  {

			inserted:  (el, binding ) =>{

				try {
					let elemento = new AduicAnimacion( binding )
					elemento.identificarSecuenciaDeAnimacion()
					elemento.comprobarSiEstilosEstanDeclarados()
					elemento.identificarEstiloCorrespondiente()
					elemento.colocarEstiloDeAnimacion( el )
					elemento.actualizarNodoHtml(el)

					//let funciones = elemento.establecerFuncionesDeComportamiento()


					agregarElementoAnimado( elemento.extraerPrefijo() , elemento )
					//registrarFuncionesDeComportamiento( funciones )



				} catch(e) {
					console.error(e);
				}
			
			},
			update: (el,binding) =>{

				/*
					cuando se actualiza alguna propiedad del elemento reactivo , automaticamente pierde el estilo
					actual, por lo tanto cada vez que se actualize el elemento se colocara el estilo que corresponde
				*/

				try {
					let prefijo = binding.value.prefijo
					let elemento = extraerElementoAnimado( prefijo )
					elemento.colocarEstiloDeAnimacion( el )	
					elemento.actualizarNodoHtml( el )		

				} catch(e) {
					// statements
					console.error(e);
				}
			}
		})

		// 4. add an instance method

		Vue.prototype.aduicAnimarDeIda = ( prefijo ) => {
			let elementoAnimado = extraerElementoAnimado( prefijo )
			if ( typeof elementoAnimado != 'undefined' ) {

				let prefijoDeAnimacion = elementoAnimado.extraerPrefijoDeAnimacionActual()
				if ( prefijoDeAnimacion === 'estado-inicial') {


					if ( typeof elementoAnimado.nodoHtml.onanimationend === 'undefined'){

	
							elementoAnimado.actualizarEstiloDeAnimacion('animado')
						
					}else{

						elementoAnimado.nodoHtml.addEventListener('animationend', () => {
	
							let prefijoDeAnimacion = elementoAnimado.extraerPrefijoDeAnimacionActual()
	
							if ( prefijoDeAnimacion === 'en-animacion' ) {
	
								elementoAnimado.actualizarEstiloDeAnimacion('animado')
							
							}
						})

						elementoAnimado.actualizarEstiloDeAnimacion('en-animacion')

					}





				}
			}else{
				console.error( `El prefijo ${prefijo} no esta asociado a ningun nodo html`)
			}
		};

		Vue.prototype.aduicAnimarDeVuelta = ( prefijo ) => {
			let elementoAnimado = extraerElementoAnimado( prefijo )
			
			if ( typeof elementoAnimado != 'undefined' ) {

				let prefijoDeAnimacion = elementoAnimado.extraerPrefijoDeAnimacionActual()
				if ( prefijoDeAnimacion === 'animado') {

					if( typeof elementoAnimado.nodoHtml.onanimationend === "undefined"){
						elementoAnimado.actualizarEstiloDeAnimacion('estado-inicial')
					}else{

						elementoAnimado.nodoHtml.addEventListener('animationend', () => {

							let prefijoDeAnimacion = elementoAnimado.extraerPrefijoDeAnimacionActual()
	
							if ( prefijoDeAnimacion === 'en-animacion-reversa' ) {
	
								elementoAnimado.actualizarEstiloDeAnimacion('estado-inicial')
	
							}
	
						})
						
						elementoAnimado.actualizarEstiloDeAnimacion('en-animacion-reversa')
					}
				}
			}else{
				console.error( `El prefijo ${prefijo} no esta asociado a ningun nodo html`)
			}
		};
		
	}
}