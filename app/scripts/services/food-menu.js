/**
 * Created by zhiyuans on 12/23/2015.
 */
serviceModule.service('foodMenu',['$http','$q', function($http,$q){
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
        this.foods[this.menuSideBar.currentSideItemName].foodVolumeSelectedArray[foodName] = volume;
    };

    this.getFoodVolumeSelectedArray = function(){
        return this.foods[this.menuSideBar.currentSideItemName].foodVolumeSelectedArray;
    };

    //方法成员
    this.GetAllFoodTypes = function(){
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
                    menuItems    :   ConstructSideBar(data),
                    currentSideItemName :   null
                };

                //初始设第一项为选中项
                if(that.menuSideBar.menuItems.length > 0){
                    that.menuSideBar.menuItems[0].isActive = true;
                }

                that.menuSideBar.currentSideItemName = that.menuSideBar.menuItems[0].name;

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

    this.GetFoodsByType = function(sideItemName){
        var deferred = $q.defer();
        var promise = deferred.promise;

        //设置选中的side bar项
        SideBarItemSelect(that, sideItemName);

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

   /* GetAllFoodTypes(this);
    GetFoodsByType(this, this.menuSideBar[0]);*/

    return this;
}]);





//设置选中的side bar项
function SideBarItemSelect(that, sideItemName){
    for(var i=0; i < that.menuSideBar.menuItems.length; i++){
        if(that.menuSideBar.menuItems[i].name == sideItemName){
            that.menuSideBar.menuItems[i].isActive = true;
        }
        else{
            that.menuSideBar.menuItems[i].isActive = false;
        }
    }
}

//初始化 service的foodVolumeSelectedArray成员
//该数组表示每一种菜当前select控件的选择情况
//初始化为service的selectedFoods[i].price的第0个元素
function InitFoodSelectedArray(typeFoods){
    typeFoods.foodVolumeSelectedArray = new Array();

    typeFoods.selectedFoods.forEach(function(item){
        typeFoods.foodVolumeSelectedArray[item.name] = new FoodVolumeModel(item.price[0].name, item.price[0].num, item.price[0].price);
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
                    new FoodVolumeModel(GetFoodWeightDisplayName(key), 0, foodPrice[key])
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

//构建side bar用的数据：包含菜的名字和当前被选中项
function ConstructSideBar(foodsArray){
    var ret = new Array();
    for(var i=0; i<foodsArray.length; i++){
        ret.push({
            name: foodsArray[i],
            isActive: false
        })
    }
    return ret;
}

function FoodVolumeModel(name, num, price){
    this.name = name;
    this.num = num;
    this.price = price;
}
