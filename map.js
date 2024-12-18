
//var MAP_BASE = '';
var MAP_BASE = '/map/';

var rightbarEl = mmw._overlay.rightbarEl;

var map = mmw.map;
var marker = mmw.marker;
var markerpopup = mmw.markerpopup;

map.setZoom(8);
map.setZoom(9.49);
map.flyTo({center: [77.25,28.5] });

rightbarEl.style.width = '250px';
rightbarEl.style.display = 'grid';

var noOfList = 3;
var titleHeight = (35 * noOfList);
	
let rightbarListTitleEl = document.createElement('div');
rightbarListTitleEl.append('Delhi');
rightbarEl.append(rightbarListTitleEl);

let rightbarListEl = document.createElement('ol');
rightbarListEl.classList.add('rightbarlist');
rightbarEl.append(rightbarListEl);

rightbarEl.append(document.createElement('hr'));

let rightbarList1TitleEl = document.createElement('div');
rightbarList1TitleEl.append('Faridabad');
rightbarEl.append(rightbarList1TitleEl);

let rightbarList1El = document.createElement('ol');
rightbarList1El.classList.add('rightbarlist');
rightbarEl.append(rightbarList1El);

rightbarEl.append(document.createElement('hr'));

let rightbarList2TitleEl = document.createElement('div');
rightbarList2TitleEl.append('Gurugram');
rightbarEl.append(rightbarList2TitleEl);

let rightbarList2El = document.createElement('ol');
rightbarList2El.classList.add('rightbarlist');
rightbarEl.append(rightbarList2El);

rightbarListHeight = (rightbarEl.clientHeight -  titleHeight ) / noOfList;

mmw._overlay.makeCollapsible(rightbarListTitleEl);
mmw._overlay.makeCollapsible(rightbarList1TitleEl)
mmw._overlay.makeCollapsible(rightbarList2TitleEl);
	
if(map.getCanvasContainer().offsetWidth < 640) {
	mmw._overlay.collapse(rightbarList2TitleEl);
}
	
let geoJSONData = [];
	
map.on('load',  async () => {

	map.loadImage(MAP_BASE + 'img/pin-sm.png', ( (e, t) => {
        map.addImage("pin2", t);
		map.addImage("pin2-xs", t, { pixelRatio: 2 });
    }));

	geoJSONData[0] = await mmw._common.fetchJSON(MAP_BASE +'/data/delhi.json');
	map.addSource('delhi', { 'type': 'geojson','data': geoJSONData[0] });
	var symbolLayer = newSymbolLayer('delhi','pin2');
	map.addLayer(symbolLayer);
	
	geoJSONData[1] = await mmw._common.fetchJSON(MAP_BASE +'/data/faridabad.json');
	map.addSource('faridabad', { 'type': 'geojson','data': geoJSONData[1] });
	var symbolLayer = newSymbolLayer('faridabad','pin2');
	map.addLayer(symbolLayer);

	geoJSONData[2] = await mmw._common.fetchJSON(MAP_BASE +'/data/gurugram.json');
	map.addSource('gurugram', { 'type': 'geojson','data': geoJSONData[2] });
	var symbolLayer = newSymbolLayer('gurugram','pin2');
	map.addLayer(symbolLayer);
	
	populateUI(geoJSONData);
		
});
	
function populateUI(geoJSONData) {
	
	geoJSONData[0].features.forEach( (f) => {
		var memberEl = document.createElement('li');
		memberEl.innerHTML = f.properties.name;
		memberEl.setAttribute('onclick','map.flyTo({ zoom: 16.49, center: ['+ f.geometry.coordinates +'] })');
		rightbarListEl.append(memberEl);
	});

	geoJSONData[1].features.forEach( (f) => {
		var memberEl = document.createElement('li');
		memberEl.innerHTML = f.properties.name;
		memberEl.setAttribute('onclick','map.flyTo({ zoom: 16.49, center: ['+ f.geometry.coordinates +'] })');
		rightbarList1El.append(memberEl);
	});

	geoJSONData[2].features.forEach( (f) => {
		var memberEl = document.createElement('li');
		memberEl.innerHTML = f.properties.name;
		memberEl.setAttribute('onclick','map.flyTo({ zoom: 16.49, center: ['+ f.geometry.coordinates +'] })');
		rightbarList2El.append(memberEl);
	});
	
}