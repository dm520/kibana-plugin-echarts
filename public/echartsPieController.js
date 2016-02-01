// Create an Angular module for this plugin
var module = require('ui/modules').get('tr-k4p-tagcloud');

// Minimum and maximum font size tags should have.
var maxFontSize = 32,
	minFontSize = 12;

module.controller('TagcloudController', function($scope, Private) {

	var filterManager = Private(require('ui/filter_manager'));

	$scope.filter = function(tag) {
		// Add a new filter via the filter manager
		filterManager.add(
			// The field to filter for, we can get it from the config
			$scope.vis.aggs.bySchemaName['tags'][0].params.field,
			// The value to filter for, we will read out the bucket key from the tag
			tag.label,
			// Whether the filter is negated. If you want to create a negated filter pass '-' here
			null,
			// The index pattern for the filter
			$scope.vis.indexPattern.title
		);
	};

	$scope.$watch('esResponse', function(resp) {
		if (!resp) {
			$scope.tags = null;
			return;
		}

		// Retrieve the id of the configured tags aggregation
		var tagsAggId = $scope.vis.aggs.bySchemaName['tags'][0].id;
		// Retrieve the metrics aggregation configured
		var metricsAgg = $scope.vis.aggs.bySchemaName['tagsize'][0];
		console.log(metricsAgg);
		// Get the buckets of that aggregation
		var buckets = resp.aggregations[tagsAggId].buckets;

		var min = Number.MAX_VALUE,
			max = - Number.MAX_VALUE;

		// Transform all buckets into tag objects
		$scope.tags = buckets.map(function(bucket) {
			// Use the getValue function of the aggregation to get the value of a bucket
			var value = metricsAgg.getValue(bucket);
			// Finding the minimum and maximum value of all buckets
			min = Math.min(min, value);
			max = Math.max(max, value);
			return {
				label: bucket.key,
				value: value
			};
		});

		// Calculate the font size for each tag
		$scope.tags = $scope.tags.map(function(tag) {
			tag.fontSize = (tag.value - min) / (max - min) * (maxFontSize - minFontSize) + minFontSize;
			return tag;
		});
	});
});
