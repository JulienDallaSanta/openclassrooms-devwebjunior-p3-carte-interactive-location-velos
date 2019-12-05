$('#reservation').click(event){
    event.preventDefault();
    
}
var reservation ={
    duree : '', // durée globale en secondes
	dureeMinutes : '', // affichera les minuetes
	dureeSecondes : '', // affichera les secondes
    decompteId :'', // initialise le decompte
    
    // Données contenues dans sessionStorage
    webStorage : function() {
        sessionStorage.statusReservation = true;
        sessionStorage.nomStationReserver = currentStation.nom;
        sessionStorage.dureeReservation = reservationValidity * 60;
    },

    setTimer : function (init){
		if (init = true) {
			this.duree = Number(sessionStorage.dureeReservation);
		}
		this.dureeMinutes = Math.floor(this.duree / 60);
		this.dureeSecondes = this.duree - this.dureeMinutes * 60;
    },

    verifValide: function() {
		if (canvas.cursorX === '') {
			$('#msgAlerte').text('Merci de signer votre réservation');// Message en cas de canvas vide
		} 
		else {
			// Si on tente de reserver à nouveau sur la station deja reservée
			if (currentStation.nom === sessionStorage.nomStationReserver) {
				alert('Une réservation est déjà en cours sur la station ' + sessionStorage.nomStationReserver);
				return reservation.closePanelReservation();
			}

		// Si il y a deja une reservation en cours	
			if (sessionStorage.statusReservation === 'true') {
				
					var confirmation = window.confirm('Souhaitez-vous annuler la réservation en cours à ' + sessionStorage.nomStationReserver + ' ?');
					if (confirmation) {
						//this.cancelReservation();
						clearInterval(reservation.decompteId);
						sessionStorage.clear();
						reservation.createReservation();
					} else {
						reservation.closePanelReservation();
					}
				
			}
			else {
				reservation.createReservation();
			}
		}
		$('#valide').off('click', this.verifValide);
	},

    // Crée la réservation et lance le décompte
	createReservation : function() {
		currentStation.dispo--;
		this.webStorage();
		this.setTimer(true);
		this.decompteReservation();
		this.closePanelReservation();
	},

    // Annule une réservation
	cancelReservation : function() {
		clearInterval(this.decompteId);
		infosCurrentReservation.setCurrentInfos(false);
		if (currentStation.dispo != undefined) {
			currentStation.dispo++ ;
			currentStation.setStatus();
		}
	},

    // Décompte toutes les 1000 millisecondes
	decompteReservation : function() {
		if (this.duree > 0) {
			var that = this;
			this.decompteId = setInterval(function() {
				if (that.duree <= 0) {
					that.cancelReservation();
					sessionStorage.clear();
				} else {
					that.duree--;					
					sessionStorage.dureeReservation = that.duree;
					that.setTimer(false);
					infosCurrentReservation.setCurrentInfos(true);
					currentStation.setStatus();
				}
			}, 1000);
		}
	},
}
