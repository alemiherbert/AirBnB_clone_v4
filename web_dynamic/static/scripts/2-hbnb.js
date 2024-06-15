$(document).ready(function() {
    let selectedAmenities = {};

    // Listen for changes on each input checkbox
    $('input[type="checkbox"]').change(function() {
        const amenityName = $(this).closest('li').text().trim();

        if ($(this).is(':checked')) {
            selectedAmenities[amenityName] = amenityName;
        } else {
            delete selectedAmenities[amenityName];
        }

        // Update the h4 tag inside the div Amenities
        let amenitiesList = Object.values(selectedAmenities).join(', ');
        $('div.amenities h4').text(amenitiesList || '');
    });
    // sending a request
    $.get("http://127.0.0.1:5001/api/v1/status/", function(data) {
	if (data.status === "OK") {
	   $('div#api_status').addClass("available");
	} else {
	   $('div#api_status').removeClass("available");
	}
    });
});
