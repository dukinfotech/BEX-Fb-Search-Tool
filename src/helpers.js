export function transformFilter(filter_name = 'category', arg_name = 'pages_category', value) {
  return '"' + filter_name + '":"{\\"name\\":\\"' + arg_name + '\\",\\"args\\":\\"' + value + '\\"}"';
}

export function makeURL(filters, search_keyword) {
  var joined_filters = '{' + filters.join() + '}';
  var encoded_filters = btoa(joined_filters).replace('=','');
  var search_url = 'https://www.facebook.com/search/pages/?q=';
  search_url += search_keyword + '&epa=FILTERS&filters=' + encoded_filters;
  return search_url;
}