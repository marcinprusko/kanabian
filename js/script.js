// plik scripts.js

$(function() {
	function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
	}
	function Column(name) {
    	var self = this; // przyda się dla funkcji zagnieżdżonych

    	this.id = randomString();
    	this.name = name;
    	this.$element = createColumn();

    	function createColumn() {
    	// TWORZENIE ELEMENTÓW SKŁADOWYCH KOLUMNY
	    	var $column = $('<div>').addClass('column');
			var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
			var $columnCardList = $('<ul>').addClass('column-card-list');
			var $columnDelete = $('<button>').addClass('btn-delete').text('x');
			var $columnAddCard = $('<button>').addClass('add-card').text('Dodaj kartę');
			
			Column.prototype = {
			    addCard: function(card) {
			      this.$element.children('ul').append(card.$element);
			    },
			    removeColumn: function() {
			      this.$element.remove();
			    }
			};

			// PODPINANIE ODPOWIEDNICH ZDARZEŃ
			$columnDelete.click(function() {
        		self.removeColumn();
			});
			$columnAddCard.click(function() {
        		self.addCard(new Card(prompt('Wpisz nazwę karty')));
			});
			// KONSTRUOWANIE ELEMENTU KOLUMNY
			$column.append($columnTitle)
		        .append($columnDelete)
		        .append($columnAddCard)
		        .append($columnCardList);

		    // ZWRACANIE STWORZONEJ  KOLUMNY  
			return $column;
    	}
  	}
  	// klasa cart
  	function Card(description) {
		var self = this;

		this.id = randomString();
		this.description = description;
		this.$element = createCard(); 
		// tworzenie kart
		function createCard() {
			var $card = $('<li>').addClass('card');
			var $cardDescription = $('<p>').addClass('card-description').text(self.description);
			var $cardDelete = $('<button>').addClass('btn-delete').text('x');

			Card.prototype = {
				removeCard: function() {
					this.$element.remove();
				}
			}
			// funkcja usuwania cart
			$cardDelete.click(function(){
        		self.removeCard();
			});
			// przypinanie cart i zwracanie
			$card.append($cardDelete)
				.append($cardDescription);
			return $card;
		}
	}
	// nasłuchiwanie zdarzen tablicy
	var board = {
    	name: 'Tablica Kanban',
    	addColumn: function(column) {
      		this.$element.append(column.$element);
      		initSortable();
    	},
    	$element: $('#board .column-container')
	}; 
	// inicjacja przenoszenia cart
	function initSortable() {
    	$('.column-card-list').sortable({
      		connectWith: '.column-card-list',
      		placeholder: 'card-placeholder'
    	}).disableSelection(); //wyłączenie zaznaczenia takstu
  	}
  	//przycisk dodawania kolumn plus klikniecie
  	$('.create-column')
  		.click(function(){
		var name = prompt('Wpisz nazwę kolumny');
		var column = new Column(name);
    	board.addColumn(column);
  	});
})


