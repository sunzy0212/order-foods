/**
 * Created by zhiyuans on 12/23/2015.
 */
serviceModule.service('foodMenu',['$http', function($http){
    var that = this;
    //数据成员变量
    this.menuSideBar = null;
    this.selectedFoods = null;
    this.foodVolumeSelectedArray = null;

    //方法成员
    this.GetAllFoodTypes = function(callback){
        $.ajax({
            type:       'GET',
            url:        '/menu/GetFoodType',
            dataType:   'json',
            async:      true
        }).success(function(data){
            //构建side bar用的数据：包含菜的名字和当前被选中项
            that.menuSideBar = ConstructSideBar(data);
            //初始设第一项为选中项
            if(that.menuSideBar.length > 0){
                that.menuSideBar[0].isActive = true;
            }
            callback(null,that.menuSideBar);
        }).error(function(XMLHttpRequest, textStatus, errorThrown){
            callback(XMLHttpRequest);
        });
    };

    this.GetFoodsByType = function(sideItem, $scope, callback){
        //设置选中的side bar项
        SideBarItemSelect(that, sideItem);
        $scope.foodTypes = that.menuSideBar;

        //请求该菜型所对应的所有菜
        var sendData={
            'foodType':sideItem.name
        };

        $.ajax({
            type:       'POST',
            url:        '/menu/GetFoodsByType',
            dataType:   'json',
            async:      true,
            data:       sendData
        }).success(function(data){
            that.selectedFoods=data;

            //用于处理同一种菜，不同份量时，价格不同时的显示与点餐
            //会修改service的selectedFoods成员
            ConstructFoodPrice(that,data);

            //初始化每一种菜的不同份量的选择情况
            InitFoodSelectedArray(that);
            callback(null, that.selectedFoods);
        }).error(function(XMLHttpRequest, textStatus, errorThrown){
            callback(XMLHttpRequest);
        });
    };

   /* GetAllFoodTypes(this);
    GetFoodsByType(this, this.menuSideBar[0]);*/

    return this;
}]);





//设置选中的side bar项
function SideBarItemSelect(that, sideItem){
    for(var i=0; i < that.menuSideBar.length; i++){
        if(that.menuSideBar[i].name == sideItem.name){
            that.menuSideBar[i].isActive = true;
        }
        else{
            that.menuSideBar[i].isActive = false;
        }
    }
}

//初始化 service的foodVolumeSelectedArray成员
//该数组表示每一种菜当前select控件的选择情况
//初始化为service的selectedFoods[i].price的第0个元素
function InitFoodSelectedArray(that){
    that.foodVolumeSelectedArray = new Array();

    that.selectedFoods.forEach(function(item){
        that.foodVolumeSelectedArray[item.name] = new FoodVolumeModel(item.price[0].name, item.price[0].num, item.price[0].price);
    });
}

//用于处理同一种菜，不同份量时，价格不同时的显示与点餐
function ConstructFoodPrice(that, foods){
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

        that.selectedFoods[i].price = foodPriceRet;
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