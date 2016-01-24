/**
 * Created by ZhiyuanSun on 16/1/5.
 */
function UserOrderModel(openId, foods, totalNum, status, beforeDiscountMoney, discountMoney, userInfo){
    if(openId == null){
        throw new Error('参数：openId为null');
    }
    if(foods == null){
        throw new Error('参数：foods为null');
    }
    if(totalNum == null){
        throw new Error('参数：totalNum为null');
    }
    if(status == null){
        throw new Error('参数：status为null');
    }
    if(beforeDiscountMoney == null){
        throw new Error('参数：beforeDiscountMoney为null');
    }
    if(discountMoney == null){
        throw new Error('参数：discountMoney为null');
    }
    if(userInfo == null){
        throw new Error('参数：userInfo为null');
    }


    this.openId = openId;
    this.foods = foods;
    this.totalNum = totalNum;
    this.status = status;
    this.money = {
        beforeDiscountMoney : beforeDiscountMoney,
        discountMoney : discountMoney
    };
    this.userInfo = userInfo;
}

function UserInfoModel(seatNum, peopleNum, invoice){
    if(seatNum == null){
        throw new Error('参数：seat为null');
    }
    if(peopleNum == null){
        throw new Error('参数：peopleNum为null');
    }

    this.seatNum = seatNum;
    this.peopleNum = peopleNum;
    this.invoice = invoice;
};


function FoodModel(foodName, foodNum, volume, price){
    if(foodNum == undefined){
        this.foodNum = 1;
    }
    else{
        this.foodNum = foodNum;
    }

    if(price == undefined){
        this.price = 0;
    }
    else{
        this.price = price;
    }

    if(volume == undefined){
        this.volume = "普通份";
    }
    else{
        this.volume = volume;
    }

    if(foodName == undefined){
        foodName = '';
    }
    else{
        this.foodName = foodName;
    }
};