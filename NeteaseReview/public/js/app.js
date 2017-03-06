/**
 * Created by hxsd on 2016/11/16.
 */
var marsFilter=angular.module("marsFilter",[]);
//主模块（需注入对其他模块的依赖）
var myapp=angular.module("myapp",["marsFilter"]);
//数据准备=======
myapp.controller("commentCtrl",function($scope,$http,$location){
    //评论数据
   /* $http.get("/index").success(function(data){*/
    $http.get("/js/comment.json").success(function(data){
        $scope.data=data;
    });
    //显示快速发帖=========
    $scope.showCom=false;
    $scope.showTopText=function(){
        if($scope.showCom==false){$scope.showCom=true}else{$scope.showCom=false}
    };
    //提交发帖===========
    //准备数据
    $scope.newCom={
        time:new Date()/1000,
        district:"[网易四川省成都市手机网友]",
       /* agreeNum:parseInt(Math.random()*500),*/
        agreeNum:0,
        headimg:"images/noface80_80.png"
    };
    //提交点击事件----------------------------------
    $scope.addComment=function(){
        $scope.newDate=angular.copy($scope.newCom);
        $scope.data.push($scope.newDate);
        //清空输入框
        $scope.newCom.comment="";
        $scope.newCom.name="";
        $scope.newCom.passWord="";
        //拨回页码
        $scope.pageNum=1;
    };
    //点赞事件================

    $scope.agreeAdd=function(user){
        user.agreeNum++;
    };
    //分页筛选================
    //分页变量初始值
    $scope.pageNum=1;
    $scope.pageSize=3;
    //分页按钮点击事件
    $scope.selectPage=function(page){
        $scope.pageNum=page;
    };
});
//分页=================================================
marsFilter.filter("pageFilter",function(){
    //传参：被过滤数组； 请求页码数； 页面大小（显示个数）
    return function (data,pageNum,pageSize) {
        //判断传入参数类型是否正确,不正确返回原数据
        if (angular.isArray(data) && angular.isNumber(pageNum) && angular.isNumber(pageSize)) {
            //计算该页起始索引
            var startIndex = (pageNum - 1) * pageSize;
            //判断起始索引范围,超出返回空数组【或最后一页起始】
            if (startIndex > data.length) {
                return [];
            }
            //返回被筛选（切割）出的新数组
            return data.slice(startIndex, startIndex + pageSize);
        } else {
            return data
        }
    }
})
//过滤计算按钮总数---------------------------------------
    .filter("navButtonFilter",function(){
        return function (data,pageSize){
            //计算按钮总数
            if(angular.isArray(data)&&angular.isNumber(pageSize)){
                var count=Math.ceil(data.length/pageSize);
                //空数组装页码
                var arr=[];
                for(var index=1;index<=count;index++){
                    arr.push(index);
                }
                return arr;
            }
        }
    });
