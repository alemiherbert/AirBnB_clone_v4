function generatePlaceHtml(place) {
  return `
      <article>
          <div class="title_box">
              <h2>${place.name}</h2>
              <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
              <div class="max_guest">${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}</div>
              <div class="number_rooms">${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}</div>
              <div class="number_bathrooms">${place.number_bathrooms} Bathroom${place.number_bathrooms !== 1 ? 's' : ''}</div>
          </div>
          <div class="user">
              <!-- Add user-related information here if available -->
          </div>
          <div class="description">
              ${place.description}
          </div>
      </article>
  `;
}

$(document).ready(function () {
  let selectedAmenities = {};
  const url = "http://127.0.0.1:5001/api/v1/places_search/";

  // Listen for changes on each input checkbox
  $('input[type="checkbox"]').change(function () {
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

  // Check api status
  $.get("http://127.0.0.1:5001/api/v1/status/", function (data) {
    if (data.status === "OK") {
      $('div#api_status').addClass("available");
    } else {
      $('div#api_status').removeClass("available");
    }
  });

  // Fetch places and display
  $.ajax({
    type: 'POST',
    url: url,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({}),
    success: (data) => {
      data.forEach((place) => {
        const renderedHtml = generatePlaceHtml(place);
        $('section.places').append(renderedHtml);
      });
    },
    error: (xhr, status, error) => {
      console.error('Error fetching data:', status, error);
    }
  });
});

