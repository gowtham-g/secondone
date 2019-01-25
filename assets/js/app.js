var app = angular.module('myApp',['ui.router'])
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider)
 {
	$stateProvider
	.state('home',{
		url:'/',
		templateUrl : "assets/pages/home.html",
		controller : "homeController"
	})
	.state('second',{
		url:'/second',
		templateUrl : "assets/pages/second.html",
		controller : "homeController"
	})
	.state('third',{
		url:'/third',
		templateUrl : "assets/pages/third.html",
		controller : "homeController"
	})
	.state('fourth',{
		url:'/fourth',
		templateUrl : "assets/pages/fourth.html",
		controller : "homeController"
	})
	.state('fifth',{
		url:'/fifth',
		templateUrl : "assets/pages/fifth.html",
		controller : "homeController"
	})
	.state('sixth',{
		url:'/sixth',
		templateUrl : "assets/pages/sixth.html",
		controller : "homeController"
	})
	.state('additem',{
		url:'/additem',
		templateUrl : "assets/pages/additem.html",
		controller : "secondController"
	})
	 $urlRouterProvider.otherwise('/');
}])

app.service('inputService',function(){
	this.username = "";
	this.password = ""; 
})
app.service('imageService',function(){
	this.img = "";
})
app.service('cartService',function(){
	this.cart = [];
	this.value = "";
	this.array =[]
})

app.controller('parentController',['$scope','$state','$q',function($scope,$state,$q){

 $scope.$on('eventName', function (event,args) {
console.log(args.message)
 $scope.cart = args.message;
 $scope.value = args.total;
 $scope.remove = args.remove;


 $scope.$broadcast('secondbroadcast', { message: $scope.cart,total:$scope.value,remove:$scope.remove})

 });
		
	
}])


app.controller('homeController',["$scope","inputService","$state","$http","cartService",function($scope,inputService,$state,$http,cartService){

	$scope.username = inputService.username;
	$scope.$watch('username',function() {
	inputService.username = $scope.username
	})
	
	$scope.password = inputService.password;
	$scope.$watch('password',function() {
	inputService.password = $scope.password
	})
	

	$scope.submit = function () {
		if($scope.username == "admin" && $scope.password == "admin")
		{
			$state.go ('second');
		}
		else{
			$state.go ('home');

		}
	}

	$http.get('http://192.168.5.13/Angular/Angular_Assessment/products.json')
	.then(function (result){ 
		$scope.ProductCollections = result.data

	}),function(error){
		console.log(error);
	}


	$scope.cart = cartService.cart || [];
	$scope.$watch('cart',function () {
		cartService.cart = $scope.cart
	})


	$scope.array = cartService.array || [];
	$scope.$watch('array',function () {
		cartService.array = $scope.array
	})
	$scope.back = function(){
		$state.go('second');
		$scope.array.splice(0,$scope.array.length)
	}

	
	$scope.addTocart = function(index,value,event){
		$scope.check = document.querySelectorAll(".checkbox[type ='checkbox']");
		for(i=0;i<$scope.check.length;i++)
			{	if($scope.check[i].checked == true){
				$scope.cart.push({check:$scope.check[i].parentElement})	
				}
			} 
		}

	

	$scope.$watch('value',function(){
		cartService.value = $scope.value
	})
	$scope.value = cartService.value;
	


	

	
 	$scope.plus	 = function(index, event,value){
	click= event.target.click
	if(click)
	{
		$scope.cart.push(value)
	}
	 // $scope.cartItembtn();
	} 

$scope.cartItembtn = function() {     $scope.total=0;
		
	for(i=0;i<$scope.cart.length;i++)
	{
			
	$scope.total = $scope.total + $scope.cart[i].Price
		}
	$scope.value = $scope.total;
		
	 $scope.$emit('eventName', { message: $scope.cart,total:$scope.value,});
	  
	  $state.go('additem')



}

$scope.cancel= function(value)
	{	
		$scope.total =0;
		$scope.cart.splice(value,1)

		for(i=0;i<$scope.cart.length;i++)
		{	  
			$scope.total =   $scope.total + $scope.cart[i].price 
		}
		$scope.value = $scope.total
	$scope.cartItembtn();
	}


	
	$scope.preview = function(index){

		var previewmob = $scope.ProductCollections['mobiles'][index].ProductPicUrl;
		var desc = $scope.ProductCollections['mobiles'][index].ProductPicUrl;

		$scope.array.push({
			id:index,
			url:previewmob,
			des:desc
		});
		$scope.array.slice(index,1);
		$state.go('third')

	}
	$scope.previewaccess =function (index) {
		var previewaccess = $scope.ProductCollections['accessories'][index].ProductPicUrl;
		var desc = $scope.ProductCollections['accessories'][index].Description;

		$scope.array.push({
			id:index,
			url:previewaccess,
			des:desc
		});
		$scope.array.slice(index,1);
		$state.go('sixth')
	}
	$scope.previewfruit =function (index) {
		var previewfruit = $scope.ProductCollections['fruits'][index].ProductPicUrl ;
		var desc = $scope.ProductCollections['fruits'][index].Description;
		$scope.array.push({
			id:index,
			url:previewfruit,
			des:desc
		});
		$scope.array.slice(index,1);
		$state.go('fifth')
	}
	
	








	$scope.mobile = true;
	$scope.validate = function(value){
	

		if(value == 'mobile') {
			$scope.mobile = true;
			$scope.fruits = false;
			$scope.accessories = false;
		}
		else if(value == 'fruits') {
			$scope.mobile = false;
			$scope.fruits = true;
			$scope.accessories = false;
		}
		else if(value == 'accessories') {
			$scope.mobile = false;
			$scope.fruits = false;
			$scope.accessories = true;
		}

	}
}])
app.controller('secondController',["$scope",function($scope){
	console.log("jhgjh")
	$scope.$on("secondbroadcast",function(event,args){		 

		console.log(args.message);
		$scope.cart = args.message;
		$scope.value=args.total
	})
	$scope.cancel= function(value)
	{	
		$scope.total =0;
		$scope.cart.splice(value,1)

		for(i=0;i<$scope.cart.length;i++)
		{	  
			$scope.total =   $scope.total + $scope.cart[i].price 
		}
		$scope.value = $scope.total
	$scope.cartItembtn();
	}   


}])
