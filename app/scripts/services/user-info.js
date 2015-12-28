/**
 * Created by ZhiyuanSun on 15/12/9.
 */
serviceModule.service('userInfo',['$http','$q',function($http, $q){
    var that = this;

    //数据成员
    this.openId = null;
    this.allSeats = null;
    this.allPeople = null;
    this.seatNum = null;
    this.peopleNum = null;

    //方法成员
    this.requestRestaurantInfo = function(){
        var deferred = $q.defer();
        var promise = deferred.promise;

        $http.get('/restaurantInfo/GetRestaurantInfo')
            .success(function(data){
                that.allSeats = constructSeatSelectData(data.seats);
                that.seatNum = that.allSeats[0];
                that.allPeople = constructPeopleSelectData(data.maxNumPerOrder);
                that.peopleNum = that.allPeople[0];
                deferred.resolve(data);
            })
            .error(function(err){
                deferred.reject(err);
            });
        return promise;
    };


}]);

function constructSeatSelectData(data){
    var seatSelectData = new Array();

    for(var key in data){
        for(var i = 0; i < data[key]; i++){
            seatSelectData.push({name : key + i});
        }
    }
    return seatSelectData;
}

function constructPeopleSelectData(data){
    var peopleSelectData = new Array();

    for(var i = 0; i < data; i++){
        peopleSelectData.push(i+1+' 人');
    }

    return peopleSelectData;
}