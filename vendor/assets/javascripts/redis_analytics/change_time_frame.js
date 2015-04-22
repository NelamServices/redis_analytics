function changeTimeFrame(range)
{
  console.log(range);
    var mapObject = $('#world-map').vectorMap('get', 'mapObject');
    switch(range)
    {
    case 'year':
	setSessionCookie("_rarng", "year");

	// both time range graphs powered by time range data
	$.ajax({
	    url: '/dashboard/api/visits?metrics=unique_visits,first_visits,repeat_visits&amp;unit_count=12&amp;unit=month',
	    dataType: "json",
	    success: function(data) {
        console.log(data);
        visits_area.setData(data['api']);
        unique_visits_line.setData(data['api']);
	    },
      error: function(e) {
        console.log(e);
      }
	});

	// aggregate data powers the 3 donuts
	$.ajax({
	    url: '/dashboard/api/visits?metrics=first_visits,repeat_visits,browser,referrer,page_views,second_page_views,visit_time,recency,country&amp;unit_count=12&amp;unit=month&amp;aggregate=yes',
      dataType: "json",
      error: function(argument) {
        console.log(argument);
      },
	    success: function(data) {
    var data = data['api'];
    console.log(data);
		// parse visits data from json
		var visits_json_data = []
		var first_visits = data[0].first_visits;
		var repeat_visits = data[1].repeat_visits;
		var total_visits = first_visits + repeat_visits;
		var page_views = data[4].page_views;
		var second_page_views = data[5].second_page_views;
		var page_depth = (page_views/total_visits).toFixed(2);
		var bounce_rate = (((total_visits - second_page_views)/total_visits) * 100).toFixed(2);
		var percent_first_visits = ((first_visits / total_visits) * 100).toFixed(2);
		var total_visit_time = data[6].visit_time;
		var avg_visit_time = ((total_visit_time / total_visits)).toFixed(2);
		var total_recency = data[7].recency;
                var country_info = data[8].country;

		if(total_visits != 0)
		  visits_json_data.push({'label': 'New', 'value': first_visits});
		if(total_visits != 0)
		  visits_json_data.push({'label': 'Returning', 'value': repeat_visits});
		visits_donut = Morris.Donut({element: 'visits_donut', data: visits_json_data});
		$("#total_visits")[0].innerHTML = total_visits + ' <small class="muted">Visites</small>';
		$("#total_page_views")[0].innerHTML = page_views + ' <small class="muted">Pages vues</small>';
		$("#page_depth")[0].innerHTML = (isNaN(page_depth) ? '?' : page_depth) + ' <small class="muted">Pages par visite</small>';
		$("#bounce_rate")[0].innerHTML = (isNaN(bounce_rate) ? '?' : bounce_rate + '%') + ' <small class="muted">Taux de rebond</small>';
		$("#visit_duration")[0].innerHTML = (isNaN(avg_visit_time) ? '?' : avg_visit_time + ' sec') + ' <small class="muted">Tps moyen par visite</small>';
		$("#first_visits")[0].innerHTML = (isNaN(percent_first_visits) ? '?' : percent_first_visits + '%') + ' <small class="muted">Nouveaux visiteurs</small></h4>';

                mapObject.series.regions[0].setValues(country_info);

		// parse browser data from json
		var browsers_json_data = [];
		for(var i in data[2].browser)
		{
		    var browser_data = {}
		    browser_data[i] = data[2].browser[i];
		    browser_data['label'] = i;
		    browser_data['value'] = data[2].browser[i];
		    browsers_json_data.push(browser_data);
		}
		browsers_donut = Morris.Donut({element: 'browsers_donut', data: browsers_json_data});

		// parse referrer data from json
		var referrers_json_data = [];
		for(var i in data[3].referrer)
		{
		    var referrer_data = {}
		    referrer_data['label'] = i;
		    referrer_data['value'] = data[3].referrer[i];
		    referrers_json_data.push(referrer_data);
		}
		referrers_donut = Morris.Donut({element: 'referrers_donut', data: referrers_json_data});
		var rec_day = !isNaN(total_recency['d']) ? total_recency['d'] : 0;
		var rec_week = !isNaN(total_recency['w']) ? total_recency['w'] : 0;
		var rec_month = !isNaN(total_recency['m']) ? total_recency['m'] : 0;
		var rec_other = !isNaN(total_recency['o']) ? total_recency['o'] : 0;
		var rec_total = rec_day + rec_week + rec_month + rec_other;

		if(rec_total > 0)
		{
		$("#recency_d_bar")[0].style.width = $("#recency_d_cent")[0].innerHTML = ((rec_day/rec_total) * 100).toFixed(2) + '%';
		$("#recency_w_bar")[0].style.width = $("#recency_w_cent")[0].innerHTML = ((rec_week/rec_total) * 100).toFixed(2) + '%';
		$("#recency_m_bar")[0].style.width = $("#recency_m_cent")[0].innerHTML = ((rec_month/rec_total) * 100).toFixed(2) + '%';
		$("#recency_o_bar")[0].style.width = $("#recency_o_cent")[0].innerHTML = ((rec_other/rec_total) * 100).toFixed(2) + '%';

		$("#recency_d")[0].title = rec_day + ' visits';
		$("#recency_w")[0].title = rec_week + ' visits';
		$("#recency_m")[0].title = rec_month + ' visits';
		$("#recency_o")[0].title = rec_other + ' visits';
		}

	    }
	});


	break;
    case 'week':
	setSessionCookie("_rarng", "week");

	// both time range graphs powered by time range data
	$.ajax({
	    url: '/dashboard/api/visits?metrics=unique_visits,first_visits,repeat_visits&amp;unit_count=7&amp;unit=day',
	    dataType: "json",
	    success: function(data) {
        console.log(data);
        visits_area.setData(data['api']);
        unique_visits_line.setData(data['api']);
	    }
	});

	// aggregate data powers the 3 donuts
	$.ajax({
	    url: '/dashboard/api/visits?metrics=first_visits,repeat_visits,browser,referrer,page_views,second_page_views,visit_time,recency,country&amp;unit_count=7&amp;unit=day&amp;aggregate=yes',
      dataType: "json",
      error: function(argument) {
        console.log(argument);
      },
	    success: function(data) {
    var data = data['api'];
    console.log(data);
		// parse visits data from json
		var visits_json_data = []
		var first_visits = data[0].first_visits;
		var repeat_visits = data[1].repeat_visits;
		var total_visits = first_visits + repeat_visits;
		var page_views = data[4].page_views;
		var second_page_views = data[5].second_page_views;
		var page_depth = (page_views/total_visits).toFixed(2);
		var bounce_rate = (((total_visits - second_page_views)/total_visits) * 100).toFixed(2);
		var percent_first_visits = ((first_visits / total_visits) * 100).toFixed(2);
		var total_visit_time = data[6].visit_time;
		var avg_visit_time = ((total_visit_time / total_visits)).toFixed(2);
		var total_recency = data[7].recency;
                var country_info = data[8].country;

		if(total_visits != 0)
		  visits_json_data.push({'label': 'New', 'value': first_visits});
		if(total_visits != 0)
		  visits_json_data.push({'label': 'Returning', 'value': repeat_visits});
		visits_donut = Morris.Donut({element: 'visits_donut', data: visits_json_data});
		$("#total_visits")[0].innerHTML = total_visits + ' <small class="muted">Visites</small>';
		$("#total_page_views")[0].innerHTML = page_views + ' <small class="muted">Pages vues</small>';
		$("#page_depth")[0].innerHTML = (isNaN(page_depth) ? '?' : page_depth) + ' <small class="muted">Pages par visite</small>';
		$("#bounce_rate")[0].innerHTML = (isNaN(bounce_rate) ? '?' : bounce_rate + '%') + ' <small class="muted">Taux de rebond</small>';
		$("#visit_duration")[0].innerHTML = (isNaN(avg_visit_time) ? '?' : avg_visit_time + ' sec') + ' <small class="muted">Tps moyen par visite</small>';
		$("#first_visits")[0].innerHTML = (isNaN(percent_first_visits) ? '?' : percent_first_visits + '%') + ' <small class="muted">Nouveaux visiteurs</small></h4>';

                mapObject.series.regions[0].setValues(country_info);

		// parse browser data from json
		var browsers_json_data = [];
		for(var i in data[2].browser)
		{
		    var browser_data = {}
		    browser_data[i] = data[2].browser[i];
		    browser_data['label'] = i;
		    browser_data['value'] = data[2].browser[i];
		    browsers_json_data.push(browser_data);
		}
		browsers_donut = Morris.Donut({element: 'browsers_donut', data: browsers_json_data});

		// parse referrer data from json
		var referrers_json_data = [];
		for(var i in data[3].referrer)
		{
		    var referrer_data = {}
		    referrer_data['label'] = i;
		    referrer_data['value'] = data[3].referrer[i];
		    referrers_json_data.push(referrer_data);
		}
		referrers_donut = Morris.Donut({element: 'referrers_donut', data: referrers_json_data});
		var rec_day = !isNaN(total_recency['d']) ? total_recency['d'] : 0;
		var rec_week = !isNaN(total_recency['w']) ? total_recency['w'] : 0;
		var rec_month = !isNaN(total_recency['m']) ? total_recency['m'] : 0;
		var rec_other = !isNaN(total_recency['o']) ? total_recency['o'] : 0;
		var rec_total = rec_day + rec_week + rec_month + rec_other;

		if(rec_total > 0)
		{
		$("#recency_d_bar")[0].style.width = $("#recency_d_cent")[0].innerHTML = ((rec_day/rec_total) * 100).toFixed(2) + '%';
		$("#recency_w_bar")[0].style.width = $("#recency_w_cent")[0].innerHTML = ((rec_week/rec_total) * 100).toFixed(2) + '%';
		$("#recency_m_bar")[0].style.width = $("#recency_m_cent")[0].innerHTML = ((rec_month/rec_total) * 100).toFixed(2) + '%';
		$("#recency_o_bar")[0].style.width = $("#recency_o_cent")[0].innerHTML = ((rec_other/rec_total) * 100).toFixed(2) + '%';

		$("#recency_d")[0].title = rec_day + ' visits';
		$("#recency_w")[0].title = rec_week + ' visits';
		$("#recency_m")[0].title = rec_month + ' visits';
		$("#recency_o")[0].title = rec_other + ' visits';
		}

	    }
	});


	break;
    case 'day':
	setSessionCookie("_rarng", "day");

	// both time range graphs powered by time range data
	$.ajax({
	    url: '/dashboard/api/visits?metrics=unique_visits,first_visits,repeat_visits&amp;unit_count=24&amp;unit=hour',
	    dataType: "json",
	    success: function(data) {
        console.log(data);
        visits_area.setData(data['api']);
        unique_visits_line.setData(data['api']);
	    }
	});

	// aggregate data powers the 3 donuts
	$.ajax({
	    url: '/dashboard/api/visits?metrics=first_visits,repeat_visits,browser,referrer,page_views,second_page_views,visit_time,recency,country&amp;unit_count=24&amp;unit=hour&amp;aggregate=yes',
      dataType: "json",
      error: function(argument) {
        console.log(argument);
      },
	    success: function(data) {
    var data = data['api'];
    console.log(data);
		// parse visits data from json
		var visits_json_data = []
		var first_visits = data[0].first_visits;
		var repeat_visits = data[1].repeat_visits;
		var total_visits = first_visits + repeat_visits;
		var page_views = data[4].page_views;
		var second_page_views = data[5].second_page_views;
		var page_depth = (page_views/total_visits).toFixed(2);
		var bounce_rate = (((total_visits - second_page_views)/total_visits) * 100).toFixed(2);
		var percent_first_visits = ((first_visits / total_visits) * 100).toFixed(2);
		var total_visit_time = data[6].visit_time;
		var avg_visit_time = ((total_visit_time / total_visits)).toFixed(2);
		var total_recency = data[7].recency;
                var country_info = data[8].country;

		if(total_visits != 0)
		  visits_json_data.push({'label': 'New', 'value': first_visits});
		if(total_visits != 0)
		  visits_json_data.push({'label': 'Returning', 'value': repeat_visits});
		visits_donut = Morris.Donut({element: 'visits_donut', data: visits_json_data});
		$("#total_visits")[0].innerHTML = total_visits + ' <small class="muted">Visites</small>';
		$("#total_page_views")[0].innerHTML = page_views + ' <small class="muted">Pages vues</small>';
		$("#page_depth")[0].innerHTML = (isNaN(page_depth) ? '?' : page_depth) + ' <small class="muted">Pages par visite</small>';
		$("#bounce_rate")[0].innerHTML = (isNaN(bounce_rate) ? '?' : bounce_rate + '%') + ' <small class="muted">Taux de rebond</small>';
		$("#visit_duration")[0].innerHTML = (isNaN(avg_visit_time) ? '?' : avg_visit_time + ' sec') + ' <small class="muted">Tps moyen par visite</small>';
		$("#first_visits")[0].innerHTML = (isNaN(percent_first_visits) ? '?' : percent_first_visits + '%') + ' <small class="muted">Nouveaux visiteurs</small></h4>';

                mapObject.series.regions[0].setValues(country_info);

		// parse browser data from json
		var browsers_json_data = [];
		for(var i in data[2].browser)
		{
		    var browser_data = {}
		    browser_data[i] = data[2].browser[i];
		    browser_data['label'] = i;
		    browser_data['value'] = data[2].browser[i];
		    browsers_json_data.push(browser_data);
		}
		browsers_donut = Morris.Donut({element: 'browsers_donut', data: browsers_json_data});

		// parse referrer data from json
		var referrers_json_data = [];
		for(var i in data[3].referrer)
		{
		    var referrer_data = {}
		    referrer_data['label'] = i;
		    referrer_data['value'] = data[3].referrer[i];
		    referrers_json_data.push(referrer_data);
		}
		referrers_donut = Morris.Donut({element: 'referrers_donut', data: referrers_json_data});
		var rec_day = !isNaN(total_recency['d']) ? total_recency['d'] : 0;
		var rec_week = !isNaN(total_recency['w']) ? total_recency['w'] : 0;
		var rec_month = !isNaN(total_recency['m']) ? total_recency['m'] : 0;
		var rec_other = !isNaN(total_recency['o']) ? total_recency['o'] : 0;
		var rec_total = rec_day + rec_week + rec_month + rec_other;

		if(rec_total > 0)
		{
		$("#recency_d_bar")[0].style.width = $("#recency_d_cent")[0].innerHTML = ((rec_day/rec_total) * 100).toFixed(2) + '%';
		$("#recency_w_bar")[0].style.width = $("#recency_w_cent")[0].innerHTML = ((rec_week/rec_total) * 100).toFixed(2) + '%';
		$("#recency_m_bar")[0].style.width = $("#recency_m_cent")[0].innerHTML = ((rec_month/rec_total) * 100).toFixed(2) + '%';
		$("#recency_o_bar")[0].style.width = $("#recency_o_cent")[0].innerHTML = ((rec_other/rec_total) * 100).toFixed(2) + '%';

		$("#recency_d")[0].title = rec_day + ' visits';
		$("#recency_w")[0].title = rec_week + ' visits';
		$("#recency_m")[0].title = rec_month + ' visits';
		$("#recency_o")[0].title = rec_other + ' visits';
		}

	    }
	});


	break;
    }
}


function setSessionCookie(name,value) {
    document.cookie = name+"="+value+"; path=/";
}

function convertToCSV(objArray) {
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  var str = '';
  for (var i = 0; i < array.length; i++) {
    var line = '';
    for (var index in array[i]) {
      if (line != '') line += ','
      line += array[i][index];
    }
    str += line + '\r\n';
  }
  return str;
};
