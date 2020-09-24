function keywords_level(row) {
  var keywords_bread = new java.util.ArrayList();
  var keywords_level1 = new java.util.ArrayList();
  var keywords_level2 = new java.util.ArrayList();
  var keywords_level3 = new java.util.ArrayList();
  var keywords_level4 = new java.util.ArrayList();
  var keywords_level5 = new java.util.ArrayList();
  var keywords_level6 = new java.util.ArrayList();
  var keywords_level7 = new java.util.ArrayList();
  var keywords = new java.util.ArrayList();
  var keyword_list = row.get('mmd_keywords_keyword');
  if (keyword_list != null) {
    for (var k = 0; k < keyword_list.length; k++) {
      if (keyword_list[k] != "" && keyword_list[k] != null) {
        if (keyword_list[k].indexOf('>') >= 0) {
          var pieces = keyword_list[k].split('>');
          var kstring = '';
          for (var i = 0; i < pieces.length; i++) {
            j = i + 1;
            eval('keywords_level' + j).add(pieces[i].trim());
            kstring = kstring + j + '/' + pieces[i].trim() + ',';
          }
          keywords_bread.add(kstring);
        } else {
          keywords.add(keyword_list[k].trim());
        }
      }
    }
  }

  var keyMap = new java.util.HashMap();
  keyMap.put('set', keywords);
  row.put('sm_keywords_strip', keyMap);

  var breadMap = new java.util.HashMap();
  breadMap.put('set', keywords_bread);
  row.put('keywords_bread', breadMap);

  var key1Map = new java.util.HashMap();
  key1Map.put('set', keywords_level1);
  row.put('keywords_level1', key1Map);

  var key2Map = new java.util.HashMap();
  key2Map.put('set', keywords_level2);
  row.put('keywords_level2', key2Map);

  var key3Map = new java.util.HashMap();
  key3Map.put('set', keywords_level3);
  row.put('keywords_level3', key3Map);

  var key4Map = new java.util.HashMap();
  key4Map.put('set', keywords_level4);
  row.put('keywords_level4', key4Map);

  var key5Map = new java.util.HashMap();
  key5Map.put('set', keywords_level5);
  row.put('keywords_level5', key5Map);

  var key6Map = new java.util.HashMap();
  key6Map.put('set', keywords_level6);
  row.put('keywords_level6', key6Map);

  var key7Map = new java.util.HashMap();
  key7Map.put('set', keywords_level7);
  row.put('keywords_level7', key7Map);

  return row;
}

function date_range(row) {
  var start_date = row.get('mmd_temporal_extent_start_date');
  var end_date = row.get('mmd_temporal_extent_end_date');
  if (start_date != null && end_date != null) {
    var start = new Date(start_date).toISOString();
    var end = new Date(end_date).toISOString();
    var daterange = new java.util.ArrayList();
    daterange.add(start);
    daterange.add(end);
    var drMap = new java.util.HashMap();
    drMap.put('set', daterange);
    row.put('temporal_extent_period_dr', drMap);
  }
  return row;
}

function url_extractor(row) {
  var types = row.get('mmd_data_access_type');
  var resources = row.get('mmd_data_access_resource');

  var opendap = "OPeNDAP";
  var ogc_wms = "OGC WMS";
  var ogc_wfs = "OGC WFS";
  var ogc_wcs = "OGC WCS";
  var http_url = "HTTP";
  var ftp_url = "FTP";
  var odata = "ODATA";

  var opendapMap = new java.util.HashMap();
  var ogcwmsMap = new java.util.HashMap();
  var httpMap = new java.util.HashMap();
  var odataMap = new java.util.HashMap();
  var ogcwfsMap = new java.util.HashMap();
  var ftpMap = new java.util.HashMap();
  var ogcwcsMap = new java.util.HashMap();

  var opendapList = new java.util.ArrayList();
  var ogcwmsList = new java.util.ArrayList();
  var httpList = new java.util.ArrayList();
  var odataList = new java.util.ArrayList();
  var ogcwfsList = new java.util.ArrayList();
  var ftpList = new java.util.ArrayList();
  var ogcwcsList = new java.util.ArrayList();


  if (types != null) {
    for (var k = 0; k < types.length; k++) {
      var rType = types[k].trim();
      var rString = resources[k].split('\"').join(' ').trim();
      if (rType.toLowerCase() === opendap.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          opendapList.add(url[0]);
        }
      }
      if (rType.toLowerCase() === ogc_wms.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          ogcwmsList.add(url[0]);
        }
      }
      if (rType.toLowerCase() === http_url.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          httpList.add(url[0]);
        }
      }
      if (rType.toLowerCase() === odata.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          odataList.add(url[0]);
        }
      }
      if (rType.toLowerCase() === ftp_url.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          ftpList.add(url[0]);
        }
      }
      if (rType.toLowerCase() === ogc_wfs.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          ogcwfsList.add(url[0]);
        }
      }
      if (rType.toLowerCase() === ogc_wcs.toLowerCase()) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          ogcwcsList.add(url[0]);
        }
      }
    }
  }
  opendapMap.put('set', opendapList);
  row.put('data_access_url_opendap', opendapMap);

  ogcwmsMap.put('set', ogcwmsList);
  row.put('data_access_url_ogc_wms', ogcwmsMap);

  odataMap.put('set', odataList);
  row.put('data_access_url_odata', odataMap);

  httpMap.put('set', httpList);
  row.put('data_access_url_http', httpMap);

  ftpMap.put('set', ftpList);
  row.put('data_access_url_ftp', ftpMap);

  ogcwfsMap.put('set', ogcwfsList);
  row.put('data_access_url_ogc_wfs', ogcwfsMap);

  ogcwcsMap.put('set', ogcwcsList);
  row.put('data_access_url_ogc_wcs', ogcwcsMap);
  return row;
}

function related(row) {
  var related = row.get('mmd_related_information_resource');
  var types = row.get('mmd_related_information_type');

  var guideMap = new java.util.HashMap();
  var guideList = new java.util.ArrayList();

  var landingMap = new java.util.HashMap();
  var landingList = new java.util.ArrayList();

  var homeMap = new java.util.HashMap();
  var homeList = new java.util.ArrayList();

  var obsMap = new java.util.HashMap();
  var obsList = new java.util.ArrayList();

  var extMap = new java.util.HashMap();
  var extList = new java.util.ArrayList();

  if (related != null && types != null) {
    for (var k = 0; k < types.length; k++) {
      var str = new String(types[k].trim());
      var rString = related[k].split('\"').join(' ').trim();
      print(str);
      if (str.search(/Users Guide/)) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          guideList.add(url[0]);
        }
      }
      if (str.search(/Dataset landing/)) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          landingList.add(url[0]);
        }
      }
      if (str.search(/Project home page/)) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          homeList.add(url[0]);
        }
      }
      if (str.search(/Observation facility/)) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          obsList.add(url[0]);
        }
      }
      if (str.search(/Extended metadata/)) {
        var url = rString.match(/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/);
        if (url != null) {
          extList.add(url[0]);
        }
      }
    }
  }
  landingMap.put('set', landingList);
  guideMap.put('set', guideList);
  homeMap.put('set', homeList);
  obsMap.put('set', obsList);
  extMap.put('set',extList);

  row.put('related_url_landing_page', landingMap);
  row.put('related_url_user_guide', guideMap);
  row.put('related_url_home_page', homeMap);
  row.put('related_url_obs_facility', obsMap);
  row.put('related_url_ext_metadata', extMap);
  return row;
}

function isParent(row) {
  parentMap = new java.util.HashMap();
  parentList = new java.util.ArrayList();
  var related = row.get('mmd_related_dataset');
  if (related != null) {
    parentList.add("true");
  } else {
    parentList.add("false");
  }
  parentMap.put('set', parentList);
  row.put('isParent', parentMap);
  return row;
}

function isChild(row) {
  childMap = new java.util.HashMap();
  childList = new java.util.ArrayList();
  var related = row.get('mmd_related_dataset');
  if (related != null) {
    childList.add("true");
  } else {
    childList.add("false");
  }
  childMap.put('set', childList);
  row.put('isChild', childMap);
  return row;
}
