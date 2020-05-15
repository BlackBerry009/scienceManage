/**
 * 检查对象是否有空的属性
 */

function hasEmptyProp(obj){
    for(let prop in obj){
        if(!obj[prop]) return true;
    }
    return false;
}