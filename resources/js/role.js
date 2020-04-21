
/**
 * 0 科研人员
 * 1 科研管理
 */
var role = 0;

window.onload = () => {
    //科研人员
    if(role == 0){
        //隐藏科研管理部分功能
        $('.system_1.0 ul .one').hide();
        $('.system_1.0 ul .three').hide();
        $('.system_1.0 ul .four').hide();
        $('.system_1.0 ul .five').hide();
        $('.system_1.0 ul .six').hide();
        $('.system_1.0 ul .seven').hide();
        $('.system_1.0 ul .eight').hide();
        //隐藏科研成果部分功能
        $('.system_1.2 ul .one').hide();
        //隐藏权限管理
        $('.system_1.6').hide(); 
    }
    if(role == 1){
        //隐藏科研管理部分功能
        $('.system_1.0 ul .two').hide();
        $('.system_1.0 ul .my').hide();
        $('.system_1.0 ul .nine').hide();
        $('.system_1.0 ul .ten').hide();
        //隐藏科研成果部分功能
        $('.system_1.2 ul .two').hide();
        $('.system_1.2 ul .three').hide();
    }
}
