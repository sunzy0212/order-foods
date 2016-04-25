serviceModule.service('cartCache',[
	'$q',
	'menu',
  	function($q,menu){
  		this.cartInfo = null;
  		var that = this;

  		this.getCartInfo = function(){
  			var deferred = $q.defer();
  			if(this.cartInfo == null){
				menu.getRestaurantInfo()
					.then(function(data){
						deferred.resolve(that.cartInfo = constructCartInfo(data));
					});
  			}
  			else{
  				deferred.resolve(that.cartInfo);
  			}
  			return deferred.promise;
  		}

  		function constructCartInfo(data){
  			var cartInfo = {
  				seatNum: data.allSeats[0],
  				peopleNum: data.allPeople[0],
  				isInvoiceNeed: false,
  				invoice: null
  			}
  			return cartInfo;
  		}
  	}
]);