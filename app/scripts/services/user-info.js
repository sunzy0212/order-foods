/**
 * Created by ZhiyuanSun on 15/12/9.
 */
serviceModule.service('userInfo',['$http','$q',function($http, $q){
    var that = this;

    //数据成员
    this.openId = null;
    this.restaurantInfo = null;
    this.userInfo = null;

    //方法成员
    this.getRestaurantInfo = function(){
        var deferred = $q.defer();
        var promise = deferred.promise;

        if(null == that.restaurantInfo){
            $http.get('/restaurantInfo/GetRestaurantInfo')
                .success(function(data){
                    that.restaurantInfo = {
                        allSeats    :   constructSeatSelectData(data.seats),
                        allPeople   :   constructPeopleSelectData(data.maxNumPerOrder)
                    };

                    that.userInfo = {
                        seatNum     :   that.restaurantInfo.allSeats[0],
                        peopleNum   :   that.restaurantInfo.allPeople[0],
                        isInvoiceNeed   :   false
                    };

                    deferred.resolve(that.restaurantInfo);
                })
                .error(function(err){
                    deferred.reject(err);
                });
        }
        else{
            deferred.resolve(that.restaurantInfo);
        }

        return promise;
    };


}]);

function constructSeatSelectData(data){
    var seatSelectData = new Array();

    for(var key in data){
        for(var i = 0; i < data[key]; i++){
            seatSelectData.push( key + i);
        }
    }
    return seatSelectData;
}

function constructPeopleSelectData(data){
    var peopleSelectData = new Array();

    for(var i = 0; i < data; i++){
        peopleSelectData.push(i+1);
    }

    return peopleSelectData;
}