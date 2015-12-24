/**
 * Created by ZhiyuanSun on 15/12/3.
 */
/**
 * Created by ZhiyuanSun on 15/12/1.
 */
ctrlModule
    .controller('mineCtrl',['$scope', '$timeout', '$q',function($scope, $timeout, $q){
        <!-- lang: js -->
        var deferred = $q.defer();
        var promise = deferred.promise;

        // resolve it after a second
        $timeout(function() {
            deferred.resolve('foo');
        }, 1000);

        promise
            .then(function(one) {
                console.log('Promise one resolved with ', one);

                var anotherDeferred = $q.defer();

                // resolve after another second

                $timeout(function() {
                    anotherDeferred.resolve('bar');
                }, 3000);

                return anotherDeferred.promise;
            })
            .then(function(two) {
                console.log('Promise two resolved with ', two);
            });
    }]);