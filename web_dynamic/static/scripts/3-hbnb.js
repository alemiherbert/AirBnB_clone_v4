$(document).ready(function() {
    let selectedAmenities = {};
    const url = "http://0.0.0.0:5001/api/v1/places_search/";

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
    // posting to an url
    $.ajax({
      type: 'POST',
      url: url,
      data: JSON.stringify({}),
      success: function(data) {
	data.forEach(fuction(place) {
	  const content = '<article>
	  <div class="title_box">
	    <h2>{{ place.name }}</h2>
	    <div class="price_by_night">${{ place.price_by_night }}</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">{{ place.max_guest }} Guest{% if place.max_guest != 1 %}s{% endif %}</div>
	    <div class="number_rooms">{{ place.number_rooms }} Bedroom{% if place.number_rooms != 1 %}s{% endif
		    %}</div>
	    <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1
		    %}s{% endif %}</div>
	  </div>
	  <div class="user">
	  </div>
	  <div class="description">
	    {{ place.description | safe }}
	  </div>
	 </article>'
	$('section.places').append(content);
	});
      },
      dataType: 'application/json'
    });
}
