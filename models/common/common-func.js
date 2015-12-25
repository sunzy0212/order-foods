/**
 * Created by ZhiyuanSun on 15/12/25.
 */


module.exports = {
    //复制一条记录信息（从src到dest，属于值复制）
    copyARecordTo:
        function(src, dest){
            for(var key in src){
                if(dest[key] != 'undefined'){
                    dest[key] = src[key];
                }
                else{
                    throw Error('Copy a user order record to ' + dest + ' Failed, it does not contain the key of '+key);
                }
            }
        }
};