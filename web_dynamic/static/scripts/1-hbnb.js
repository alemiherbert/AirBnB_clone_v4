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
});
