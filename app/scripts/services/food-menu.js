/**
 * Created by zhiyuans on 12/23/2015.
 */
serviceModule.service('foodMenu',['$http', '$q', 'userOrder', function($http, $q, userOrder){
    var that = this;
    //数据成员变量

    //结构类型
    //menuItems             -- 所有的菜的类型    -- 数组
    //currentSideItemName   -- 当前选中的菜型    -- String
    this.menuSideBar = null;

    //字典类型变量
    //Key   -- 菜的类型
    //Value -- selectedFoods : 该菜型的所有菜  -- [Object]
    //      -- foodVolumeSelectedArray : 该菜型的所有菜，当前的分量选择情况  -- [FoodVolumeModel]
    this.foods = {};

    this.setFoodVolumeSelectedArray = function(foodName, volume){
        this.foods[this.currentSelectedFoodType()].foodVolumeSelectedArray[foodName] = volume;
    };

    this.getFoodVolumeSelectedArray = function(){
        var dic = this.foods[this.currentSelectedFoodType()].foodVolumeSelectedArray;
        for(var key in dic){
            dic[key].num = userOrder.getFoodNum(key, dic[key].name);
        }
        return dic;
    };

    //方法成员
    this.getAllFoodTypes = function(){
        var deferred = $q.defer();
        var promise = deferred.promise;

        if(null == that.menuSideBar){
            $.ajax({
                type:       'GET',
                url:        '/menu/GetFoodType',
                dataType:   'json',
                async:      true
            }).success(function(data){
                //构建side bar用的数据：包含菜的名字和当前被选中项
                that.menuSideBar = {
                  items: data,
                  activeIndex: 0
                };
                deferred.resolve(that.menuSideBar);
            }).error(function(XMLHttpRequest, textStatus, errorThrown){
                deferred.reject(XMLHttpRequest);
            });
        }
        else{
            deferred.resolve(that.menuSideBar);
        }

        return promise;
    };

    this.getFoodsByType = function(sideItemName){
        sideItemName = sideItemName || this.currentSelectedFoodType();
        var deferred = $q.defer();
        var promise = deferred.promise;

        //设置选中的side bar项
//        SideBarItemSelect(that, sideItemName);

        if(null == that.foods[sideItemName]){
            //请求该菜型所对应的所有菜
            var sendData={
                'foodType'  :   sideItemName
            };

            $.ajax({
                type:       'POST',
                url:        '/menu/GetFoodsByType',
                dataType:   'json',
                async:      true,
                data:       sendData
            }).success(function(data){
                that.foods[sideItemName]={
                    selectedFoods : data,
                    foodVolumeSelectedArray : null
                };

                //用于处理同一种菜，不同份量时，价格不同时的显示与点餐
                //会修改service的selectedFoods成员
                ConstructFoodPrice(that, sideItemName, data);

                InitFoodSelectedArray(that.foods[sideItemName]);
                deferred.resolve(that.foods[sideItemName]);
            }).error(function(XMLHttpRequest, textStatus, errorThrown){
                deferred.reject(XMLHttpRequest);
            });
        }
        else{
            deferred.resolve(that.foods[sideItemName]);
        }

        return promise;
    };

    this.currentSelectedFoodType = function(){
      return that.menuSideBar.items[that.menuSideBar.activeIndex];
    }

   /* GetAllFoodTypes(this);
    GetFoodsByType(this, this.menuSideBar[0]);*/

    return this;
}]);

//初始化 service的foodVolumeSelectedArray成员
//该数组表示每一种菜当前select控件的选择情况
//初始化为service的selectedFoods[i].price的第0个元素
function InitFoodSelectedArray(typeFoods){
    typeFoods.foodVolumeSelectedArray = new Array();

    typeFoods.selectedFoods.forEach(function(item){
        typeFoods.foodVolumeSelectedArray[item.name] = new FoodVolumeModel(item.price[0].name, item.price[0].price);
    });
}

//用于处理同一种菜，不同份量时，价格不同时的显示与点餐
function ConstructFoodPrice(that, foodTypeName, foods){
    for(var i=0; i < foods.length; i++){
        var foodPrice = foods[i].price;
        var foodPriceRet = new Array();
        for(var key in foodPrice){
            if(foodPrice[key] != -1){
                foodPriceRet.push(
                    new FoodVolumeModel(GetFoodWeightDisplayName(key), foodPrice[key])
                );
            }
        }

        //当菜不区分份量时，
        if(foodPriceRet.length == 1){
            foodPriceRet[0].name = "普通份";
        }

        that.foods[foodTypeName].selectedFoods[i].price = foodPriceRet;
    }
}

function GetFoodWeightDisplayName(str){
    var ret = "";
    switch (str){
        case 'small':
            ret = "小份";
            break;
        case 'middle':
            ret = "中份";
            break;
        case 'large':
            ret = "大份";
            break;
        default :
            ret = "普通份";
            break;
    }

    return ret;
}

function FoodVolumeModel(name, price){
    this.name = name;
    this.price = price;
    this.num = 0;
}
