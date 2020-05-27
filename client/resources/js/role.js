
/**
 * 0 科研人员
 * 1 科研管理
 */

window.onload = () => {
    //科研人员
    if(sessionStorage.getItem('type') == 0){
        //隐藏科研管理部分功能
        $('.system_1.0 ul .check').hide();
        $('.system_1.0 ul .three').hide();
        $('.system_1.0 ul .four').hide();
        $('.system_1.0 ul .five').hide();
        $('.system_1.0 ul .six').hide();
        $('.system_1.0 ul .seven').hide();
        $('.system_1.0 ul .eight').hide();
        //隐藏项目统计
        $('.system_1.1').hide();
        //隐藏科研成果部分功能
        $('.system_1.2 ul .one').hide();
        //隐藏通知部分功能
        $('.system_1.3 ul .two').hide();
        //隐藏查看申请功能
        $('.system_1.4').hide();
        //隐藏审批流程功能
        $('.system_1.5').hide();
        //隐藏权限管理
        $('.system_1.6').hide(); 
    }


    //院管理员
    if(sessionStorage.getItem('type') == 1){
        //隐藏科研管理部分功能
        $('.system_1.0 ul .two').hide();
        $('.system_1.0 ul .my').hide();
        $('.system_1.0 ul .nine').hide();
        $('.system_1.0 ul .ten').hide();
        //隐藏科研成果部分功能
        $('.system_1.2 ul .two').hide();
        $('.system_1.2 ul .three').hide();
        //隐藏通知部分功能
        $('.system_1.3 ul .one').hide();

        $('.system_1.6').hide();
        $('.system_1.5').hide();
    }

    // 其他
    if(sessionStorage.getItem('type') == 11){
        //隐藏科研管理部分功能
        $('.system_1.0 ul .two').hide();
        $('.system_1.0 ul .my').hide();
        $('.system_1.0 ul .nine').hide();
        $('.system_1.0 ul .ten').hide();
        $('.system_1.0 ul .three').hide();
        $('.system_1.0 ul .four').hide();

        //隐藏科研成果功能
        $('.system_1.2').hide();
        //隐藏通知部分功能
        $('.system_1.3').hide();
        $('.system_1.4').hide();
        $('.system_1.6').hide();
        $('.system_1.5').hide();
    }

    /**
     * 超级管理员
     */
    if(sessionStorage.getItem('type') == 2){
        $('.system_1.0').hide();
        $('.system_1.1').hide();
        $('.system_1.2').hide();
        $('.system_1.3').hide();
        $('.system_1.4').hide();
    }
}
