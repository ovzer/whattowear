<?php
date_default_timezone_set('UTC');

$latitude = (float)$_GET["lat"];
$longitude = (float)$_GET["lng"];

function getSunPosition($lat, $long, $year, $month, $day, $hour, $min) {
	// From http://stackoverflow.com/questions/8708048/position-of-the-sun-given-time-of-day-latitude-and-longitude?rq=1
	
	// Get Julian date for date at noon
	$jd = gregoriantojd($month,$day,$year);

	//correct for half-day offset
	$dayfrac = $hour / 24 - .5;

	//now set the fraction of a day      
	$frac = $dayfrac + $min / 60 / 24;
	$jd = $jd + $frac;

	// The input to the Atronomer's almanach is the difference between
	// the Julian date and JD 2451545.0 (noon, 1 January 2000)
	$time = ($jd - 2451545);
	// Ecliptic coordinates

	// Mean longitude
	$mnlong = (280.460 + 0.9856474 * $time);
	$mnlong = fmod($mnlong,360);      
	if ($mnlong < 0) $mnlong = ($mnlong + 360);

	// Mean anomaly
	$mnanom = (357.528 + 0.9856003 * $time);
	$mnanom = fmod($mnanom,360);
	if ($mnanom < 0) $mnanom = ($mnanom + 360);
	$mnanom = deg2rad($mnanom);

	// Ecliptic longitude and obliquity of ecliptic
	$eclong = ($mnlong + 1.915 * sin($mnanom) + 0.020 * sin(2 * $mnanom));
	$eclong = fmod($eclong,360);
	if ($eclong < 0) $eclong = ($eclong + 360);
	$oblqec = (23.439 - 0.0000004 * $time);
	$eclong = deg2rad($eclong);
	$oblqec = deg2rad($oblqec);

	// Celestial coordinates
	// Right ascension and declination
	$num = (cos($oblqec) * sin($eclong));
	$den = (cos($eclong));
	$ra = (atan($num / $den));
	if ($den < 0) $ra = ($ra + pi());
	if ($den >= 0 && $num <0) $ra = ($ra + 2*pi());
	$dec = (asin(sin($oblqec) * sin($eclong)));

	// Local coordinates
	// Greenwich mean sidereal time
	//$h = $hour + $min / 60 + $sec / 3600;
	$h = $hour + $min / 60;
	$gmst = (6.697375 + .0657098242 * $time + $h);
	$gmst = fmod($gmst,24);
	if ($gmst < 0) $gmst = ($gmst + 24);

	// Local mean sidereal time
	$lmst = ($gmst + $long / 15);
	$lmst = fmod($lmst,24);
	if ($lmst < 0) $lmst = ($lmst + 24);
	$lmst = deg2rad($lmst * 15);

	// Hour angle
	$ha = ($lmst - $ra);
	if ($ha < pi()) $ha = ($ha + 2*pi());
	if ($ha > pi()) $ha = ($ha - 2*pi());

	// Latitude to radians
	$lat = deg2rad($lat);

	// Azimuth and elevation
	$el = (asin(sin($dec) * sin($lat) + cos($dec) * cos($lat) * cos($ha)));
	$az = (asin(-cos($dec) * sin($ha) / cos($el)));

	// For logic and names, see Spencer, J.W. 1989. Solar Energy. 42(4):353      
	if ((sin($dec) - sin($el) * sin($lat)) >00) {
		if(sin($az) < 0) $az = ($az + 2*pi());
	} else {
		$az = (pi() - $az);
	}

	$el = rad2deg($el);
	$az = rad2deg($az);
	$lat = rad2deg($lat);
 
	return number_format($el,2);
}

/*function wolframAlpha($lat, $long) {
	$lat = round($lat,4);
	$long = round($long,4);
	$xmlurl = "http://api.wolframalpha.com/v2/query?appid=X457K6-576X6GK4QX&input=weather+".$lat."N+".$long."E&format=plaintext";

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_URL, $xmlurl);
	$response = curl_exec($curl);
	curl_close($curl);

	$xml= simplexml_load_string($response);

	$temperature = get_string_between($xml->pod[1]->subpod->plaintext, 'temperature | ', ' °C');
	$overcast = 0;
	foreach ($xml->pod[3]->subpod as $element) {
		if ($element['title'] == 'Cloud cover') {
			$overcast = get_string_between($element->plaintext, 'clear: ', '% ');
		}
	}
	$stationName = get_string_between($xml->pod[5]->subpod->plaintext, 'name | ', 'relative');
	$elevation = get_string_between($xml->pod[5]->subpod->plaintext, 'altitude: ', '°');
	$humidity = get_string_between($xml->pod[1]->subpod->plaintext, 'humidity | ', '%');
	$windSpeed = get_string_between($xml->pod[1]->subpod->plaintext, 'wind speed | ', ' m/s');

	if ($xml->attributes()->numpods >= 6) {
		$result = 1;
	} else {
		$result = 0;
	}

	return array($result, $xml, $temperature, $overcast, $stationName, $humidity, $windSpeed, $elevation);
}*/

function metAPI($lat, $long) {
	$lat = round($lat,4);
	$long = round($long,4);
	$xmlurl = "http://api.met.no/weatherapi/locationforecast/1.9/?lat=".$lat.";lon=".$long;

	$curl = curl_init();
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_URL, $xmlurl);
	$response = curl_exec($curl);
	curl_close($curl);

	$xml= simplexml_load_string($response);
	$currentWeather = $xml->product->time[0]->location;

	$temperature = (float)$currentWeather->temperature["value"];
	$overcast = (float)$currentWeather->cloudiness["percent"];
	$humidity = (float)$currentWeather->humidity["value"];
	$windSpeed = (float)$currentWeather->windSpeed["mps"];
	$elevation = getSunPosition($lat, $long, (int)date("Y"), (int)date("m"), (int)date("d"), (int)date("H"), (int)date("i"));
	/*echo "<pre>";
	print_r($xml);
	echo "</pre>";*/

	return array(1, $lat, $temperature, $overcast, "Meteorologisk institutt", $humidity, $windSpeed, $elevation);
}

function get_string_between($string, $start, $end){
    $string = " ".$string;
    $ini = strpos($string,$start);
    if ($ini == 0) return "";
    $ini += strlen($start);
    $len = strpos($string,$end,$ini) - $ini;
    return substr($string,$ini,$len);
}

echo json_encode(metAPI($latitude, $longitude));

?>