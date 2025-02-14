document.addEventListener('DOMContentLoaded', function() {
    const inputForm = document.getElementById('inputForm');

    // Function to open a popup
    window.openPopup = function(popupId) {
        const popup = document.getElementById(popupId + 'Popup');
        popup.style.display = "block";
    }

    // Function to close a popup
    window.closePopup = function(popupId) {
        const popup = document.getElementById(popupId + 'Popup');

        // Realizar validación específica del popup
        if (!validatePopup(popupId)) {
            return; // No cerrar el popup si la validación falla
        }

        popup.style.display = "none";
    }

    // Function to validate popup inputs
    function validatePopup(popupId) {
        let isValid = true;
        let errorMessage = "";

        // Validar campos según el popupId
        switch (popupId) {
            case 'dimensiones':
                const B = parseFloat(document.getElementById('B').value);
                const L = parseFloat(document.getElementById('L').value);
                const b = parseFloat(document.getElementById('b').value);
                const l = parseFloat(document.getElementById('l').value);
                const H = parseFloat(document.getElementById('H').value);
                const h = parseFloat(document.getElementById('h').value);

                if (isNaN(B) || isNaN(L) || isNaN(b) || isNaN(l) || isNaN(H) || isNaN(h)) {
                    isValid = false;
                    errorMessage = "Por favor, complete todos los campos de dimensiones con valores numéricos.";
                } else if (B <= 0 || L <= 0 || b <= 0 || l <= 0 || H <= 0 || h <= 0) {
                    isValid = false;
                    errorMessage = "Los valores de dimensiones deben ser mayores que cero.";
                }
                break;

            case 'cargas':
                const Pu = parseFloat(document.getElementById('Pu').value);
                const Vu = parseFloat(document.getElementById('Vu').value);
                const My = parseFloat(document.getElementById('My').value);

                if (isNaN(Pu) || isNaN(Vu) || isNaN(My)) {
                    isValid = false;
                    errorMessage = "Por favor, complete todos los campos de cargas con valores numéricos.";
                }
                break;

            case 'suelo':
                const hs = parseFloat(document.getElementById('hs').value);
                const phi = parseFloat(document.getElementById('phi').value);
                const sigma_est = parseFloat(document.getElementById('sigma_est').value);
                const sigma_sis = parseFloat(document.getElementById('sigma_sis').value);
                const gamma_s = parseFloat(document.getElementById('gamma_s').value);
                const gamma_h = parseFloat(document.getElementById('gamma_h').value);

                if (isNaN(hs) || isNaN(phi) || isNaN(sigma_est) || isNaN(sigma_sis) || isNaN(gamma_s) || isNaN(gamma_h)) {
                    isValid = false;
                    errorMessage = "Por favor, complete todos los campos de suelo con valores numéricos.";
                }
                break;
        }

        if (!isValid) {
            alert(errorMessage); // Mostrar mensaje de error
        }

        return isValid; // Retornar true si es válido, false si no lo es
    }
	
	// Function to globally validate all inputs
	function validateAllInputs() {
		let isValid = true;
		let errorMessage = "";

		// Validate dimensions
		const B = parseFloat(document.getElementById('B').value);
		const L = parseFloat(document.getElementById('L').value);
		const b = parseFloat(document.getElementById('b').value);
		const l = parseFloat(document.getElementById('l').value);
		const H = parseFloat(document.getElementById('H').value);
		const h = parseFloat(document.getElementById('h').value);

		if (isNaN(B) || isNaN(L) || isNaN(b) || isNaN(l) || isNaN(H) || isNaN(h)) {
			isValid = false;
			errorMessage = "Por favor, complete todos los campos de dimensiones con valores numéricos.";
		} else if (B <= 0 || L <= 0 || b <= 0 || l <= 0 || H <= 0 || h <= 0) {
			isValid = false;
			errorMessage = "Los valores de dimensiones deben ser mayores que cero.";
		}

		// Validate loads
		const Pu = parseFloat(document.getElementById('Pu').value);
		const Vu = parseFloat(document.getElementById('Vu').value);
		const My = parseFloat(document.getElementById('My').value);

		if (isNaN(Pu) || isNaN(Vu) || isNaN(My)) {
			isValid = false;
			errorMessage = "Por favor, complete todos los campos de cargas con valores numéricos.";
		}

		// Validate soil parameters
		const hs = parseFloat(document.getElementById('hs').value);
		const phi = parseFloat(document.getElementById('phi').value);
		const sigma_est = parseFloat(document.getElementById('sigma_est').value);
		const sigma_sis = parseFloat(document.getElementById('sigma_sis').value);
		const gamma_s = parseFloat(document.getElementById('gamma_s').value);
		const gamma_h = parseFloat(document.getElementById('gamma_h').value);

		if (isNaN(hs) || isNaN(phi) || isNaN(sigma_est) || isNaN(sigma_sis) || isNaN(gamma_s) || isNaN(gamma_h)) {
			isValid = false;
			errorMessage = "Por favor, complete todos los campos de suelo con valores numéricos.";
		}

		if (!isValid) {
			alert(errorMessage); // Show error message
		}

		return isValid; // Return true if valid, false if not
	}

    // Close popup when clicking outside the content
    window.addEventListener('click', function(event) {
        const popups = document.querySelectorAll('.popup');
        popups.forEach(popup => {
            if (event.target === popup) {
                popup.style.display = "none";
            }
        });
    });

    inputForm.addEventListener('submit', function(event) {
        event.preventDefault();

		// Validate all inputs before sending the request
		if (!validateAllInputs()) {
			return; // Do not submit if validation fails
		}
		
        const data = {
            Pu: parseFloat(document.getElementById('Pu').value),
			Vu: parseFloat(document.getElementById('Vu').value),
			My: parseFloat(document.getElementById('My').value),
			B: parseFloat(document.getElementById('B').value),
			L: parseFloat(document.getElementById('L').value),
			b: parseFloat(document.getElementById('b').value),
			l: parseFloat(document.getElementById('l').value),
			H: parseFloat(document.getElementById('H').value),
			h: parseFloat(document.getElementById('h').value),
			hs: parseFloat(document.getElementById('hs').value),
			phi: parseFloat(document.getElementById('phi').value),
			sigma_est: parseFloat(document.getElementById('sigma_est').value),
			sigma_sis: parseFloat(document.getElementById('sigma_sis').value),
			gamma_s: parseFloat(document.getElementById('gamma_s').value),
			gamma_h: parseFloat(document.getElementById('gamma_h').value)
        };
		
		// console log
		console.log("Datos enviados al servidor: ", data)
		
		fetch('https://csatoolbox-test.onrender.com/verifound/verif', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'  // Indica que envías JSON
			},
			body: JSON.stringify(data)  // Convierte el objeto a JSON
		})
		
		.then(response => response.json())  // Parsea la respuesta JSON
		.then(responseData => {
			// console log de respuesta:
			console.log("Respuesta del servidor: ", responseData)	
			// 3. Mostrar los resultados en la página
			document.getElementById('FSD').textContent = responseData.FSD;
			document.getElementById('FSV').textContent = responseData.FSV;
			document.getElementById('comp').textContent = responseData.comp;
			document.getElementById('tmax').textContent = responseData.tmax;
			document.getElementById('status').textContent = responseData.status;
		})
		.catch(error => {
			console.error('Error:', error);
			alert('Ocurrió un error al comunicarse con el servidor.');
		});
	});
});