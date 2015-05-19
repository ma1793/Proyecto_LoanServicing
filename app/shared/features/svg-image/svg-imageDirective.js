// Convertir svg files
univerApp.directive('svgImage', function($http) {
    return {
        restrict: 'E',
        link: function(scope, element) {
            var $img = element;
            var imgURL = $img.attr('src');
            var imgClass = $img.attr('class');

            var request = $http.get(
                imgURL,
                {'Content-Type': 'application/xml'}
            );
            request.then(function(data){
                manipulateImgNode(data);
            });
            function manipulateImgNode(data) {
                var svgString = angular.element(data)[0].data;
                var $svg = angular.element(svgString)[4];
                if(typeof(imgClass) !== 'undefined') {
                    imgClass = imgClass.split(' ');
                    for(var i = 0; i < imgClass.length; ++i){
                        $svg.classList.add(imgClass[i]);
                    }
                }
                $svg.removeAttribute('xmlns:a');
                $img.replaceWith($svg);
            }
        }
    };
});